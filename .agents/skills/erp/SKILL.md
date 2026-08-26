---
name: erp
description: Comprehensive Enterprise Resource Planning (ERP) skill for architecting, configuring, developing, and managing automotive dealership, sales, CRM, inventory, service workshop, ZATCA e-invoicing, and accounting workflows.
---

# 🏢 Enterprise Resource Planning (ERP) Expert Skill

A specialized, production-ready skill for architecting, customizing, deploying, and integrating **ERP systems (Odoo, ERPNext/Frappe, SAP, Oracle NetSuite, custom ERP solutions)** with dedicated expertise in automotive dealership management (DMS), inventory control, ZATCA compliance, and automated workflows.

---

## 📌 Core Capabilities & Domain Knowledge

### 1. 🚗 Automotive Dealership & Fleet ERP (DMS)
- **Vehicle Inventory & VIN Tracking**: Management of new and pre-owned vehicle stock by VIN, chassis number, engine type, exterior/interior colors, and trim levels.
- **Showroom Sales & Deal Pipeline**: Leads capture from web/mobile app, test-drive scheduling, quotation generation, trade-in valuations, and reservation contracts.
- **Financing & Leasing Integration**: Calculating down payments, bank profit margins, insurance allocations, and installment schedules.
- **Warranty & Quality Certificates**: Digital warranty lifecycle (e.g. 10-year / 300,000 km warranty tracking, claims approvals, and authorized parts validation).

### 2. 🛠️ Aftersales Service & Workshop Management
- **Job Cards & Repair Orders**: Digital job cards with customer complaints, technician assignments, bay allocation, and estimated completion times.
- **Service Scheduling & Express Bay**: 45-minute quick maintenance slots, recurring 5k/10k km maintenance alerts, and reminder SMS/WhatsApp triggers.
- **Spare Parts & Inventory Allocation**: Real-time deduction of OEM oil, filters, brake pads, and tracking minimum safety stock.

### 3. 🧾 Accounting & ZATCA e-Invoicing Compliance (Saudi Arabia)
- **ZATCA FATOORAH Phase 1 & 2**: Generation of compliant XML invoices with cryptographic stamps, ECDSA signatures, QR codes (TLV Base64 encoded), and UUIDs.
- **Chart of Accounts (COA)**: Standard asset, liability, revenue, COGS, and expense account scaffolding for dealership operations.
- **Automated Tax Auditing**: 15% VAT standard calculations, reverse charges, exemptions, and withholding taxes.
- **Payment Gateways & Reconciliation**: Automated bank statement parsing (MT940/CAMT.053), POS terminal sync, and credit card gateway matching.

### 4. 📦 Supply Chain, Purchasing & Warehouse
- **Purchase Orders (PO)**: Automated vendor RFQs, landed cost calculations (customs duties, freight, handling), and supplier rating metrics.
- **Multi-Location Inventory**: Cross-branch stock transfers between central warehouses, regional distribution centers, and showroom showrooms.
- **Batch & Serial Tracking**: Barcode scanning (Code 128 / QR) for rapid parts check-in and inventory counts.

### 5. 👥 HR, Payroll & Role-Based Access Control (RBAC)
- **Saudi Labor Law Compliance**: WPS (Wage Protection System) file generation, GOSI contributions, end-of-service calculations.
- **Commission & Incentive Engine**: Sales consultant tier bonuses based on monthly volume and gross profit targets.
- **Multi-Level Permissions**: Segregation of duties between Sales, Accounting, Inventory Managers, and Executive Management.

---

## ⚙️ Standard Technical Implementations

### A. ZATCA QR Code TLV Generator (TypeScript / Node.js)
```typescript
import { Buffer } from 'buffer';

export interface ZatcaInvoiceData {
  sellerName: string;
  vatRegistrationNumber: string;
  timestamp: string; // ISO 8601
  totalAmountWithVat: string;
  vatAmount: string;
}

export function generateZatcaQrCode(data: ZatcaInvoiceData): string {
  const encodeTlv = (tag: number, value: string): Buffer => {
    const valueBuffer = Buffer.from(value, 'utf8');
    const lengthBuffer = Buffer.from([valueBuffer.length]);
    const tagBuffer = Buffer.from([tag]);
    return Buffer.concat([tagBuffer, lengthBuffer, valueBuffer]);
  };

  const tlvParts = [
    encodeTlv(1, data.sellerName),
    encodeTlv(2, data.vatRegistrationNumber),
    encodeTlv(3, data.timestamp),
    encodeTlv(4, data.totalAmountWithVat),
    encodeTlv(5, data.vatAmount)
  ];

  const fullBuffer = Buffer.concat(tlvParts);
  return fullBuffer.toString('base64');
}
```

### B. Odoo / ERP REST API Connector Architecture
```typescript
export class ERPConnector {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async syncLead(leadData: { name: string; phone: string; vehicleInterest: string; branch: string }) {
    const response = await fetch(`${this.baseUrl}/api/v1/crm.lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        contact_name: leadData.name,
        mobile: leadData.phone,
        description: `Interested in: ${leadData.vehicleInterest} at ${leadData.branch}`,
        stage: 'new'
      })
    });
    return response.json();
  }

  async createServiceBooking(bookingData: { vin: string; serviceType: string; scheduledDate: string }) {
    const response = await fetch(`${this.baseUrl}/api/v1/fleet.service`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(bookingData)
    });
    return response.json();
  }
}
```

---

## 🛠️ Step-by-Step ERP Workflow Guidelines

1. **Requirement Scoping**:
   - Determine target modules: Sales/CRM, Inventory, Maintenance/Service, Invoicing, Payroll.
   - Establish whether using Odoo, ERPNext, SAP, Oracle NetSuite, or a customized headless API ERP.
2. **Schema & Model Definition**:
   - Define exact relational models (e.g. `Vehicles`, `Leads`, `Quotations`, `JobCards`, `Invoices`, `StockMoves`).
3. **ZATCA Phase 2 Readiness**:
   - Ensure invoice timestamps, cryptographic hash chains, and CSID keys are generated per sandbox/production compliance guidelines.
4. **Integration Testing**:
   - Verify webhooks and API triggers between customer-facing mobile/web apps and backend ERP database.
5. **Security & Auditing**:
   - Enforce row-level security, record change logs, and daily automated encrypted database backups.
