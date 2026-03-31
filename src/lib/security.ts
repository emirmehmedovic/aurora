type RateLimitRecord = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
  remaining: number;
};

const rateLimitStore = new Map<string, RateLimitRecord>();
const RATE_LIMIT_MAX_KEYS = 5000;
let lastCleanupAt = 0;

function normalizeIp(ip: string | null | undefined) {
  if (!ip) return "unknown";
  return ip.trim().toLowerCase();
}

function getHeaderValue(headersLike: unknown, name: string) {
  if (!headersLike) return null;

  if (headersLike instanceof Headers) {
    return headersLike.get(name);
  }

  if (typeof headersLike === "object" && headersLike !== null) {
    const headersObject = headersLike as Record<string, unknown>;
    const direct = headersObject[name];
    if (typeof direct === "string") return direct;

    const lower = headersObject[name.toLowerCase()];
    if (typeof lower === "string") return lower;
  }

  return null;
}

export function getClientIp(headersLike: unknown) {
  const candidates = [
    getHeaderValue(headersLike, "cf-connecting-ip"),
    getHeaderValue(headersLike, "x-real-ip"),
    getHeaderValue(headersLike, "x-vercel-forwarded-for"),
  ];

  for (const candidate of candidates) {
    if (candidate) return normalizeIp(candidate);
  }

  if (process.env.TRUST_PROXY_HEADERS === "true") {
    const forwardedFor = getHeaderValue(headersLike, "x-forwarded-for");
    if (forwardedFor) {
      const firstIp = forwardedFor.split(",")[0]?.trim();
      if (firstIp) return normalizeIp(firstIp);
    }
  }

  return "unknown";
}

function cleanupRateLimitStore(now: number) {
  if (now - lastCleanupAt < 60_000 && rateLimitStore.size < RATE_LIMIT_MAX_KEYS) {
    return;
  }

  lastCleanupAt = now;

  for (const [key, record] of rateLimitStore.entries()) {
    if (record.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  if (rateLimitStore.size <= RATE_LIMIT_MAX_KEYS) {
    return;
  }

  const entriesByResetAt = [...rateLimitStore.entries()].sort(
    (a, b) => a[1].resetAt - b[1].resetAt
  );
  const overflow = rateLimitStore.size - RATE_LIMIT_MAX_KEYS;

  for (let i = 0; i < overflow; i += 1) {
    const entry = entriesByResetAt[i];
    if (entry) {
      rateLimitStore.delete(entry[0]);
    }
  }
}

export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  cleanupRateLimitStore(now);
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
      remaining: Math.max(0, limit - 1),
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
      remaining: 0,
    };
  }

  current.count += 1;
  rateLimitStore.set(key, current);

  return {
    allowed: true,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    remaining: Math.max(0, limit - current.count),
  };
}

export function resetRateLimit(key: string) {
  rateLimitStore.delete(key);
}
