import { getStoredAttribution } from "@/lib/attribution";

// Google Analytics 4
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Meta Pixel
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Helper: Wait for fbq to be available before firing events
const waitForFbq = (callback: () => void, maxAttempts = 50) => {
  if (typeof window === 'undefined') return;

  let attempts = 0;
  const checkFbq = () => {
    if (typeof window.fbq !== 'undefined') {
      callback();
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(checkFbq, 100); // Check every 100ms
    } else {
      console.warn('[Meta Pixel] fbq not loaded after 5 seconds');
    }
  };

  checkFbq();
};

export const fbPageView = () => {
  waitForFbq(() => {
    window.fbq('track', 'PageView');
  });
};

export const fbEvent = (name: string, options = {}) => {
  waitForFbq(() => {
    window.fbq('track', name, options);
  });
};

// Update advanced matching data when user information is available
export const updateAdvancedMatching = (userData: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}) => {
  waitForFbq(() => {
    const advancedMatching: any = {};

    if (userData.email) advancedMatching.em = userData.email;
    if (userData.phone) advancedMatching.ph = userData.phone;
    if (userData.firstName) advancedMatching.fn = userData.firstName;
    if (userData.lastName) advancedMatching.ln = userData.lastName;
    if (userData.city) advancedMatching.ct = userData.city;
    if (userData.state) advancedMatching.st = userData.state;
    if (userData.zip) advancedMatching.zp = userData.zip;
    if (userData.country) advancedMatching.country = userData.country;

    // Re-initialize pixel with user data (will be auto-hashed by Meta)
    if (Object.keys(advancedMatching).length > 0 && FB_PIXEL_ID) {
      window.fbq('init', FB_PIXEL_ID, advancedMatching);
    }
  });
};

// Tracking events
export const trackAddToCart = (product: { name: string; price: number; id: string }) => {
  // GA4
  event({
    action: 'add_to_cart',
    category: 'ecommerce',
    label: product.name,
    value: product.price,
  });

  // Meta Pixel
  fbEvent('AddToCart', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: product.price,
    currency: 'BAM',
  });
};

export const trackViewContent = (product: { name: string; price: number; id: string }) => {
  // GA4
  event({
    action: 'view_item',
    category: 'ecommerce',
    label: product.name,
    value: product.price,
  });

  // Meta Pixel
  fbEvent('ViewContent', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: product.price,
    currency: 'BAM',
  });
};

export const trackInitiateCheckout = (value: number) => {
  // GA4
  event({
    action: 'begin_checkout',
    category: 'ecommerce',
    value: value,
  });

  // Meta Pixel
  fbEvent('InitiateCheckout', {
    value: value,
    currency: 'BAM',
  });
};

export const trackPurchase = (orderId: string, value: number, items: any[]) => {
  // GA4
  event({
    action: 'purchase',
    category: 'ecommerce',
    label: orderId,
    value: value,
  });

  // Meta Pixel
  fbEvent('Purchase', {
    value: value,
    currency: 'BAM',
    content_ids: items.map(item => item.id),
    content_type: 'product',
  });
};

export const trackLead = (leadId: string) => {
  // GA4
  event({
    action: 'generate_lead',
    category: 'engagement',
    label: leadId,
  });

  // Meta Pixel
  fbEvent('Lead', {
    content_name: 'Checkout Form',
  });
};

// ==========================================
// SCROLL DEPTH TRACKING
// ==========================================
export const trackScrollDepth = (depth: number, page: string) => {
  event({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${page} - ${depth}%`,
    value: depth,
  });

  fbEvent('ScrollDepth', {
    content_name: page,
    depth_percentage: depth,
  });
};

// ==========================================
// CTA CLICK TRACKING
// ==========================================
export const trackCtaClick = (ctaName: string, ctaLocation: string, page: string) => {
  event({
    action: 'cta_click',
    category: 'engagement',
    label: `${ctaName} | ${ctaLocation} | ${page}`,
  });

  fbEvent('CtaClick', {
    content_name: ctaName,
    cta_location: ctaLocation,
    page: page,
  });
};

// ==========================================
// FORM ABANDONMENT TRACKING
// ==========================================
export const trackFormStart = (formName: string, productId?: string) => {
  event({
    action: 'form_start',
    category: 'engagement',
    label: `${formName}${productId ? ` | ${productId}` : ''}`,
  });

  fbEvent('FormStart', {
    content_name: formName,
    content_ids: productId ? [productId] : [],
  });
};

export const trackFormAbandon = (formName: string, lastField: string, productId?: string) => {
  event({
    action: 'form_abandon',
    category: 'engagement',
    label: `${formName} | last_field: ${lastField}${productId ? ` | ${productId}` : ''}`,
  });

  fbEvent('FormAbandon', {
    content_name: formName,
    last_field: lastField,
    content_ids: productId ? [productId] : [],
  });
};

// ==========================================
// WHATSAPP CLICK TRACKING
// ==========================================
export const trackWhatsAppClick = (location: string) => {
  event({
    action: 'whatsapp_click',
    category: 'engagement',
    label: location,
  });

  fbEvent('Contact', {
    content_name: 'WhatsApp',
    content_category: location,
  });
};

// ==========================================
// UTM PARAMETER UTILITIES
// ==========================================
export const getUtmParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const utms: Record<string, string> = {};
  
  utmKeys.forEach(key => {
    const val = params.get(key);
    if (val) utms[key] = val;
  });

  // Persist to sessionStorage so they survive navigation
  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utms));
  }

  // Return stored UTMs if no fresh ones in URL
  if (Object.keys(utms).length === 0) {
    try {
      const stored = sessionStorage.getItem('utm_params');
      if (stored) return JSON.parse(stored);
    } catch {}

    const attribution = getStoredAttribution();
    const touch = attribution.lastTouch || attribution.firstTouch;
    if (touch) {
      return {
        ...(touch.utmSource ? { utm_source: touch.utmSource } : {}),
        ...(touch.utmMedium ? { utm_medium: touch.utmMedium } : {}),
        ...(touch.utmCampaign ? { utm_campaign: touch.utmCampaign } : {}),
        ...(touch.utmTerm ? { utm_term: touch.utmTerm } : {}),
        ...(touch.utmContent ? { utm_content: touch.utmContent } : {}),
        ...(touch.fbclid ? { fbclid: touch.fbclid } : {}),
        ...(touch.gclid ? { gclid: touch.gclid } : {}),
      };
    }
  }

  return utms;
};

export const getUtmString = (): string => {
  const utms = getUtmParams();
  return new URLSearchParams(utms).toString();
};

// Type declarations
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}
