import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Mail, MessageCircle, User, X } from 'lucide-react';
import { CONTACT_ENDPOINT, REGISTER_URL } from '@/content';
import { track } from '@/lib/track';

/** Open the contact popup from anywhere: `openContact('hero')`. */
export function openContact(source = 'site') {
  window.dispatchEvent(new CustomEvent('open-contact', { detail: source }));
}

type Status = 'idle' | 'sending' | 'done' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** How many screen-heights of scrolling before the popup opens by itself. */
const AUTO_OPEN_SCREENS = 2.5;
const SHOWN_KEY = 'contact-popup-shown';
const SUBMITTED_KEY = 'contact-popup-submitted';

/** Storage can throw (private mode, blocked cookies) — never let that break the page. */
function store(op: 'get' | 'set', kind: 'local' | 'session', key: string) {
  try {
    const s = kind === 'local' ? window.localStorage : window.sessionStorage;
    if (op === 'get') return s.getItem(key) === '1';
    s.setItem(key, '1');
  } catch {
    /* ignore */
  }
  return false;
}

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState('site');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', whatsapp: '+91 ', email: '', website: '' });
  const [touched, setTouched] = useState(false);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setSource((e as CustomEvent<string>).detail || 'site');
      setStatus('idle');
      setError('');
      setTouched(false);
      setOpen(true);
    };
    window.addEventListener('open-contact', onOpen);
    return () => window.removeEventListener('open-contact', onOpen);
  }, []);

  // Auto-open once per visit after the visitor has scrolled ~2.5 screens,
  // unless they've already opened it or submitted their details before.
  useEffect(() => {
    if (store('get', 'local', SUBMITTED_KEY) || store('get', 'session', SHOWN_KEY)) return;
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * AUTO_OPEN_SCREENS) return;
      window.removeEventListener('scroll', onScroll);
      if (store('get', 'session', SHOWN_KEY)) return;
      openContact('auto-scroll');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) store('set', 'session', SHOWN_KEY);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => firstField.current?.focus(), 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open]);

  const digits = form.whatsapp.replace(/\D/g, '');
  const errors = {
    name: form.name.trim().length < 2 ? 'Please enter your name' : '',
    whatsapp: digits.length < 10 || digits.length > 15 ? 'Enter a valid WhatsApp number with country code' : '',
    email: !EMAIL_RE.test(form.email.trim()) ? 'Enter a valid email address' : '',
  };
  const valid = !errors.name && !errors.whatsapp && !errors.email;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    if (form.website) {
      setStatus('done'); // bot trap
      return;
    }
    if (!CONTACT_ENDPOINT.startsWith('https://script.google.com/')) {
      setStatus('error');
      setError('The form is not connected yet. Set VITE_CONTACT_ENDPOINT to your Apps Script URL.');
      return;
    }

    setStatus('sending');
    setError('');
    const body = new URLSearchParams({
      name: form.name.trim(),
      whatsapp: form.whatsapp.trim(),
      email: form.email.trim(),
      source,
      page: window.location.href,
    });

    try {
      const res = await fetch(CONTACT_ENDPOINT, { method: 'POST', body });
      const data = await res.json().catch(() => ({ ok: res.ok }));
      if (!data.ok) throw new Error(data.error || 'Submission failed');
      store('set', 'local', SUBMITTED_KEY);
          track('Lead', { content_name: 'Contact form', source });
      setStatus('done');
    } catch (err) {
      // Some browsers block reading the Apps Script redirect; send once more without reading the reply.
      if (err instanceof TypeError) {
        try {
          await fetch(CONTACT_ENDPOINT, { method: 'POST', body, mode: 'no-cors' });
          store('set', 'local', SUBMITTED_KEY);
          track('Lead', { content_name: 'Contact form', source });
          setStatus('done');
          return;
        } catch {
          /* fall through */
        }
      }
      setStatus('error');
      setError('Something went wrong. Please try again in a moment.');
    }
  }

  if (!open) return null;

  const field =
    'w-full rounded-xl border bg-ink-950/60 py-3 pl-11 pr-4 text-[15px] text-bone-50 placeholder:text-bone-400 outline-none transition-colors focus:border-electric-400 focus:ring-2 focus:ring-electric-500/25';
  const fieldState = (k: keyof typeof errors) => (touched && errors[k] ? 'border-signal-red/70' : 'border-white/10');

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <button aria-label="Close" className="absolute inset-0 animate-[fadeIn_.25s_ease] bg-ink-950/80 backdrop-blur-sm" onClick={() => setOpen(false)} />

      <div className="relative w-full max-w-[460px] animate-rise overflow-hidden rounded-t-3xl border border-electric-400/30 bg-gradient-to-b from-ink-800 to-ink-900 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9),0_0_80px_-30px_rgba(139,92,246,0.7)] sm:rounded-3xl">
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 rounded-full bg-electric-600/30 blur-3xl" />

        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-bone-200 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close contact form"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative px-6 pb-6 pt-8 sm:px-8 sm:pb-8">
          {status === 'done' ? (
            <div className="py-6 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-signal-green/15 ring-1 ring-signal-green/40">
                <CheckCircle2 className="h-7 w-7 text-signal-green" />
              </span>
              <h2 id="contact-title" className="mt-5 font-display text-[24px] font-semibold tracking-tight text-bone-50">
                Thanks, {form.name.split(' ')[0] || 'there'}!
              </h2>
              <p className="mx-auto mt-2 max-w-[320px] text-[14.5px] leading-relaxed text-bone-300">
                We&apos;ve got your details. Our team will reach out to you on WhatsApp shortly.
              </p>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-semibold"
              >
                Register Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button onClick={() => setOpen(false)} className="mt-3 text-[13px] text-bone-400 hover:text-bone-100">
                Close
              </button>
            </div>
          ) : (
            <>
              <span className="inline-flex items-center gap-2 rounded-full border border-electric-400/30 bg-electric-500/10 px-3 py-1 text-[11.5px] font-medium text-electric-200">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal-green" />
                Live batch starts November 2026
              </span>
              <h2 id="contact-title" className="mt-4 font-display text-[26px] font-semibold leading-tight tracking-tight text-bone-50">
                Contact Us
              </h2>
              <p className="mt-1.5 text-[14px] leading-relaxed text-bone-300">
                Share your details and our team will get back to you on WhatsApp.
              </p>

              <form onSubmit={submit} noValidate className="mt-6 space-y-4">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-[13px] font-medium text-bone-200">Full name</label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-400" />
                    <input
                      ref={firstField}
                      id="c-name"
                      autoComplete="name"
                      className={`${field} ${fieldState('name')}`}
                      placeholder="Your name"
                      value={form.name}
                      maxLength={100}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  {touched && errors.name && <p className="mt-1.5 text-[12px] text-signal-red">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="c-wa" className="mb-1.5 block text-[13px] font-medium text-bone-200">WhatsApp number</label>
                  <div className="relative">
                    <MessageCircle className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-400" />
                    <input
                      id="c-wa"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className={`${field} ${fieldState('whatsapp')}`}
                      placeholder="+91 98765 43210"
                      value={form.whatsapp}
                      maxLength={20}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value.replace(/[^\d+\s-]/g, '') })}
                    />
                  </div>
                  {touched && errors.whatsapp && <p className="mt-1.5 text-[12px] text-signal-red">{errors.whatsapp}</p>}
                </div>

                <div>
                  <label htmlFor="c-email" className="mb-1.5 block text-[13px] font-medium text-bone-200">Email ID</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-400" />
                    <input
                      id="c-email"
                      type="email"
                      autoComplete="email"
                      className={`${field} ${fieldState('email')}`}
                      placeholder="you@example.com"
                      value={form.email}
                      maxLength={150}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  {touched && errors.email && <p className="mt-1.5 text-[12px] text-signal-red">{errors.email}</p>}
                </div>

                {/* honeypot — hidden from people, catches bots */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />

                {status === 'error' && (
                  <p className="rounded-lg border border-signal-red/30 bg-signal-red/10 px-3 py-2 text-[13px] text-signal-red">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold disabled:cursor-wait disabled:opacity-80"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>

              <div className="mt-5 flex items-center gap-3 text-[12px] text-bone-400">
                <span className="h-px flex-1 bg-white/10" />
                Ready to join?
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-electric-400/45 bg-electric-500/10 px-6 py-3 text-[14.5px] font-semibold text-white transition-all hover:border-electric-300 hover:bg-electric-500/20"
              >
                Register Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
