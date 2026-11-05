import { Terminal, ArrowRight, ChevronRight } from 'lucide-react';

const DIAG_LINES = [
  { prompt: true, text: 'agent.investigate pod/payment-svc-7c4' },
  { text: '→ fetching pod events (last 24h) … 23 events' },
  { text: '→ exit code 137 · OOMKilled · memory limit 256Mi' },
  { text: '→ correlating with replica-set rollout #84' },
  { prompt: true, text: 'agent.recommend' },
  { text: '  1. raise memory limit → 512Mi  (conf 0.92)' },
  { text: '  2. add HPA on memory metric    (conf 0.71)' },
  { text: '  ⨯ do not restart node — unrelated' },
];

const NODES = [
  { name: 'node-01', role: 'control-plane', status: 'ok' },
  { name: 'node-02', role: 'worker', status: 'ok' },
  { name: 'node-03', role: 'worker', status: 'warn' },
  { name: 'node-04', role: 'worker', status: 'ok' },
];

export default function ProjectKubeDoctor() {
  return (
    <div className="reveal grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Left — narrative */}
      <div className="lg:col-span-5 lg:pt-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[42px] font-semibold leading-none text-cyan-500/30">
            01
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
        </div>

        <p className="label-eyebrow mt-6 text-cyan-400">Project 01 · Kubernetes Operations</p>

        <h3 className="mt-4 font-display text-[34px] font-semibold leading-[1.05] tracking-tight text-bone-50 sm:text-[40px]">
          KubeDoctor AI
        </h3>
        <p className="mt-3 text-[15px] text-bone-300">
          AI Agent for Kubernetes Application Troubleshooting.
        </p>

        <p className="mt-6 max-w-[420px] text-[14px] leading-relaxed text-bone-300">
          An autonomous agent that investigates failing pods, decodes cluster events, and
          recommends remediation across complex Kubernetes workloads.
        </p>

        <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3">
          {['Pod diagnostics', 'Event correlation', 'Remediation paths', 'Health scoring'].map(
            (cap) => (
              <li key={cap} className="flex items-center gap-2.5 text-[13px] text-bone-200">
                <ChevronRight className="h-3.5 w-3.5 text-cyan-400" />
                {cap}
              </li>
            )
          )}
        </ul>

        <a
          href="#overview"
          className="group mt-9 inline-flex items-center gap-2 text-[13px] font-medium text-cyan-400 transition-colors hover:text-cyan-300"
        >
          View project overview
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Right — Kubernetes diagnostic interface */}
      <div className="lg:col-span-7">
        <div className="panel rounded-xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
          {/* top bar */}
          <div className="flex items-center justify-between border-b border-ink-600/60 bg-ink-900/70 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Terminal className="h-4 w-4 text-cyan-400" />
              <span className="font-mono text-[12px] text-bone-100">kubedoctor — diagnostic console</span>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-signal-amber">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-amber animate-pulse-dot" />
              investigating
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* node rail */}
            <div className="border-b border-ink-600/60 p-4 md:col-span-2 md:border-b-0 md:border-r">
              <p className="label-eyebrow mb-3">Cluster nodes</p>
              <div className="space-y-2">
                {NODES.map((n) => (
                  <div
                    key={n.name}
                    className="flex items-center justify-between rounded-md border border-ink-600/50 bg-ink-800/40 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          n.status === 'ok' ? 'bg-signal-green' : 'bg-signal-amber'
                        }`}
                      />
                      <span className="font-mono text-[11.5px] text-bone-100">{n.name}</span>
                    </div>
                    <span className="font-mono text-[9.5px] tracking-label text-bone-400">
                      {n.role}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-md border border-cyan-500/20 bg-cyan-500/[0.04] p-3">
                <p className="font-mono text-[10px] text-cyan-400">root cause</p>
                <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-bone-200">
                  OOMKilled — memory limit too low for rollout #84
                </p>
              </div>
            </div>

            {/* diagnostic console */}
            <div className="grid-fine md:col-span-3">
              <div className="p-4 font-mono text-[11.5px] leading-relaxed">
                {DIAG_LINES.map((line, i) => (
                  <div
                    key={i}
                    className={`py-1 ${
                      line.prompt ? 'text-cyan-400' : 'text-bone-200'
                    }`}
                  >
                    {line.prompt && <span className="text-bone-400">{'> '}</span>}
                    {line.text}
                  </div>
                ))}
                <div className="flex items-center gap-1 py-1 text-cyan-400">
                  <span className="text-bone-400">{'> '}</span>
                  <span className="inline-block h-3.5 w-2 bg-cyan-400 animate-blink" />
                </div>
              </div>
            </div>
          </div>

          {/* bottom strip — pod health timeline */}
          <div className="border-t border-ink-600/60 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="label-eyebrow">Pod health · last 6h</p>
              <span className="font-mono text-[10px] text-bone-400">prod/payment-svc</span>
            </div>
            <div className="flex h-12 items-end gap-1">
              {Array.from({ length: 48 }).map((_, i) => {
                const failed = i >= 30 && i <= 36;
                const recovering = i > 36 && i <= 40;
                const h = failed ? 100 : recovering ? 60 : 20 + ((i * 7) % 30);
                const color = failed
                  ? 'bg-signal-red/70'
                  : recovering
                    ? 'bg-signal-amber/70'
                    : 'bg-cyan-500/50';
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm ${color}`}
                    style={{ height: `${h}%` }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
