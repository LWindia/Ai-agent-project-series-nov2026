import { PROGRAM, REGISTER_URL } from '@/content';

export default function Footer() {
  return (
    <footer className="relative border-t border-electric-400/10 bg-ink-950">
      <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src="/lw-logo-light.png" alt="LinuxWorld" width={556} height={308} className="h-12 w-auto" />
              <span aria-hidden className="mx-1.5 h-9 w-px bg-white/15" />
              <span className="font-display text-[20px] font-semibold tracking-tight text-bone-50">
                Agent Series
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[12.5px] leading-relaxed text-bone-400">
              A project series building real-world AI agents for Kubernetes, AWS cloud security,
              and intelligent infrastructure monitoring.
            </p>
          </div>

          {/* nav columns */}
          <div className="md:col-span-7 md:flex md:justify-end">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {[
                {
                  title: 'Series',
                  links: [
                    { label: 'Projects', href: '#projects' },
                    { label: 'FAQ', href: '#faq' },
                    { label: 'Overview', href: '#overview' },
                  ],
                },
                {
                  title: 'Projects',
                  links: [
                    { label: 'KubeDoctor AI', href: '#projects' },
                    { label: 'CloudSentinel AI', href: '#projects' },
                    { label: 'AIOps Pulse', href: '#projects' },
                  ],
                },
                {
                  title: 'Stack',
                  links: [
                    { label: 'Technology', href: '#technology' },
                    { label: 'Roadmap', href: '#overview' },
                    { label: 'Register Now', href: REGISTER_URL },
                  ],
                },
              ].map((col) => (
                <div key={col.title}>
                  <p className="label-eyebrow">{col.title}</p>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-[13px] text-bone-300 transition-colors hover:text-bone-50"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-ink-600/50 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-bone-400">
            © 2026 LinuxWorld · AI Agent Project Series. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-bone-400">
            Live batch starts {PROGRAM.start} · {PROGRAM.recordingAccessDays}-day LMS access
          </p>
        </div>
      </div>
    </footer>
  );
}
