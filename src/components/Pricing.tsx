import { Activity, ArrowRight, Check, MessageCircle, Shield, Sparkles, Terminal } from 'lucide-react';
import { PRICING, PROGRAM, REGISTER_URL } from '@/content';
import { openContact } from '@/components/ContactModal';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const INCLUDES = [
  'All 3 real-world AI agent projects, built end to end',
  'Live, hands-on sessions with the instructor',
  `${PROGRAM.recordingAccessDays}-day access to every recording on the LMS portal`,
  'Production-grade patterns: observe, reason and act with human approval',
  'Kubernetes, AWS security and AIOps — in one bundle',
];

const BUNDLE = [
  { name: 'KubeDoctor AI', icon: Terminal, tint: 'text-cyan-300' },
  { name: 'CloudSentinel AI', icon: Shield, tint: 'text-electric-300' },
  { name: 'AIOps Pulse', icon: Activity, tint: 'text-plasma-300' },
];

/* A string of festive lights (toran) hanging across the card */
function Lights() {
  const n = 25;
  const sag = (t: number) => 6 + 30 * Math.sin(Math.PI * t);
  const path = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    return `${i ? 'L' : 'M'}${(t * 1000).toFixed(1)} ${sag(t).toFixed(1)}`;
  }).join(' ');
  return (
    <svg aria-hidden viewBox="0 0 1000 60" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-10 w-full sm:h-12">
      <path d={path} fill="none" stroke="rgba(251,191,92,0.35)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      {Array.from({ length: n }, (_, i) => {
        const t = (i + 0.5) / n;
        return (
          <circle
            key={i}
            cx={t * 1000}
            cy={sag(t) + 7}
            r="4"
            fill={i % 3 === 1 ? '#C4B5FD' : '#FBBF5C'}
            className="diwali-light"
            style={{ animationDelay: `${(i % 6) * 0.35}s` }}
          />
        );
      })}
    </svg>
  );
}

export default function Pricing() {
  const off = Math.round((1 - PRICING.price / PRICING.originalPrice) * 100);
  const save = PRICING.originalPrice - PRICING.price;

  return (
    <section id="pricing" className="relative scroll-mt-20 overflow-hidden py-12 sm:py-16">
      {/* warm festive glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.28), rgba(124,58,237,0.25) 45%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="reveal mx-auto max-w-[720px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FBBF5C]/40 bg-[#FBBF5C]/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-[#FCD58A]">
            <span aria-hidden>🪔</span>
            Diwali Sale · Limited-period offer
          </span>
          <h2 className="mt-5 font-display text-[34px] font-semibold leading-[1.08] tracking-tight text-bone-50 sm:text-[46px]">
            One bundle. <span className="text-ai">All three agents.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15.5px] leading-relaxed text-bone-300">
            Celebrate Diwali with the complete AI Agent Project Series at{' '}
            <strong className="font-semibold text-white">{off}% off</strong> — live, hands-on and built end to end.
          </p>
        </div>

        <div className="reveal relative mx-auto mt-10 max-w-[1000px]">
          <div className="frame-ai overflow-hidden">
            <Lights />

            <div className="relative grid grid-cols-1 gap-0 pt-10 sm:pt-12 lg:grid-cols-[1fr_1.05fr]">
              {/* price side */}
              <div className="relative border-b border-white/[0.07] px-6 pb-8 pt-4 sm:px-10 lg:border-b-0 lg:border-r lg:pb-10">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.08em] text-ink-950 shadow-[0_6px_20px_-6px_rgba(245,158,11,0.8)]">
                    {off}% off
                  </span>
                  <span className="text-[13px] font-semibold text-[#FCD58A]">{PRICING.offerName}</span>
                </div>

                <p className="mt-6 text-[14px] text-bone-400">Complete series · all 3 projects</p>
                <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
                  <span className="font-display text-[64px] font-bold leading-none tracking-tight text-white sm:text-[76px]">
                    {inr(PRICING.price)}
                  </span>
                  <span className="mb-2 text-[22px] font-medium text-bone-400 line-through decoration-signal-red/80 decoration-2 sm:text-[26px]">
                    {inr(PRICING.originalPrice)}
                  </span>
                </div>
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-signal-green/10 px-2.5 py-1 text-[13.5px] font-semibold text-signal-green">
                  <Sparkles className="h-3.5 w-3.5" />
                  You save {inr(save)}
                </p>

                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group mt-8 flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 text-[16px] font-semibold"
                >
                  Grab the Diwali Offer
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-500 group-hover:translate-x-1" />
                </a>
                <button
                  onClick={() => openContact('pricing')}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[14px] font-medium text-bone-300 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Have questions? Contact us
                </button>

                <p className="mt-4 text-center text-[12.5px] text-bone-400">
                  Live batch starts {PROGRAM.start} · Secure payment via Razorpay
                </p>
              </div>

              {/* includes side */}
              <div className="px-6 pb-8 pt-8 sm:px-10 lg:pb-10 lg:pt-4">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-bone-400">The bundle includes</p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {BUNDLE.map((b) => (
                    <div key={b.name} className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-inset ring-white/[0.08]">
                      <b.icon className={`h-4 w-4 shrink-0 ${b.tint}`} strokeWidth={2} />
                      <span className="whitespace-nowrap text-[13px] font-semibold text-bone-50">{b.name}</span>
                    </div>
                  ))}
                </div>

                <ul className="mt-6 space-y-3.5">
                  {INCLUDES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-cyan-500">
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </span>
                      <span className="text-[14.5px] leading-snug text-bone-100">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
