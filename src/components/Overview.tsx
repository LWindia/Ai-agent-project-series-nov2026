import { ArrowRight, Terminal, Shield, Activity } from 'lucide-react';
import { PROGRAM, REGISTER_URL } from '@/content';
import { openContact } from '@/components/ContactModal';

export default function Overview() {
  return (
    <section id="overview" className="relative scroll-mt-20 py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-40" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[300px] opacity-[0.06] blur-3xl"
        style={{ background: 'radial-gradient(ellipse at center, #6B5BFF 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="reveal grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* left — statement */}
          <div className="lg:col-span-7">
            <p className="label-eyebrow text-electric-400">
              <span className="mr-2 inline-block h-1 w-1 rounded-full bg-electric-400 align-middle" />
              Start the series
            </p>
            <h2 className="mt-5 font-display text-[40px] font-semibold leading-[1.02] tracking-tight text-bone-50 sm:text-[56px]">
              Build the agents that
              <br />
              <span className="text-bone-400">run the world's infrastructure.</span>
            </h2>
            <p className="mt-6 max-w-md text-[14.5px] leading-relaxed text-bone-300">
              Registration is open for the live batch starting {PROGRAM.start}. Reserve your
              seat now, or leave your details and our team will reach out on WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold"
              >
                Register Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <button
                onClick={() => openContact('overview')}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[14px] font-medium text-bone-100 transition-colors hover:border-electric-300 hover:text-white"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* right — index card */}
          <div className="lg:col-span-5">
            <div className="panel rounded-xl p-6">
              <div className="flex items-center justify-between border-b border-ink-600/60 pb-4">
                <span className="font-display text-[14px] font-semibold text-bone-50">
                  Project index
                </span>
                <span className="font-mono text-[10px] text-bone-400">03 modules</span>
              </div>

              <div className="divide-y divide-ink-600/40">
                {[
                  { n: '01', name: 'KubeDoctor AI', icon: Terminal, accent: 'text-cyan-400' },
                  { n: '02', name: 'CloudSentinel AI', icon: Shield, accent: 'text-electric-400' },
                  { n: '03', name: 'AIOps Pulse', icon: Activity, accent: 'text-signal-green' },
                ].map((p) => (
                  <a
                    key={p.n}
                    href="#projects"
                    className="group flex items-center gap-4 py-4 transition-colors hover:bg-ink-800/30"
                  >
                    <span className="font-mono text-[11px] text-bone-400">{p.n}</span>
                    <p.icon className={`h-4 w-4 ${p.accent}`} />
                    <span className="text-[13.5px] font-medium text-bone-100">{p.name}</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-bone-400 transition-all group-hover:translate-x-0.5 group-hover:text-bone-100" />
                  </a>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-lg border border-ink-600/50 bg-ink-800/40 px-4 py-3">
                <span className="font-mono text-[10.5px] text-bone-300">Live batch</span>
                <span className="font-mono text-[10.5px] text-bone-400">starts {PROGRAM.start}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
