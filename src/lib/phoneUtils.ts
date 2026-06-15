/**
 * Normalize Bosnian phone numbers for matching
 * Examples:
 * - "61904759" -> "61904759"
 * - "061904759" -> "61904759"
 * - "+387 61 904 759" -> "61904759"
 * - "+38761904759" -> "61904759"
 */
export function normalizePhone(phone: string): string {
  // Remove all non-digit characters
  let normalized = phone.replace(/\D/g, '');

  // Handle Bosnia (+387) country code
  if (normalized.startsWith('387')) {
    normalized = normalized.slice(3);
  }

  // Remove leading zero (mobile: 061, 062, etc.)
  if (normalized.startsWith('0')) {
    normalized = normalized.slice(1);
  }

  // Return last 8-9 digits (standard Bosnian phone)
  return normalized.slice(-9);
}

export function formatPhoneForDisplay(phone: string): string {
  const normalized = normalizePhone(phone);
  // Format as: 061 234 567
  if (normalized.length === 8) {
    return `0${normalized.slice(0, 2)} ${normalized.slice(2, 5)} ${normalized.slice(5)}`;
  }
  if (normalized.length === 9) {
    return `0${normalized.slice(0, 2)} ${normalized.slice(2, 5)} ${normalized.slice(5)}`;
  }
  return phone;
}

/**
 * Format phone number for WhatsApp/Viber API (international format)
 * Examples:
 * - "61904759" -> "+38761904759"
 * - "061904759" -> "+38761904759"
 * - "+387 61 904 759" -> "+38761904759"
 * - "0038761904759" -> "+38761904759"
 */
export function formatPhoneForMessaging(phone: string): string {
  const normalized = normalizePhone(phone);
  // Add Bosnia country code (+387) and return international format
  return `+387${normalized}`;
}
