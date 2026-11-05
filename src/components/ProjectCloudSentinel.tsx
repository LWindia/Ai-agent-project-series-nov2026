import { Shield, AlertTriangle, ArrowRight, Lock, KeyRound, Eye } from 'lucide-react';

const EVENTS = [
  { time: '14:02:11', event: 'AssumeRole', actor: 'deploy-bot', sev: 'low' },
  { time: '14:02:34', event: 'DescribeInstances', actor: 'svc-monitor', sev: 'low' },
  { time: '14:03:09', event: 'CreateAccessKey', actor: 'iam-user#ops', sev: 'crit' },
  { time: '14:03:41', event: 'AttachRolePolicy', actor: 'iam-user#ops', sev: 'crit' },
  { time: '14:04:02', event: 'DeleteKeyPair', actor: 'svc-monitor', sev: 'warn' },
];

const sevColor: Record<string, string> = {
  low: 'text-signal-green',
  warn: 'text-signal-amber',
  crit: 'text-signal-red',
};

const FINDINGS = [
  { icon: KeyRound, label: 'Over-privileged IAM role', detail: 's3:* on all buckets', sev: 'crit' },
  { icon: Lock, label: 'Public S3 bucket', detail: 'logs-archive-7', sev: 'crit' },
  { icon: Eye, label: 'Unusual API burst', detail: 'us-east-1 · 412 calls/min', sev: 'warn' },
];

export default function ProjectCloudSentinel() {
  return (
    <div className="reveal grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Left — security interface */}
      <div className="order-2 lg:order-1 lg:col-span-7">
        <div className="panel rounded-xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between border-b border-ink-600/60 bg-ink-900/70 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Shield className="h-4 w-4 text-electric-400" />
              <span className="font-mono text-[12px] text-bone-100">
                cloudsentinel — security monitor
              </span>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-signal-red">
              <AlertTriangle className="h-3 w-3" />
              2 critical
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* CloudTrail event panel */}
            <div className="grid-fine md:col-span-3 md:border-r md:border-ink-600/60">
              <div className="p-4">
                <p className="label-eyebrow mb-3">CloudTrail · event stream</p>
                <div className="space-y-px">
                  {EVENTS.map((e, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded px-2 py-2 font-mono text-[11px] transition-colors hover:bg-ink-700/40"
                    >
                      <span className="text-bone-400">{e.time}</span>
                      <span className={`font-medium ${sevColor[e.sev]}`}>{e.event}</span>
                      <span className="ml-auto truncate text-bone-300">{e.actor}</span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          e.sev === 'crit'
                            ? 'bg-signal-red'
                            : e.sev === 'warn'
                              ? 'bg-signal-amber'
                              : 'bg-signal-green'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* findings */}
            <div className="md:col-span-2">
              <div className="p-4">
                <p className="label-eyebrow mb-3">Agent findings</p>
                <div className="space-y-2">
                  {FINDINGS.map((f, i) => (
                    <div
                      key={i}
                      className="rounded-md border border-ink-600/50 bg-ink-800/40 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <f.icon
                          className={`h-3.5 w-3.5 ${
                            f.sev === 'crit' ? 'text-signal-red' : 'text-signal-amber'
                          }`}
                        />
                        <span className="text-[12px] font-medium text-bone-100">{f.label}</span>
                      </div>
                      <p className="mt-1.5 font-mono text-[10.5px] text-bone-400">{f.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* posture bar */}
          <div className="grid grid-cols-4 gap-px border-t border-ink-600/60 bg-ink-600/40">
            {[
              { label: 'IAM', val: 38, tone: 'crit' },
              { label: 'S3', val: 54, tone: 'warn' },
              { label: 'EC2', val: 81, tone: 'ok' },
              { label: 'CloudTrail', val: 92, tone: 'ok' },
            ].map((s) => (
              <div key={s.label} className="bg-ink-850/80 p-3">
                <span className="font-mono text-[9.5px] tracking-label text-bone-400">
                  {s.label}
                </span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-mono text-[16px] text-bone-50">{s.val}</span>
                  <span className="font-mono text-[10px] text-bone-400">/100</span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink-600/70">
                  <div
                    className={`h-full rounded-full ${
                      s.tone === 'crit'
                        ? 'bg-signal-red'
                        : s.tone === 'warn'
                          ? 'bg-signal-amber'
                          : 'bg-signal-green'
                    }`}
                    style={{ width: `${s.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — narrative (asymmetrical: narrower) */}
      <div className="order-1 lg:order-2 lg:col-span-5 lg:pt-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[42px] font-semibold leading-none text-electric-500/30">
            02
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-electric-500/40 to-transparent" />
        </div>

        <p className="label-eyebrow mt-6 text-electric-400">Project 02 · Cloud Security</p>

        <h3 className="mt-4 font-display text-[34px] font-semibold leading-[1.05] tracking-tight text-bone-50 sm:text-[40px]">
          CloudSentinel AI
        </h3>
        <p className="mt-3 text-[15px] text-bone-300">
          AI Agent for AWS Cloud Security Monitoring.
        </p>

        <p className="mt-6 max-w-[420px] text-[14px] leading-relaxed text-bone-300">
          A security agent that continuously reasons over CloudTrail events, IAM posture, and
          resource exposure to surface real threats before they escalate.
        </p>

        <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3">
          {['Threat detection', 'IAM analysis', 'CloudTrail reasoning', 'Exposure mapping'].map(
            (cap) => (
              <li key={cap} className="flex items-center gap-2.5 text-[13px] text-bone-200">
                <ArrowRight className="h-3.5 w-3.5 text-electric-400" />
                {cap}
              </li>
            )
          )}
        </ul>

        <a
          href="#overview"
          className="group mt-9 inline-flex items-center gap-2 text-[13px] font-medium text-electric-400 transition-colors hover:text-electric-300"
        >
          View project overview
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
