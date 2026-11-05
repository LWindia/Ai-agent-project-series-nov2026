import { ArrowDown, Terminal, Shield, Activity } from 'lucide-react';
import { PROJECTS } from '@/content';

const ICONS = [Terminal, Shield, Activity];
const ACCENT_BORDER = ['border-cyan-400/30', 'border-electric-400/30', 'border-signal-green/30'];
const ACCENT_TEXT = ['text-cyan-400', 'text-electric-400', 'text-signal-green'];
const ACCENT_BG = ['bg-cyan-400/10', 'bg-electric-400/10', 'bg-signal-green/10'];

export default function Roadmap() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="reveal grid grid-cols-1 gap-6 border-b border-ink-600/50 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label-eyebrow text-electric-400">
              <span className="mr-2 inline-block h-1 w-1 rounded-full bg-electric-400 align-middle" />
              Progression
            </p>
            <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1.05] tracking-tight text-bone-50 sm:text-[48px]">
              The build path,
              <br />
              <span className="text-bone-400">project by project.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-bone-300 md:col-span-5 md:pt-2">
            Each project compounds on the last — from cluster operations to cloud security to
            full infrastructure intelligence.
          </p>
        </div>

        <div className="reveal mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0">
          {PROJECTS.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <div key={p.id} className="relative">
                {/* connector — desktop horizontal */}
                {i < PROJECTS.length - 1 && (
                  <div className="absolute right-0 top-[42px] hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-ink-600 to-transparent md:block" />
                )}
                {/* connector — mobile vertical */}
                {i < PROJECTS.length - 1 && (
                  <div className="absolute left-[42px] top-[84px] h-[calc(100%-84px)] w-px bg-gradient-to-b from-ink-600 to-transparent md:hidden" />
                )}

                <div
                  className={`relative rounded-xl border ${ACCENT_BORDER[i]} bg-ink-850/60 p-6 transition-transform hover:-translate-y-1`}
                >
                  {/* number + icon */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-[52px] w-[52px] items-center justify-center rounded-lg border ${ACCENT_BORDER[i]} ${ACCENT_BG[i]}`}
                    >
                      <Icon className={`h-5 w-5 ${ACCENT_TEXT[i]}`} />
                    </span>
                    <div>
                      <span className="font-mono text-[10px] tracking-label text-bone-400">
                        PHASE {p.index}
                      </span>
                      <p className={`font-mono text-[11px] ${ACCENT_TEXT[i]}`}>{p.domain}</p>
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-[20px] font-semibold tracking-tight text-bone-50">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-bone-300">
                    {p.description}
                  </p>

                  {/* progress rail */}
                  <div className="mt-6 flex items-center gap-2">
                    {PROJECTS.map((_, j) => (
                      <span
                        key={j}
                        className={`h-1 flex-1 rounded-full ${
                          j <= i ? ACCENT_BG[i].replace('/10', '/60') : 'bg-ink-600/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* arrow between — mobile */}
                {i < PROJECTS.length - 1 && (
                  <div className="flex justify-center py-3 md:hidden">
                    <ArrowDown className={`h-4 w-4 ${ACCENT_TEXT[i]}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
