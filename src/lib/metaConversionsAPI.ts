import crypto from 'crypto';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CONVERSION_API_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

// Helper: Hash user data (SHA-256) as required by Meta
function hashData(data: string | null | undefined): string | undefined {
  if (!data || data.trim() === '') return undefined;
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

// Extract first and last name from full name
function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(' ');
  const firstName = parts[0] || '';
  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
  return { firstName, lastName };
}

type ConversionEventData = {
  eventName: 'Purchase' | 'Lead' | 'InitiateCheckout' | 'AddToCart' | 'ViewContent';
  eventSourceUrl: string;
  userData: {
    email?: string;
    phone?: string;
    fullName?: string;
    city?: string;
    zipCode?: string;
    country?: string;
  };
  customData?: {
    value?: number;
    currency?: string;
    contentName?: string;
    contentIds?: string[];
    contentType?: string;
    orderId?: string;
  };
  eventTime?: number; // Unix timestamp in seconds
  actionSource?: 'website' | 'phone_call' | 'physical_store' | 'email' | 'other';
};

export async function sendMetaConversionEvent(data: ConversionEventData): Promise<void> {
  // Validate required env variables
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn('[Meta Conversions API] Missing PIXEL_ID or ACCESS_TOKEN - skipping event');
    return;
  }

  try {
    const { firstName, lastName } = data.userData.fullName
      ? splitName(data.userData.fullName)
      : { firstName: '', lastName: '' };

    // Build user_data object with hashed values
    const user_data: any = {
      client_ip_address: '0.0.0.0', // Placeholder - ideally pass real IP
      client_user_agent: 'Mozilla/5.0', // Placeholder - ideally pass real user agent
    };

    if (data.userData.email) user_data.em = hashData(data.userData.email);
    if (data.userData.phone) user_data.ph = hashData(data.userData.phone.replace(/\D/g, '')); // Remove non-digits
    if (firstName) user_data.fn = hashData(firstName);
    if (lastName) user_data.ln = hashData(lastName);
    if (data.userData.city) user_data.ct = hashData(data.userData.city);
    if (data.userData.zipCode) user_data.zp = hashData(data.userData.zipCode);
    if (data.userData.country) user_data.country = hashData(data.userData.country);

    // Build the event payload
    const eventPayload = {
      event_name: data.eventName,
      event_time: data.eventTime || Math.floor(Date.now() / 1000),
      action_source: data.actionSource || 'website',
      event_source_url: data.eventSourceUrl,
      user_data,
      custom_data: data.customData || {},
    };

    // Add test_event_code if in test mode
    const payload: any = {
      data: [eventPayload],
      access_token: ACCESS_TOKEN,
    };

    if (TEST_EVENT_CODE) {
      payload.test_event_code = TEST_EVENT_CODE;
    }

    // Send to Meta Conversions API
    const url = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('[Meta Conversions API] Error:', result);
      throw new Error(`Meta API error: ${JSON.stringify(result)}`);
    }

    console.log('[Meta Conversions API] Event sent successfully:', {
      eventName: data.eventName,
      eventsReceived: result.events_received,
      fbtrace_id: result.fbtrace_id,
    });

    return result;
  } catch (error) {
    console.error('[Meta Conversions API] Failed to send event:', error);
    // Don't throw - we don't want to break order creation if Meta API fails
  }
}

// Helper function for Purchase events
export async function sendMetaPurchaseEvent(data: {
  orderId: string;
  value: number;
  currency?: string;
  contentIds?: string[];
  contentName?: string;
  customer: {
    email?: string | null;
    phone: string;
    fullName: string;
    city?: string | null;
    zipCode?: string | null;
  };
  eventSourceUrl?: string;
  actionSource?: 'website' | 'phone_call' | 'physical_store' | 'email' | 'other';
}) {
  await sendMetaConversionEvent({
    eventName: 'Purchase',
    eventSourceUrl: data.eventSourceUrl || 'https://aurorashop.ba/naruci',
    actionSource: data.actionSource || 'website',
    userData: {
      email: data.customer.email || undefined,
      phone: data.customer.phone,
      fullName: data.customer.fullName,
      city: data.customer.city || undefined,
      zipCode: data.customer.zipCode || undefined,
      country: 'ba', // Bosnia and Herzegovina
    },
    customData: {
      value: data.value,
      currency: data.currency || 'BAM',
      contentIds: data.contentIds || [],
      contentName: data.contentName,
      contentType: 'product',
      orderId: data.orderId,
    },
  });
}

// Helper function for Lead events
export async function sendMetaLeadEvent(data: {
  leadId: string;
  customer: {
    email?: string | null;
    phone: string;
    fullName: string;
    city?: string | null;
    zipCode?: string | null;
  };
  eventSourceUrl?: string;
  actionSource?: 'website' | 'phone_call' | 'physical_store' | 'email' | 'other';
}) {
  await sendMetaConversionEvent({
    eventName: 'Lead',
    eventSourceUrl: data.eventSourceUrl || 'https://aurorashop.ba/naruci',
    actionSource: data.actionSource || 'website',
    userData: {
      email: data.customer.email || undefined,
      phone: data.customer.phone,
      fullName: data.customer.fullName,
      city: data.customer.city || undefined,
      zipCode: data.customer.zipCode || undefined,
      country: 'ba',
    },
    customData: {
      contentName: 'Checkout Form',
    },
  });
}
