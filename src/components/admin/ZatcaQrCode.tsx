import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface ZatcaQrCodeProps {
  /** ZATCA TLV payload already Base64-encoded (this exact string is what gets encoded in the QR). */
  payloadBase64: string;
  size?: number;
  className?: string;
}

/**
 * Renders a real, scannable QR code for a ZATCA TLV Base64 payload.
 * Replaces the previous decorative pseudo-matrix that could not be scanned.
 */
export const ZatcaQrCode: React.FC<ZatcaQrCodeProps> = ({ payloadBase64, size = 112, className = '' }) => {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    if (!payloadBase64) {
      setDataUrl('');
      setError('لا يوجد رمز QR لهذه الفاتورة');
      return;
    }
    QRCode.toDataURL(payloadBase64, { errorCorrectionLevel: 'M', margin: 1, width: size * 2 })
      .then(url => {
        if (!cancelled) {
          setDataUrl(url);
          setError('');
        }
      })
      .catch(err => {
        console.error('[ZATCA] QR rendering failed', err);
        if (!cancelled) setError('تعذّر توليد رمز QR');
      });
    return () => {
      cancelled = true;
    };
  }, [payloadBase64, size]);

  if (error) {
    return (
      <div
        className={`bg-white text-red-600 text-[10px] font-bold rounded-xl flex items-center justify-center text-center p-2 shrink-0 ${className}`}
        style={{ width: size, height: size }}
        role="alert"
      >
        {error}
      </div>
    );
  }

  return dataUrl ? (
    <img
      src={dataUrl}
      width={size}
      height={size}
      alt="رمز QR للفاتورة الإلكترونية (ZATCA)"
      className={`bg-white p-1.5 rounded-xl shrink-0 ${className}`}
    />
  ) : (
    <div className={`bg-white/80 rounded-xl animate-pulse shrink-0 ${className}`} style={{ width: size, height: size }} />
  );
};
