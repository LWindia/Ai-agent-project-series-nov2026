import { Terminal, Shield, Activity, Check } from 'lucide-react';
import { PROJECTS } from '@/content';

const ICONS = [Terminal, Shield, Activity];
const ACCENT = ['text-cyan-400', 'text-electric-400', 'text-signal-green'];

const ROWS = [
  { label: 'Primary domain', values: ['Kubernetes', 'AWS Cloud', 'Infrastructure'] },
  { label: 'Agent focus', values: ['Troubleshooting', 'Security', 'Observability'] },
  { label: 'Primary data source', values: ['Pod events', 'CloudTrail', 'Prometheus'] },
  { label: 'Output', values: ['Remediation', 'Threat report', 'Root-cause narrative'] },
  { label: 'Human-in-loop action', values: ['Apply fix', 'Block access', 'Tune SLOs'] },
];

export default function Comparison() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="reveal grid grid-cols-1 gap-6 border-b border-ink-600/50 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label-eyebrow text-electric-400">
              <span className="mr-2 inline-block h-1 w-1 rounded-full bg-electric-400 align-middle" />
              At a glance
            </p>
            <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1.05] tracking-tight text-bone-50 sm:text-[48px]">
              Three perspectives
              <br />
              <span className="text-bone-400">on the same stack.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-bone-300 md:col-span-5 md:pt-2">
            Each agent answers a different question about the same production environment.
          </p>
        </div>

        {/* editorial comparison — column-based, not bordered table */}
        <div className="reveal mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-ink-600/70 bg-ink-600/40 md:grid-cols-3">
          {PROJECTS.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <div key={p.id} className="bg-ink-850/70">
                {/* header */}
                <div className="border-b border-ink-600/60 p-6">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${ACCENT[i]}`} />
                    <span className="font-mono text-[10px] tracking-label text-bone-400">
                      {p.index}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[22px] font-semibold tracking-tight text-bone-50">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] text-bone-300">{p.tagline}</p>
                </div>

                {/* rows */}
                <div className="divide-y divide-ink-600/40">
                  {ROWS.map((row) => (
                    <div key={row.label} className="px-6 py-3.5">
                      <p className="font-mono text-[9.5px] tracking-label text-bone-400">
                        {row.label}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-[13px] text-bone-100">
                        <Check className={`h-3.5 w-3.5 ${ACCENT[i]}`} />
                        {row.values[i]}
                      </p>
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
