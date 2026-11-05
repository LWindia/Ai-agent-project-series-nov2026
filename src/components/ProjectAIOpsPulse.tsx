import { Activity, ArrowRight, Gauge, TrendingUp, AlertCircle } from 'lucide-react';

const SERIES = [
  { label: 'p99 latency', values: [42, 38, 45, 41, 39, 44, 120, 88, 61, 48, 43, 40], unit: 'ms' },
  { label: 'error rate', values: [0.2, 0.1, 0.3, 0.2, 0.1, 0.2, 4.8, 2.1, 0.6, 0.3, 0.2, 0.1], unit: '%' },
];

const SERVICES = [
  { name: 'api-gateway', status: 'ok', rps: '12.4k', lat: '34ms' },
  { name: 'payment-svc', status: 'warn', rps: '3.1k', lat: '120ms' },
  { name: 'auth-core', status: 'ok', rps: '8.7k', lat: '18ms' },
  { name: 'inventory', status: 'ok', rps: '5.2k', lat: '27ms' },
];

function sparkline(values: number[], accent: string) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 100;
  const h = 28;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" preserveAspectRatio="none">
      <polyline
        points={pts}
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProjectAIOpsPulse() {
  return (
    <div className="reveal">
      {/* Top — narrative band (wide, left-aligned) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[42px] font-semibold leading-none text-signal-green/30">
              03
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-signal-green/40 to-transparent" />
          </div>

          <p className="label-eyebrow mt-6 text-signal-green">Project 03 · Infrastructure Intelligence</p>

          <h3 className="mt-4 font-display text-[34px] font-semibold leading-[1.05] tracking-tight text-bone-50 sm:text-[40px]">
            AIOps Pulse
          </h3>
          <p className="mt-3 text-[15px] text-bone-300">
            AI Agent for Intelligent Infrastructure Monitoring.
          </p>
        </div>

        <div className="lg:col-span-5 lg:pt-10">
          <p className="text-[14px] leading-relaxed text-bone-300">
            An observability agent that reads Prometheus metrics, correlates anomalies across
            services, and explains infrastructure behavior in plain language.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
            {['Anomaly correlation', 'Metric reasoning', 'SLO tracking', 'Root-cause narrative'].map(
              (cap) => (
                <li
                  key={cap}
                  className="flex items-center gap-2 rounded-full border border-ink-600/60 bg-ink-850/60 px-3 py-1.5 text-[12px] text-bone-200"
                >
                  <Gauge className="h-3 w-3 text-signal-green" />
                  {cap}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Bottom — wide monitoring dashboard */}
      <div className="panel mt-10 rounded-xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-600/60 bg-ink-900/70 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Activity className="h-4 w-4 text-signal-green" />
            <span className="font-mono text-[12px] text-bone-100">aiops-pulse — observability</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="text-bone-400">
              region <span className="text-bone-200">us-east-1</span>
            </span>
            <span className="flex items-center gap-1.5 text-signal-green">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-green animate-pulse-dot" />
              live
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* metric tiles */}
          {SERIES.map((s, i) => (
            <div
              key={s.label}
              className={`p-4 ${
                i < SERIES.length - 1 ? 'border-b border-ink-600/60 lg:border-b-0 lg:border-r' : ''
              } ${i === 0 ? 'lg:border-r' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="label-eyebrow">{s.label}</span>
                {i === 1 ? (
                  <AlertCircle className="h-3.5 w-3.5 text-signal-amber" />
                ) : (
                  <TrendingUp className="h-3.5 w-3.5 text-signal-green" />
                )}
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-mono text-[24px] text-bone-50">
                  {s.values[s.values.length - 1]}
                </span>
                <span className="font-mono text-[11px] text-bone-400">{s.unit}</span>
              </div>
              <div className="mt-2">
                {sparkline(
                  s.values,
                  i === 1 ? '#F5B14C' : '#3FDC8A'
                )}
              </div>
            </div>
          ))}

          {/* service table */}
          <div className="border-t border-ink-600/60 p-4 lg:border-l">
            <p className="label-eyebrow mb-3">Services</p>
            <div className="space-y-1.5">
              {SERVICES.map((svc) => (
                <div
                  key={svc.name}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 transition-colors hover:bg-ink-700/40"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        svc.status === 'ok' ? 'bg-signal-green' : 'bg-signal-amber'
                      }`}
                    />
                    <span className="font-mono text-[11px] text-bone-100">{svc.name}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[10px] text-bone-400">
                    <span>{svc.rps}</span>
                    <span
                      className={svc.status === 'warn' ? 'text-signal-amber' : 'text-bone-300'}
                    >
                      {svc.lat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* agent narrative strip */}
        <div className="border-t border-ink-600/60 bg-ink-900/40 px-4 py-3.5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal-green/15">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-green" />
            </span>
            <p className="font-mono text-[11.5px] leading-relaxed text-bone-200">
              <span className="text-signal-green">agent@aiops</span> — Detected latency anomaly
              on <span className="text-bone-50">payment-svc</span> at 14:03 UTC. Correlated with
              memory pressure on node-04. Likely root cause: connection pool exhaustion.{' '}
              <span className="text-bone-400">confidence 0.84</span>
            </p>
            <ArrowRight className="ml-auto mt-1 h-3.5 w-3.5 shrink-0 text-signal-green" />
          </div>
        </div>
      </div>
    </div>
  );
}
