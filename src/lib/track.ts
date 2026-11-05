/** Meta Pixel helper — safe to call even if the pixel is blocked or not loaded. */
type Fbq = (cmd: 'track' | 'trackCustom', event: string, params?: Record<string, unknown>) => void;

export function track(event: string, params?: Record<string, unknown>) {
  try {
    const fbq = (window as unknown as { fbq?: Fbq }).fbq;
    if (typeof fbq === 'function') fbq('track', event, params);
  } catch {
    /* never break the page for analytics */
  }
}

/**
 * Tracks clicks on Register (Razorpay) and WhatsApp links anywhere on the page,
 * so every button is covered without wiring each one by hand.
 */
export function trackOutboundClicks() {
  const onClick = (e: MouseEvent) => {
    const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    if (link.href.startsWith('https://rzp.io/')) track('InitiateCheckout', { content_name: 'AI Agent Project Series Nov 2026' });
    else if (link.href.startsWith('https://wa.me/')) track('Contact', { method: 'whatsapp' });
  };
  document.addEventListener('click', onClick, { capture: true });
  return () => document.removeEventListener('click', onClick, { capture: true });
}
