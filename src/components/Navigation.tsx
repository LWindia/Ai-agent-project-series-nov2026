import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NAV_LINKS, REGISTER_URL } from '@/content';
import { openContact } from '@/components/ContactModal';
import { useActiveSection } from '@/hooks/useReveal';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const active = useActiveSection(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNav = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-electric-400/10 bg-ink-950/70 backdrop-blur-2xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2.5 sm:gap-3"
          aria-label="Back to top"
        >
          <img
            src="/lw-logo-light.png"
            alt="LinuxWorld"
            width={556}
            height={308}
            className="h-10 w-auto sm:h-11"
          />
          <span aria-hidden className="mx-1 h-8 w-px bg-white/15 sm:mx-1.5" />
          <span className="whitespace-nowrap font-display text-[18px] font-semibold leading-none tracking-[-0.03em] text-bone-50 sm:text-[22px]">
            AI Agent Series
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-3 xl:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`group relative px-4 py-2 text-[15.5px] font-medium transition-colors ${
                active === link.id ? 'text-bone-50' : 'text-bone-100 hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute inset-x-4 -bottom-px h-px origin-center bg-gradient-to-r from-transparent via-cyan-300 to-transparent transition-transform duration-300 ${
                  active === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openContact('nav')}
            className="hidden px-3 py-2 text-[15px] font-medium text-bone-100 transition-colors hover:text-white xl:block"
          >
            Contact Us
          </button>
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 rounded-full border-2 border-electric-500 bg-electric-500/10 px-6 py-2.5 text-[15px] font-semibold text-white shadow-[0_0_24px_-6px_rgba(139,92,246,0.8)] transition-all hover:bg-electric-500/25 hover:shadow-[0_0_32px_-4px_rgba(139,92,246,0.9)] whitespace-nowrap sm:flex"
          >
            Register Now
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-electric-400/30 bg-ink-850/60 text-electric-200 xl:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-electric-400/10 bg-ink-950/95 backdrop-blur-xl transition-[max-height,opacity] duration-400 xl:hidden ${
          open ? 'max-h-[34rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`flex items-center justify-between rounded-lg px-3 py-3.5 text-left font-display text-[18px] font-semibold tracking-tight transition-colors ${
                active === link.id
                  ? 'bg-ink-800/70 text-bone-50'
                  : 'text-bone-300 hover:bg-ink-850/60 hover:text-bone-50'
              }`}
            >
              {link.label}
              <ArrowRight className="h-3.5 w-3.5 opacity-50" />
            </button>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              openContact('nav-mobile');
            }}
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-electric-400/45 px-4 py-3.5 text-[14px] font-semibold text-white"
          >
            Contact Us
          </button>
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-[14px] font-semibold"
          >
            Register Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
