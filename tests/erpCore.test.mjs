import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const erpCorePath = path.resolve(import.meta.dirname, '../src/utils/erpCore.ts');
const tsSource = fs.readFileSync(erpCorePath, 'utf8');
const transpiled = ts.transpileModule(tsSource, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    strict: true
  }
});

const moduleExports = {};
const sandbox = {
  exports: moduleExports,
  module: { exports: moduleExports },
  require,
  TextEncoder,
  TextDecoder,
  Uint8Array,
  Uint32Array,
  DataView,
  Buffer,
  crypto,
  btoa,
  atob,
  console,
  Date,
  Math,
  Number,
  String,
  Boolean,
  Array,
  Object,
  RegExp,
  Error,
  Set,
  Map,
  Intl
};
vm.runInNewContext(transpiled.outputText, sandbox);
const erp = sandbox.module.exports;

test('1. Digit normalization and XSS sanitization (#7, #82)', () => {
  assert.equal(erp.normalizeDigits('٠٥٥١٢٣٤٥٦٧'), '0551234567');
  assert.equal(erp.parseAmount('١٣٥,٠٠٠.٥٠'), 135000.5);
  assert.equal(erp.sanitizeText('<script>alert(1)</script>سولينا'), 'alert(1)سولينا');
});

test('2. Integer Halala monetary math & VAT splitting (#31, #32, #33, #34, #40)', () => {
  assert.equal(erp.toHalalas(0.1 + 0.2), 30);
  assert.equal(erp.fromHalalas(30), 0.3);

  const split = erp.splitVatInclusive(1000, 15);
  assert.equal(split.base, 869.57);
  assert.equal(split.vat, 130.43);
  assert.equal(Number((split.base + split.vat).toFixed(2)), split.total);

  const zeroRate = erp.effectiveVatRate('Z', 15);
  const zeroVat = erp.splitVatInclusive(1000, zeroRate);
  assert.equal(zeroVat.vat, 0);
  assert.equal(zeroVat.base, 1000);

  const discounted = erp.applyDiscountBeforeVat(100000, 5000, 15);
  assert.equal(discounted.base, 95000);
  assert.equal(discounted.vat, 14250);
  assert.equal(discounted.total, 109250);
});

test('3. SAMA Murabaha vs Effective APR calculation (#61, #62)', () => {
  const res = erp.calculateMurabahaFinance({
    vehiclePriceInclVat: 140000,
    downPaymentPercent: 10,
    balloonPercent: 25,
    annualProfitRatePercent: 3.79,
    adminFeePercent: 1,
    tenureMonths: 60
  });
  assert.equal(res.downPaymentAmount, 14000);
  assert.equal(res.financedPrincipal, 126000);
  assert.ok(res.adminFeeAmount <= 5000, 'Admin fee must respect SAMA 5,000 SAR cap');
  assert.ok(res.approximateAprPercent > 3.79, 'Effective reducing-balance APR must be higher than flat margin');
});

test('4. ZATCA TLV QR Base64 encode/decode & validation (#21, #22, #23, #30)', () => {
  const qr = erp.buildZatcaQrBase64({
    sellerName: 'شركة سولينا للسيارات',
    vatNumber: '310123456700003',
    timestamp: '2026-08-18T11:30:00Z',
    total: 145130,
    vat: 18930
  });
  const decoded = erp.decodeZatcaQrBase64(qr);
  assert.equal(decoded[1], 'شركة سولينا للسيارات');
  assert.equal(decoded[2], '310123456700003');
  assert.equal(decoded[3], '2026-08-18T11:30:00Z');
  assert.equal(decoded[4], '145130.00');
  assert.equal(decoded[5], '18930.00');

  assert.throws(() => {
    erp.buildZatcaQrBase64({
      sellerName: 'سولينا',
      vatNumber: '12345',
      timestamp: '2026-08-18T11:30:00Z',
      total: 100,
      vat: 15
    });
  }, /الرقم الضريبي/);
});

test('5. ZATCA Phase 2 PIH SHA-256 hash chain & UBL 2.1 XML (#25, #27, #28)', () => {
  const h1 = erp.computeInvoiceHashBase64({
    invoiceNumber: 'SOL-INV-2026-0991',
    uuid: '550e8400-e29b-41d4-a716-446655440001',
    issueDateTimeKsa: '2026-08-18 11:30:00',
    sellerVatNumber: '310123456700003',
    totalAmount: 145130,
    vatAmount: 18930,
    icv: 1,
    previousInvoiceHash: erp.ZATCA_GENESIS_PIH
  });
  assert.equal(Buffer.from(h1, 'base64').length, 32);

  const xml = erp.buildZatcaUblXml({
    invoiceNumber: 'SOL-INV-2026-0991',
    uuid: '550e8400-e29b-41d4-a716-446655440001',
    issueDateTimeKsa: '2026-08-18 11:30:00',
    type: 'tax_invoice',
    icv: 1,
    previousInvoiceHash: erp.ZATCA_GENESIS_PIH,
    zatcaQrBase64: 'AQ==',
    sellerNameAr: 'شركة سولينا للسيارات',
    sellerVatNumber: '310123456700003',
    sellerCrNumber: '1010987654',
    customerName: 'شركة المدار للخدمات اللوجستية',
    customerVatNumber: '300987654300003',
    description: 'مبيعات سيارات',
    baseAmount: 126200,
    vatAmount: 18930,
    totalAmount: 145130
  });
  assert.ok(xml.includes('urn:oasis:names:specification:ubl:schema:xsd:Invoice-2'));
  assert.ok(xml.includes('<cbc:InvoiceTypeCode name="0100000">388</cbc:InvoiceTypeCode>'));
  assert.ok(xml.includes(erp.ZATCA_GENESIS_PIH));
});

test('6. VIN ISO 3779 validation, Saudi phone/ID/VAT & accounting locks (#35, #36, #42, #66, #70)', () => {
  assert.equal(erp.isValidVin('JTDKN3DU0A0123456'), true);
  assert.equal(erp.isValidVin('INVALIDVIN123'), false);
  assert.equal(erp.isValidSaudiPhone('٠٥٥١٢٣٤٥٦٧'), true);
  assert.equal(erp.isValidSaudiNationalIdOrIqama('1098765432'), true);
  assert.equal(erp.isValidSaudiNationalIdOrIqama('3098765432'), false);
  assert.equal(erp.isDateInLockedPeriod('2026-07-15', '2026-07-31'), true);
  assert.equal(erp.isDateInLockedPeriod('2026-08-01', '2026-07-31'), false);
  assert.equal(
    erp.isBalancedJournalEntry([
      { accountCode: '1101', debit: 1150, credit: 0 },
      { accountCode: '4101', debit: 0, credit: 1000 },
      { accountCode: '2104', debit: 0, credit: 150 }
    ]),
    true
  );
  assert.equal(erp.isValidVinStatusTransition('sold', 'in_stock'), false);
  assert.equal(erp.isValidVinStatusTransition('in_stock', 'reserved'), true);
});
