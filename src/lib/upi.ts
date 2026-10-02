import QRCode from 'qrcode';

export const DEFAULT_UPI_ID = 'sonu-6074@ptyes';
export const DEFAULT_PAYEE_NAME = 'TechViora Learning';

export interface UpiPaymentDetails {
  upiId?: string;
  payeeName?: string;
  amount: number;
  transactionNote?: string;
  transactionRef?: string;
}

export function generateUpiUri({
  upiId = DEFAULT_UPI_ID,
  payeeName = DEFAULT_PAYEE_NAME,
  amount,
  transactionNote = 'TechViora Internship Fee',
  transactionRef = '',
}: UpiPaymentDetails): string {
  const cleanUpi = upiId.trim();
  const encodedName = encodeURIComponent(payeeName.trim());
  const encodedNote = encodeURIComponent(transactionNote.trim());

  let uri = `upi://pay?pa=${cleanUpi}&pn=${encodedName}&am=${amount.toFixed(2)}&cu=INR&tn=${encodedNote}`;
  if (transactionRef) {
    uri += `&tr=${encodeURIComponent(transactionRef)}`;
  }
  return uri;
}

export async function generateUpiQrDataUrl(details: UpiPaymentDetails): Promise<string> {
  const uri = generateUpiUri(details);
  try {
    const dataUrl = await QRCode.toDataURL(uri, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 400,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    });
    return dataUrl;
  } catch (err) {
    console.error('Failed to generate UPI QR code:', err);
    return '';
  }
}

export function validateUtr(utr: string): boolean {
  if (!utr) return false;
  const clean = utr.trim();
  return clean.length >= 6 && clean.length <= 30;
}
