import { formatPhoneForMessaging } from './phoneUtils';

/**
 * Messaging Service - WhatsApp and Viber integration
 * Tries WhatsApp first, then falls back to Viber if WhatsApp fails
 */

// Environment variables
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM; // e.g., "whatsapp:+14155238886"

const VIBER_BOT_TOKEN = process.env.VIBER_BOT_TOKEN;
const VIBER_BOT_NAME = process.env.VIBER_BOT_NAME || 'Aurora Shop';

/**
 * Send WhatsApp message via Twilio
 */
async function sendWhatsApp(to: string, message: string): Promise<{ success: boolean; error?: string }> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM) {
    console.warn('[WhatsApp] Twilio credentials not configured');
    return { success: false, error: 'WhatsApp not configured' };
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

    const formData = new URLSearchParams();
    formData.append('From', TWILIO_WHATSAPP_FROM);
    formData.append('To', `whatsapp:${to}`);
    formData.append('Body', message);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[WhatsApp] Failed:', error);
      return { success: false, error: error.message || 'WhatsApp send failed' };
    }

    const result = await response.json();
    console.log('[WhatsApp] Message sent:', result.sid);
    return { success: true };

  } catch (error: any) {
    console.error('[WhatsApp] Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send Viber message via Viber Bot API
 */
async function sendViber(to: string, message: string): Promise<{ success: boolean; error?: string }> {
  if (!VIBER_BOT_TOKEN) {
    console.warn('[Viber] Bot token not configured');
    return { success: false, error: 'Viber not configured' };
  }

  try {
    const url = 'https://chatapi.viber.com/pa/send_message';

    const payload = {
      auth_token: VIBER_BOT_TOKEN,
      receiver: to,
      type: 'text',
      text: message,
      sender: {
        name: VIBER_BOT_NAME,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.status !== 0) {
      console.error('[Viber] Failed:', result);
      return { success: false, error: result.status_message || 'Viber send failed' };
    }

    console.log('[Viber] Message sent:', result.message_token);
    return { success: true };

  } catch (error: any) {
    console.error('[Viber] Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send order confirmation message
 * Tries WhatsApp first, then falls back to Viber
 */
export async function sendOrderConfirmation(data: {
  customerName: string;
  customerPhone: string;
  orderNumber: string;
  totalAmount: number; // in cents (feninga)
  productName: string;
}): Promise<{
  success: boolean;
  channel?: 'whatsapp' | 'viber' | 'none';
  error?: string;
}> {
  // Format phone to international format
  const phoneInternational = formatPhoneForMessaging(data.customerPhone);

  // Prepare message
  const amountBAM = (data.totalAmount / 100).toFixed(2);
  const message = `
🎉 Hvala na narudžbi, ${data.customerName}!

✅ Vaša narudžba je uspješno primljena.

📦 Narudžba: ${data.orderNumber}
💰 Iznos: ${amountBAM} KM
🛍️ Proizvod: ${data.productName}

🚚 Paket očekujte na vašoj adresi za 1-3 radna dana.

📞 Za bilo kakva pitanja, slobodno nas kontaktirajte.

Aurora Shop
https://aurorashop.ba
  `.trim();

  console.log(`[Messaging] Sending confirmation to ${phoneInternational}`);

  // Try WhatsApp first
  const whatsappResult = await sendWhatsApp(phoneInternational, message);
  if (whatsappResult.success) {
    console.log('[Messaging] ✅ Sent via WhatsApp');
    return { success: true, channel: 'whatsapp' };
  }

  console.log('[Messaging] WhatsApp failed, trying Viber...');

  // Fallback to Viber
  const viberResult = await sendViber(phoneInternational, message);
  if (viberResult.success) {
    console.log('[Messaging] ✅ Sent via Viber');
    return { success: true, channel: 'viber' };
  }

  console.error('[Messaging] ❌ Both WhatsApp and Viber failed');
  return {
    success: false,
    channel: 'none',
    error: `WhatsApp: ${whatsappResult.error}, Viber: ${viberResult.error}`,
  };
}

/**
 * Send order status update message
 */
export async function sendOrderStatusUpdate(data: {
  customerName: string;
  customerPhone: string;
  orderNumber: string;
  status: string;
  trackingNumber?: string;
}): Promise<{
  success: boolean;
  channel?: 'whatsapp' | 'viber' | 'none';
}> {
  const phoneInternational = formatPhoneForMessaging(data.customerPhone);

  let statusMessage = '';
  switch (data.status) {
    case 'CONFIRMED':
      statusMessage = '✅ Vaša narudžba je potvrđena i uskoro će biti poslana!';
      break;
    case 'SHIPPED':
      statusMessage = `🚚 Vaša narudžba je poslana! ${data.trackingNumber ? `Tracking: ${data.trackingNumber}` : ''}`;
      break;
    case 'DELIVERED':
      statusMessage = '🏡 Vaša narudžba je dostavljena! Hvala što kupujete kod nas!';
      break;
    default:
      statusMessage = `📦 Status narudžbe: ${data.status}`;
  }

  const message = `
${data.customerName}, ažuriranje narudžbe:

${statusMessage}

📦 Narudžba: ${data.orderNumber}

Aurora Shop
https://aurorashop.ba
  `.trim();

  console.log(`[Messaging] Sending status update to ${phoneInternational}`);

  // Try WhatsApp first, then Viber
  const whatsappResult = await sendWhatsApp(phoneInternational, message);
  if (whatsappResult.success) {
    return { success: true, channel: 'whatsapp' };
  }

  const viberResult = await sendViber(phoneInternational, message);
  if (viberResult.success) {
    return { success: true, channel: 'viber' };
  }

  return { success: false, channel: 'none' };
}
