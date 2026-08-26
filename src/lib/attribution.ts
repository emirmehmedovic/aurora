const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;

export type AttributionTouch = {
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  gclid?: string;
  fbp?: string;
  fbc?: string;
  capturedAt?: string;
};

export type AttributionPayload = {
  visitorId?: string;
  sessionId?: string;
  firstTouch?: AttributionTouch;
  lastTouch?: AttributionTouch;
};

const COOKIE_NAMES = {
  visitorId: "aurora_vid",
  sessionId: "aurora_sid",
  firstTouch: "aurora_first_touch",
  lastTouch: "aurora_last_touch",
} as const;

const UTM_KEY_MAP = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_content: "utmContent",
  utm_term: "utmTerm",
} as const;

const randomId = (prefix: string) => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;
  const prefix = `${name}=`;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(prefix))
    ?.slice(prefix.length);
};

const setCookie = (name: string, value: string, maxAge = COOKIE_MAX_AGE_SECONDS) => {
  if (typeof document === "undefined") return;

  document.cookie = [
    `${name}=${value}`,
    "path=/",
    `max-age=${maxAge}`,
    "SameSite=Lax",
    window.location.protocol === "https:" ? "Secure" : "",
  ].filter(Boolean).join("; ");
};

export const parseCookieJson = <T>(value?: string | null): T | undefined => {
  if (!value) return undefined;

  try {
    return JSON.parse(decodeURIComponent(value)) as T;
  } catch {
    return undefined;
  }
};

const setJsonCookie = (name: string, value: unknown) => {
  setCookie(name, encodeURIComponent(JSON.stringify(value)));
};

const ensureMetaClickCookie = (fbclid?: string) => {
  if (!fbclid || getCookie("_fbc")) return;
  setCookie("_fbc", `fb.1.${Date.now()}.${fbclid}`);
};

const buildTouch = (): AttributionTouch => {
  const params = new URLSearchParams(window.location.search);
  const touch: AttributionTouch = {
    landingPage: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || undefined,
    capturedAt: new Date().toISOString(),
  };

  Object.entries(UTM_KEY_MAP).forEach(([queryKey, payloadKey]) => {
    const value = params.get(queryKey);
    if (value) {
      touch[payloadKey] = value;
    }
  });

  const fbclid = params.get("fbclid");
  const gclid = params.get("gclid");
  if (fbclid) touch.fbclid = fbclid;
  if (gclid) touch.gclid = gclid;

  ensureMetaClickCookie(fbclid || undefined);

  touch.fbp = getCookie("_fbp");
  touch.fbc = getCookie("_fbc");

  return touch;
};

export const captureAttribution = () => {
  if (typeof window === "undefined") return;

  const visitorId = getCookie(COOKIE_NAMES.visitorId) || randomId("vid");
  const sessionId = sessionStorage.getItem(COOKIE_NAMES.sessionId) || randomId("sid");
  const touch = buildTouch();

  setCookie(COOKIE_NAMES.visitorId, visitorId);
  sessionStorage.setItem(COOKIE_NAMES.sessionId, sessionId);
  setCookie(COOKIE_NAMES.sessionId, sessionId, 60 * 30);

  if (!getCookie(COOKIE_NAMES.firstTouch)) {
    setJsonCookie(COOKIE_NAMES.firstTouch, touch);
  }

  setJsonCookie(COOKIE_NAMES.lastTouch, touch);
};

export const getStoredAttribution = (): AttributionPayload => {
  if (typeof window === "undefined") return {};

  return {
    visitorId: getCookie(COOKIE_NAMES.visitorId),
    sessionId: getCookie(COOKIE_NAMES.sessionId) || sessionStorage.getItem(COOKIE_NAMES.sessionId) || undefined,
    firstTouch: parseCookieJson<AttributionTouch>(getCookie(COOKIE_NAMES.firstTouch)),
    lastTouch: parseCookieJson<AttributionTouch>(getCookie(COOKIE_NAMES.lastTouch)),
  };
};

export const getAttributionForOrder = (): { attribution: AttributionPayload } => ({
  attribution: getStoredAttribution(),
});
