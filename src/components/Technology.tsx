import { TECH_GROUPS } from '@/content';
import { Cpu, Boxes, Cloud, BrainCircuit } from 'lucide-react';

const GROUP_ICONS = [Cpu, Boxes, Cloud, BrainCircuit];

export default function Technology() {
  return (
    <section id="technology" className="relative scroll-mt-20 py-12 sm:py-16">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="reveal grid grid-cols-1 gap-6 border-b border-ink-600/50 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label-eyebrow text-electric-400">
              <span className="mr-2 inline-block h-1 w-1 rounded-full bg-electric-400 align-middle" />
              Engineering Stack
            </p>
            <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1.05] tracking-tight text-bone-50 sm:text-[48px]">
              Built on the tools
              <br />
              <span className="text-bone-400">production teams trust.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-bone-300 md:col-span-5 md:pt-2">
            Each project layers a focused set of technologies — from the agent core out to the
            cloud and observability plane.
          </p>
        </div>

        {/* structured group grid */}
        <div className="reveal mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-ink-600/70 bg-ink-600/40 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_GROUPS.map((group, i) => {
            const Icon = GROUP_ICONS[i];
            return (
              <div key={group.category} className="bg-ink-850/70 p-6 transition-colors hover:bg-ink-800/70">
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-electric-400" />
                  <h3 className="font-display text-[14px] font-semibold tracking-tight text-bone-50">
                    {group.category}
                  </h3>
                </div>

                <div className="mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between border-b border-ink-600/40 pb-2.5 last:border-b-0"
                    >
                      <span className="font-mono text-[12.5px] text-bone-200">{item}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-electric-500/40" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
