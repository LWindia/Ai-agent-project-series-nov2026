import { useState } from 'react';
import { ArrowRight, CalendarDays, MessageCircle, MonitorPlay, Plus, Radio } from 'lucide-react';
import { FAQS, PROGRAM, REGISTER_URL } from '@/content';
import { openContact } from '@/components/ContactModal';

const HIGHLIGHTS = [
  { icon: CalendarDays, label: 'Starts', value: PROGRAM.start },
  { icon: Radio, label: 'Format', value: 'Live, hands-on sessions' },
  { icon: MonitorPlay, label: 'Recordings', value: `${PROGRAM.recordingAccessDays} days on LMS portal` },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-20 py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/3 h-[420px] w-[520px] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.45), transparent 70%)' }}
      />
      <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* left */}
        <div className="reveal lg:col-span-5">
          <p className="label-eyebrow text-electric-400">
            <span className="mr-2 inline-block h-1 w-1 rounded-full bg-electric-400 align-middle" />
            FAQ
          </p>
          <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1.08] tracking-tight text-bone-50 sm:text-[48px]">
            Frequently asked <span className="text-ai">questions.</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-bone-300">
            Everything you need to know about the live program, schedule and recordings.
          </p>

          {/* key facts */}
          <ul className="mt-8 divide-y divide-white/[0.06] overflow-hidden rounded-2xl bg-ink-900/60 ring-1 ring-inset ring-white/[0.07]">
            {HIGHLIGHTS.map((h) => (
              <li key={h.label} className="flex items-center gap-4 px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric-600 to-indigo-500 shadow-[0_8px_20px_-8px_rgba(124,58,237,0.9)]">
                  <h.icon className="h-5 w-5 text-white" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1 text-[14px] text-bone-400">{h.label}</span>
                <span className="text-right text-[15px] font-semibold text-bone-50">{h.value}</span>
              </li>
            ))}
          </ul>

          {/* contact prompt */}
          <div className="relative mt-6 overflow-hidden rounded-2xl bg-ink-900/60 p-6 ring-1 ring-inset ring-white/[0.07]">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-60 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.7), transparent 70%)' }}
            />
            <p className="relative font-display text-[18px] font-semibold text-bone-50">Still have questions?</p>
            <p className="relative mt-1 text-[14px] text-bone-300">Our team will get back to you on WhatsApp.</p>
            <div className="relative mt-5 flex flex-wrap gap-3">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold"
              >
                Register Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <button
                onClick={() => openContact('faq')}
                className="btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* right — accordion */}
        <div className="reveal lg:col-span-7">
          <div className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/10 bg-ink-900/50 backdrop-blur">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-white/[0.02] sm:px-7"
                    >
                      <span className={`text-[15.5px] font-semibold sm:text-[16.5px] ${isOpen ? 'text-white' : 'text-bone-100'}`}>
                        {f.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? 'rotate-45 border-electric-400 bg-electric-500/20 text-electric-200'
                            : 'border-white/15 text-bone-300'
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 pr-16 text-[14.5px] leading-relaxed text-bone-300 sm:px-7 sm:pr-20">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
