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

export const fbPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

export const fbEvent = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
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

// Type declarations
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}
