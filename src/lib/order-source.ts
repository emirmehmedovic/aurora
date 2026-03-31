export function formatOrderSourceLabel(
  source: string | null | undefined,
  utmSource?: string | null,
  utmCampaign?: string | null
) {
  if (source?.trim()) {
    return source.trim();
  }

  if (utmSource && utmSource !== "direct") {
    if (utmCampaign && utmCampaign !== "none") {
      return `${utmSource} / ${utmCampaign}`;
    }

    return utmSource;
  }

  return "Direktno / webshop";
}

export function formatWebOrderSource(pathname?: string | null) {
  if (!pathname) {
    return "Direktno / webshop";
  }

  if (pathname === "/naruci") {
    return "Checkout /naruci";
  }

  if (pathname.startsWith("/l/")) {
    return `Landing ${pathname}`;
  }

  if (pathname.startsWith("/proizvod/")) {
    return `Proizvod ${pathname}`;
  }

  if (pathname.startsWith("/")) {
    return `Web ${pathname}`;
  }

  return "Direktno / webshop";
}
