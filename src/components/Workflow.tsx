import { Eye, Search, Brain, Lightbulb, CheckSquare, ShieldCheck } from 'lucide-react';
import { WORKFLOW_STEPS } from '@/content';

const ICONS = [Eye, Search, Brain, Lightbulb, CheckSquare, ShieldCheck];
const ACCENTS = [
  'text-cyan-400 border-cyan-400/30',
  'text-cyan-400 border-cyan-400/30',
  'text-electric-400 border-electric-400/30',
  'text-electric-400 border-electric-400/30',
  'text-signal-green border-signal-green/30',
  'text-signal-green border-signal-green/30',
];

export default function Workflow() {
  return (
    <section id="workflow" className="relative scroll-mt-20 py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 grid-fine opacity-40" />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        {/* header */}
        <div className="reveal grid grid-cols-1 gap-6 border-b border-ink-600/50 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label-eyebrow text-electric-400">
              <span className="mr-2 inline-block h-1 w-1 rounded-full bg-electric-400 align-middle" />
              Agent Loop
            </p>
            <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1.05] tracking-tight text-bone-50 sm:text-[48px]">
              How every agent
              <br />
              <span className="text-bone-400">reasons and acts.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-bone-300 md:col-span-5 md:pt-2">
            A shared control loop — observe signals, investigate, analyze, recommend, act with
            approval, then verify the outcome.
          </p>
        </div>

        {/* Desktop: horizontal diagram with SVG connectors */}
        <div className="reveal relative mt-14 hidden lg:block">
          <svg
            className="absolute left-0 right-0 top-[34px] w-full"
            height="2"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="#242836"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>

          <div className="grid grid-cols-6 gap-4">
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = ICONS[i];
              return (
                <div key={step.id} className="relative">
                  {/* node */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className={`flex h-[68px] w-[68px] items-center justify-center rounded-full border bg-ink-850 ${ACCENTS[i]}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="mt-5 text-center">
                    <span className="font-mono text-[10px] tracking-label text-bone-400">
                      0{i + 1}
                    </span>
                    <h3 className="mt-1.5 font-display text-[15px] font-semibold text-bone-50">
                      {step.label}
                    </h3>
                    <p className="mx-auto mt-2 max-w-[180px] text-[11.5px] leading-relaxed text-bone-300">
                      {step.description}
                    </p>
                  </div>

                  {/* approved action badge */}
                  {step.id === 'action' && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-signal-green/40 bg-ink-950 px-2 py-0.5 font-mono text-[9px] tracking-label text-signal-green">
                      HUMAN-IN-LOOP
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet: vertical flow */}
        <div className="reveal mt-12 space-y-px lg:hidden">
          {WORKFLOW_STEPS.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={step.id}
                className="flex gap-4 rounded-lg border border-ink-600/50 bg-ink-850/50 p-4"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-ink-850 ${ACCENTS[i]}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] tracking-label text-bone-400">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-[15px] font-semibold text-bone-50">
                      {step.label}
                    </h3>
                    {step.id === 'action' && (
                      <span className="rounded-full border border-signal-green/40 px-1.5 py-0.5 font-mono text-[8px] tracking-label text-signal-green">
                        HUMAN-IN-LOOP
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-bone-300">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
