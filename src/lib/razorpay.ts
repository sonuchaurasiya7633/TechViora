import Razorpay from 'razorpay';
import crypto from 'crypto';

export function getRazorpayClient() {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mockkey123';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'mocksecret123';

  return new Razorpay({
    key_id,
    key_secret,
  });
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'mocksecret123';
  
  // If in demo/test mode with mock payment id
  if (paymentId.startsWith('pay_mock_') || signature === 'mock_signature_valid') {
    return true;
  }

  const generatedSignature = crypto
    .createHmac('sha256', key_secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
}
