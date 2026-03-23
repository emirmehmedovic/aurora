import TelegramBot from 'node-telegram-bot-api';

// Initialize bot (only if token is provided)
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

let bot: TelegramBot | null = null;

if (botToken) {
  bot = new TelegramBot(botToken, { polling: false });
}

interface OrderNotification {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  zipCode?: string;
  totalAmount: number;
  products: { name: string; quantity: number; price: number }[];
  source?: string;
  utmSource?: string;
  utmCampaign?: string;
}

interface DailySummary {
  date: string;
  totalOrders: number;
  confirmedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  newLeads: number;
  topProducts: { name: string; count: number }[];
  ordersByStatus: { status: string; count: number }[];
  ordersBySource: { source: string; count: number }[];
}

/**
 * Send new order notification to Telegram group
 */
export async function sendOrderNotification(order: OrderNotification): Promise<void> {
  if (!bot || !chatId) {
    console.log('Telegram bot not configured, skipping notification');
    return;
  }

  try {
    const emoji = getSourceEmoji(order.source);
    const products = order.products.map(p =>
      `  • ${p.name} × ${p.quantity} = ${(p.price * p.quantity / 100).toFixed(2)} KM`
    ).join('\n');

    const cityInfo = order.zipCode ? `${order.city} ${order.zipCode}` : order.city;

    const message = `
🛍️ <b>NOVA NARUDŽBA #${order.orderNumber}</b>

👤 <b>Kupac:</b> ${order.customerName}
📱 <b>Telefon:</b> ${order.phone}
📍 <b>Adresa:</b> ${order.address}
🏙️ <b>Grad:</b> ${cityInfo}

📦 <b>Proizvodi:</b>
${products}

💰 <b>UKUPNO:</b> ${(order.totalAmount / 100).toFixed(2)} KM

${emoji} <b>Izvor:</b> ${order.source || 'Direktna narudžba'}
${order.utmSource ? `📊 <b>UTM Source:</b> ${order.utmSource}` : ''}
${order.utmCampaign ? `🎯 <b>Kampanja:</b> ${order.utmCampaign}` : ''}

⏰ ${new Date().toLocaleString('bs-BA', { timeZone: 'Europe/Sarajevo' })}
`.trim();

    await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    console.log('✅ Order notification sent to Telegram');
  } catch (error) {
    console.error('❌ Failed to send Telegram notification:', error);
  }
}

/**
 * Send daily summary to Telegram group
 */
export async function sendDailySummary(summary: DailySummary): Promise<void> {
  if (!bot || !chatId) {
    console.log('Telegram bot not configured, skipping daily summary');
    return;
  }

  try {
    const topProducts = summary.topProducts.slice(0, 5).map((p, i) =>
      `  ${i + 1}. ${p.name} (${p.count}×)`
    ).join('\n');

    const ordersByStatus = summary.ordersByStatus.map(s =>
      `  • ${getStatusEmoji(s.status)} ${translateStatus(s.status)}: ${s.count}`
    ).join('\n');

    const ordersBySource = summary.ordersBySource.slice(0, 3).map(s =>
      `  • ${getSourceEmoji(s.source)} ${s.source || 'Direktno'}: ${s.count}`
    ).join('\n');

    const message = `
📊 <b>DNEVNI IZVJEŠTAJ - ${summary.date}</b>

━━━━━━━━━━━━━━━━━━━━━━
📦 <b>UKUPNO NARUDŽBI:</b> ${summary.totalOrders}
✅ <b>Potvrđene/Poslane:</b> ${summary.confirmedOrders}
${summary.cancelledOrders > 0 ? `❌ <b>Otkazane:</b> ${summary.cancelledOrders}` : ''}
💰 <b>PRIHOD:</b> ${(summary.totalRevenue / 100).toFixed(2)} KM ${summary.cancelledOrders > 0 ? '<i>(bez otkazanih)</i>' : ''}
📝 <b>NOVI LEADOVI:</b> ${summary.newLeads}
━━━━━━━━━━━━━━━━━━━━━━

🏆 <b>TOP PROIZVODI:</b>
${topProducts || '  Nema podataka'}

📋 <b>STATUS NARUDŽBI:</b>
${ordersByStatus || '  Nema podataka'}

📈 <b>IZVORI NARUDŽBI:</b>
${ordersBySource || '  Nema podataka'}

━━━━━━━━━━━━━━━━━━━━━━
⏰ Generisano: ${new Date().toLocaleString('bs-BA', { timeZone: 'Europe/Sarajevo' })}
`.trim();

    await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    console.log('✅ Daily summary sent to Telegram');
  } catch (error) {
    console.error('❌ Failed to send daily summary:', error);
  }
}

/**
 * Send order status change notification to Telegram group
 */
export async function sendOrderStatusUpdate(data: {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  zipCode?: string;
  oldStatus: string;
  newStatus: string;
  totalAmount: number;
  notes?: string;
}): Promise<void> {
  if (!bot || !chatId) {
    console.log('Telegram bot not configured, skipping status notification');
    return;
  }

  try {
    const oldStatusText = translateStatus(data.oldStatus);
    const newStatusText = translateStatus(data.newStatus);
    const statusEmoji = getStatusEmoji(data.newStatus);
    const cityInfo = data.zipCode ? `${data.city} ${data.zipCode}` : data.city;

    let message = `
${statusEmoji} <b>PROMJENA STATUSA</b>

📋 <b>Narudžba:</b> #${data.orderNumber}
👤 <b>Kupac:</b> ${data.customerName}
📱 <b>Telefon:</b> ${data.phone}
📍 <b>Adresa:</b> ${data.address}
🏙️ <b>Grad:</b> ${cityInfo}

📊 <b>Status:</b> ${oldStatusText} → <b>${newStatusText}</b>
💰 <b>Iznos:</b> ${(data.totalAmount / 100).toFixed(2)} KM
`;

    if (data.notes) {
      message += `\n📝 <b>Napomena:</b> ${data.notes}`;
    }

    message += `\n\n⏰ ${new Date().toLocaleString('bs-BA', { timeZone: 'Europe/Sarajevo' })}`;

    await bot.sendMessage(chatId, message.trim(), { parse_mode: 'HTML' });
    console.log('✅ Order status update sent to Telegram');
  } catch (error) {
    console.error('❌ Failed to send Telegram status notification:', error);
  }
}

/**
 * Test Telegram bot connection
 */
export async function testTelegramBot(): Promise<{ success: boolean; message: string }> {
  if (!bot || !chatId) {
    return {
      success: false,
      message: 'Telegram bot not configured. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env'
    };
  }

  try {
    const testMessage = `
✅ <b>TEST PORUKA</b>

Telegram bot je uspješno povezan!

⏰ ${new Date().toLocaleString('bs-BA', { timeZone: 'Europe/Sarajevo' })}
`.trim();

    await bot.sendMessage(chatId, testMessage, { parse_mode: 'HTML' });
    return {
      success: true,
      message: 'Test message sent successfully!'
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to send test message: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Helper functions
function getSourceEmoji(source?: string): string {
  if (!source) return '🌐';

  const lowerSource = source.toLowerCase();
  if (lowerSource.includes('facebook') || lowerSource.includes('fb')) return '📘';
  if (lowerSource.includes('instagram') || lowerSource.includes('ig')) return '📷';
  if (lowerSource.includes('google')) return '🔍';
  if (lowerSource.includes('tiktok')) return '🎵';
  if (lowerSource.includes('email')) return '📧';
  if (lowerSource.includes('sms')) return '💬';

  return '🌐';
}

function getStatusEmoji(status: string): string {
  const statusMap: Record<string, string> = {
    'NEW': '🆕',
    'CONFIRMED': '✅',
    'PREPARING': '📦',
    'SHIPPED': '🚚',
    'DELIVERED': '✔️',
    'CANCELLED': '❌',
    'RETURNED': '↩️'
  };
  return statusMap[status] || '📋';
}

function translateStatus(status: string): string {
  const translations: Record<string, string> = {
    'NEW': 'Nova',
    'CONFIRMED': 'Potvrđena',
    'PREPARING': 'U pripremi',
    'SHIPPED': 'Poslata',
    'DELIVERED': 'Dostavljena',
    'CANCELLED': 'Otkazana',
    'RETURNED': 'Vraćena'
  };
  return translations[status] || status;
}
