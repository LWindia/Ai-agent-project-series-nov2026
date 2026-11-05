import {
  ArrowRight,
  Box,
  Brain,
  MessageCircle,
  Cloud,
  Code2,
  Infinity as InfinityIcon,
  Layers,
  ShipWheel,
  TrendingUp,
  Wrench,
  Zap,
} from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { REGISTER_URL } from '@/content';
import { openContact } from '@/components/ContactModal';

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

/* ————————————————————————————————————————————————
   Background: dotted wave landscape
   ———————————————————————————————————————————————— */
const WAVE_DOTS = (() => {
  const W = 1600;
  const H = 320;
  const rows = 20;
  const cols = 96;
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  for (let r = 0; r < rows; r++) {
    const t = r / (rows - 1); // 0 = front, 1 = far
    const baseY = H - 10 - Math.pow(t, 0.75) * 230;
    const amp = 46 * (1 - t * 0.55);
    for (let c = 0; c < cols; c++) {
      const x = (c / (cols - 1)) * W;
      const y =
        baseY -
        amp * Math.sin(x / 260 + r * 0.35) * 0.7 -
        amp * 0.6 * Math.sin(x / 140 - r * 0.2) * (x / W);
      dots.push({ x, y, r: 1.7 - t * 1.1, o: 0.75 - t * 0.6 });
    }
  }
  return { W, H, dots };
})();

/* ————————————————————————————————————————————————
   Robot visual (SVG, viewBox 640 × 600)
   ———————————————————————————————————————————————— */
const CX = 320;
const RX = 282;
const TOP = 252;
const SAG = 52;
const BAND = 112;
const yTop = (x: number) => TOP + SAG * Math.sqrt(Math.max(0, 1 - ((x - CX) / RX) ** 2));

function panelPath(x1: number, x2: number) {
  const steps = 10;
  const top: string[] = [];
  const bot: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = x1 + ((x2 - x1) * i) / steps;
    top.push(`${x.toFixed(1)},${yTop(x).toFixed(1)}`);
    bot.unshift(`${x.toFixed(1)},${(yTop(x) + BAND).toFixed(1)}`);
  }
  return `M${top.join(' L')} L${bot.join(' L')} Z`;
}

const PANELS = [
  { x1: 44, x2: 158, key: 'aws' },
  { x1: 166, x2: 222, key: 'data' },
  { x1: 230, x2: 410, key: 'k8s' },
  { x1: 418, x2: 506, key: 'term' },
  { x1: 514, x2: 596, key: 'cloud' },
];

function PanelGlyph({ k, x1, x2 }: { k: string; x1: number; x2: number }) {
  const mx = (x1 + x2) / 2;
  const my = yTop(mx) + BAND / 2;
  const stroke = { stroke: '#E9F4FF', strokeWidth: 3, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (k) {
    case 'aws':
      return (
        <g transform={`translate(${mx} ${my}) rotate(9)`}>
          <text textAnchor="middle" y="6" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="30" fill="#F4F6FC">
            AWS
          </text>
          <rect x="-26" y="16" width="52" height="3.5" rx="1.75" fill="#FBBF5C" />
        </g>
      );
    case 'data':
      return (
        <g transform={`translate(${mx} ${my})`} opacity="0.6">
          {[-16, -6, 4, 14].map((y, i) => (
            <rect key={y} x={-14} y={y} width={[22, 28, 16, 24][i]} height="3" rx="1.5" fill="#A5F3FC" />
          ))}
        </g>
      );
    case 'k8s':
      return (
        <g transform={`translate(${mx} ${my})`} filter="url(#glowSoft)">
          <polygon
            points={Array.from({ length: 7 }, (_, i) => {
              const a = (Math.PI * 2 * i) / 7 - Math.PI / 2;
              return `${(Math.cos(a) * 44).toFixed(1)},${(Math.sin(a) * 44).toFixed(1)}`;
            }).join(' ')}
            {...stroke}
            strokeWidth="3.5"
          />
          <circle r="22" {...stroke} />
          <circle r="6" fill="#E9F4FF" />
          {Array.from({ length: 7 }, (_, i) => {
            const a = (Math.PI * 2 * i) / 7 - Math.PI / 2;
            return (
              <line key={i} x1={Math.cos(a) * 8} y1={Math.sin(a) * 8} x2={Math.cos(a) * 32} y2={Math.sin(a) * 32} {...stroke} />
            );
          })}
        </g>
      );
    case 'term':
      return (
        <g transform={`translate(${mx - 22} ${my - 4}) skewY(-6)`} {...stroke} strokeWidth="4">
          <polyline points="0,-12 14,0 0,12" />
          <line x1="22" y1="14" x2="44" y2="14" />
        </g>
      );
    case 'cloud':
      return (
        <g transform={`translate(${mx} ${my - 2}) skewY(-14)`}>
          <path
            d="M-20 12 h38 a12 12 0 0 0 0 -24 a17 17 0 0 0 -32 -4 a13 13 0 0 0 -6 28 z"
            {...stroke}
            strokeWidth="3"
          />
        </g>
      );
    default:
      return null;
  }
}

function RobotScene() {
  return (
    <svg viewBox="0 0 640 600" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="shell" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#DCE1EE" />
          <stop offset="100%" stopColor="#9BA3BD" />
        </linearGradient>
        <linearGradient id="shellDark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6E9F3" />
          <stop offset="100%" stopColor="#7E86A3" />
        </linearGradient>
        <linearGradient id="visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B2148" />
          <stop offset="100%" stopColor="#05071A" />
        </linearGradient>
        <linearGradient id="panelFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C8CFF" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="panelFillHi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5EC8FF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#4338CA" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="panelStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="50%" stopColor="#67E8F9" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id="baseSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1D45" />
          <stop offset="100%" stopColor="#090B22" />
        </linearGradient>
        <radialGradient id="padGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#A5F3FC" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#22C3E6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#22C3E6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="blurBig">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* ambient glow */}
      <ellipse cx="320" cy="300" rx="250" ry="210" fill="#6D28D9" opacity="0.28" filter="url(#blurBig)" />

      {/* light beam from pad */}
      <path d="M220 446 L170 120 L470 120 L420 446 Z" fill="url(#beam)" opacity="0.35" />

      {/* back half of the holo ring + chart panel */}
      <path
        d={`M${CX - RX} ${TOP} A ${RX} ${SAG} 0 0 1 ${CX + RX} ${TOP}`}
        fill="none"
        stroke="url(#panelStroke)"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <g transform="translate(478 168) skewY(8)">
        <rect width="86" height="78" rx="10" fill="url(#panelFill)" stroke="#67E8F9" strokeOpacity="0.5" />
        {[22, 40, 58].map((x, i) => (
          <rect key={x} x={x - 6} y={[38, 24, 32][i]} width="11" height={[28, 42, 34][i]} rx="2" fill="#4FE3A1" filter="url(#glowSoft)" />
        ))}
      </g>

      {/* ——— robot ——— */}
      <g className="robot-bob">
        {/* torso */}
        <path d="M245 318 C245 262 278 236 320 236 C362 236 395 262 395 318 L395 360 L245 360 Z" fill="url(#shell)" />
        <path d="M262 300 C262 266 288 250 320 250" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* badge */}
        <g transform="translate(320 286)">
          <polygon points="0,-24 21,-12 21,12 0,24 -21,12 -21,-12" fill="#0B0F2A" stroke="#A78BFA" strokeWidth="2.5" />
          <text textAnchor="middle" y="7" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="20" fill="#FFFFFF">
            A
          </text>
        </g>
        {/* right arm (resting) */}
        <path d="M384 262 C410 270 420 288 418 302" stroke="url(#shellDark)" strokeWidth="26" strokeLinecap="round" fill="none" />
        {/* neck */}
        <rect x="298" y="220" width="44" height="22" rx="8" fill="#5B6385" />
        {/* head */}
        <rect x="222" y="74" width="196" height="156" rx="74" fill="url(#shell)" />
        <path d="M262 92 C285 80 330 78 360 86" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9" />
        {/* headphones */}
        {[220, 420].map((x) => (
          <g key={x}>
            <circle cx={x} cy="158" r="28" fill="url(#shellDark)" />
            <circle cx={x} cy="158" r="17" fill="#0B0F2A" />
            <circle cx={x} cy="158" r="15" fill="none" stroke="#45DCF2" strokeWidth="4.5" filter="url(#glow)" />
          </g>
        ))}
        {/* visor */}
        <rect x="244" y="108" width="152" height="98" rx="46" fill="url(#visor)" stroke="#2F364B" strokeWidth="2" />
        <path d="M262 122 C280 114 304 112 322 114" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* eyes */}
        <g filter="url(#glow)" className="robot-eyes">
          <circle cx="290" cy="156" r="17" fill="#5FF5FF" />
          <circle cx="350" cy="156" r="17" fill="#5FF5FF" />
        </g>
        <path d="M308 184 Q320 193 332 184" stroke="#5FF5FF" strokeWidth="3.5" strokeLinecap="round" fill="none" filter="url(#glowSoft)" />
      </g>

      {/* front half of the holo ring: panels */}
      {PANELS.map((p) => (
        <g key={p.key}>
          <path
            d={panelPath(p.x1, p.x2)}
            fill={p.key === 'k8s' ? 'url(#panelFillHi)' : 'url(#panelFill)'}
            stroke="url(#panelStroke)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <PanelGlyph k={p.key} x1={p.x1} x2={p.x2} />
        </g>
      ))}
      {/* ring rims */}
      <path
        d={`M${CX - RX} ${TOP} A ${RX} ${SAG} 0 0 0 ${CX + RX} ${TOP}`}
        fill="none"
        stroke="#A5F3FC"
        strokeOpacity="0.55"
        strokeWidth="2"
        filter="url(#glowSoft)"
      />
      <path
        d={`M${CX - RX} ${TOP + BAND} A ${RX} ${SAG} 0 0 0 ${CX + RX} ${TOP + BAND}`}
        fill="none"
        stroke="#A78BFA"
        strokeOpacity="0.7"
        strokeWidth="2"
        filter="url(#glowSoft)"
      />

      {/* left arm, pointing — sits in front of the panels */}
      <g className="robot-bob">
        <path d="M258 262 C232 268 214 280 204 296" stroke="url(#shell)" strokeWidth="26" strokeLinecap="round" fill="none" />
        <circle cx="200" cy="300" r="16" fill="url(#shellDark)" />
        <path d="M192 292 L176 280" stroke="#E6E9F3" strokeWidth="9" strokeLinecap="round" />
        <circle cx="420" cy="306" r="15" fill="url(#shellDark)" />
      </g>

      {/* ——— platform ——— */}
      <ellipse cx="320" cy="572" rx="240" ry="34" fill="#7C3AED" opacity="0.5" filter="url(#blurBig)" />
      {/* base drum */}
      <path d="M92 476 L92 540 A228 46 0 0 0 548 540 L548 476 Z" fill="url(#baseSide)" />
      <ellipse cx="320" cy="540" rx="228" ry="46" fill="none" stroke="#22C3E6" strokeWidth="2.5" filter="url(#glow)" opacity="0.9" />
      <path d="M92 476 A228 46 0 0 0 548 476" fill="none" stroke="#8B5CF6" strokeWidth="2.5" filter="url(#glowSoft)" />
      <ellipse cx="320" cy="476" rx="228" ry="46" fill="#141640" />
      {/* upper pad */}
      <path d="M126 446 L126 470 A194 36 0 0 0 514 470 L514 446 Z" fill="#1A1D4D" />
      <path d="M126 470 A194 36 0 0 0 514 470" fill="none" stroke="#8B5CF6" strokeOpacity="0.7" strokeWidth="2" />
      <ellipse cx="320" cy="446" rx="194" ry="36" fill="#0D0F2E" stroke="#C084FC" strokeWidth="2.5" filter="url(#glow)" />
      <ellipse cx="320" cy="446" rx="150" ry="26" fill="none" stroke="#8B5CF6" strokeOpacity="0.8" strokeWidth="2" />
      <ellipse cx="320" cy="446" rx="110" ry="19" fill="url(#padGlow)" />
      <ellipse cx="320" cy="446" rx="92" ry="15" fill="none" stroke="#67E8F9" strokeWidth="3" filter="url(#glow)" className="pad-pulse" />
      <text
        x="320"
        y="556"
        textAnchor="middle"
        fontFamily="Sora, sans-serif"
        fontWeight="600"
        fontSize="24"
        fill="#F4F6FC"
        letterSpacing="-0.3"
      >
        AI DevOps Agent
      </text>
    </svg>
  );
}

function StepCard({ icon, title, sub, style, d }: { icon: ReactNode; title: string; sub: string; style: CSSProperties; d: number }) {
  return (
    <div className="absolute hidden sm:block" style={style}>
      <div className="animate-float" style={delay(d)}>
        <div className="flex items-center gap-3 rounded-xl border border-electric-400/45 bg-ink-900/80 px-3.5 py-2.5 shadow-[0_0_30px_-8px_rgba(139,92,246,0.6)] backdrop-blur-md">
          <span className="text-electric-300">{icon}</span>
          <span className="whitespace-nowrap leading-[1.3]">
            <span className="block text-[12.5px] font-semibold text-bone-50 xl:text-[13.5px]">{title}</span>
            <span className="block text-[11.5px] text-bone-200 xl:text-[12.5px]">{sub}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ————————————————————————————————————————————————
   Left column bits
   ———————————————————————————————————————————————— */
const FEATURES = [
  {
    title: 'Kubernetes Ops',
    sub: '& Self-Healing',
    icon: (
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#326CE5] shadow-[0_0_18px_-4px_rgba(50,108,229,0.9)]">
        <ShipWheel className="h-5 w-5 text-white" strokeWidth={2} />
      </span>
    ),
  },
  {
    title: 'AWS',
    sub: 'Cloud Automation',
    icon: (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF9900]/15 ring-1 ring-[#FF9900]/40">
        <Cloud className="h-5 w-5 text-[#FFB547]" strokeWidth={2} />
      </span>
    ),
  },
  {
    title: 'AI Agents',
    sub: 'for IT Operations',
    icon: (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-500/15 ring-1 ring-electric-400/40">
        <Brain className="h-5 w-5 text-electric-300" strokeWidth={1.8} />
      </span>
    ),
  },
];

const PROOF = [
  { icon: Code2, label: 'Real-World Use Cases', color: 'text-electric-400' },
  { icon: Layers, label: 'End-to-End Builds', color: 'text-cyan-400' },
  { icon: InfinityIcon, label: 'Production Ready', color: 'text-cyan-400' },
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[72px]">
      {/* ——— Background ——— */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 45% 60% at 76% 48%, rgba(109,40,217,0.30), transparent 70%), radial-gradient(ellipse 40% 40% at 8% 10%, rgba(59,130,246,0.10), transparent 70%), linear-gradient(180deg, #070919 0%, #0A0C24 60%, #0B0B2A 100%)',
          }}
        />
        <div className="absolute inset-x-0 top-[72px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* dotted wave */}
        <svg
          className="absolute bottom-0 left-1/2 h-[240px] w-[1600px] min-w-full -translate-x-1/2 sm:h-[300px]"
          viewBox={`0 0 ${WAVE_DOTS.W} ${WAVE_DOTS.H}`}
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="waveDot" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <filter id="waveBlur">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <path
            d="M0 250 C 260 170, 420 300, 700 230 S 1200 120, 1600 190"
            stroke="#8B5CF6"
            strokeWidth="10"
            fill="none"
            opacity="0.45"
            filter="url(#waveBlur)"
          />
          <g fill="url(#waveDot)">
            {WAVE_DOTS.dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={d.r} opacity={d.o} />
            ))}
          </g>
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink-950/80" />
      </div>

      {/* ——— Content ——— */}
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 items-center px-5 sm:px-8 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-10 py-10 xl:grid-cols-[1.05fr_1fr] xl:gap-4 xl:py-[2.5vh]">
          {/* copy */}
          <div className="relative z-10">
            <a
              href="#projects"
              className="inline-flex max-w-full animate-rise items-center gap-3 rounded-full border border-electric-400/45 bg-ink-900/60 p-1 pr-4 text-[12.5px] text-bone-100 backdrop-blur transition-colors hover:border-electric-300 sm:text-[14px]"
              style={delay(0.05)}
            >
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-electric-600 to-indigo-500 px-3 py-1.5 font-medium text-white shadow-[0_0_16px_-2px_rgba(124,58,237,0.8)]">
                <Zap className="h-3.5 w-3.5 fill-current" />
                2026 Edition
              </span>
              <span className="truncate">AI Agent Project Series — 3 Real-World Agents, End-to-End</span>
            </a>

            <h1
              className="mt-6 animate-rise font-display font-bold leading-[1.12] tracking-[-0.03em] text-bone-50 lg:mt-[3vh]"
              style={{ ...delay(0.12), fontSize: 'clamp(32px, min(3.8vw, 7.2vh), 56px)' }}
            >
              <span className="block sm:whitespace-nowrap">Build AI Agents that</span>
              <span className="block sm:whitespace-nowrap">
                <span
                  className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text pr-[0.08em] italic text-transparent"
                  style={{ WebkitBackgroundClip: 'text' }}
                >
                  Operate,
                </span>{' '}
                <span className="relative inline-block">
                  <span
                    className="bg-gradient-to-r from-electric-400 via-electric-500 to-plasma-500 bg-clip-text pr-[0.08em] italic text-transparent"
                    style={{ WebkitBackgroundClip: 'text' }}
                  >
                    Automate &amp; Fix
                  </span>
                  <svg
                    aria-hidden
                    className="absolute -bottom-[0.14em] left-0 h-[0.22em] w-[78%]"
                    viewBox="0 0 300 20"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="swoosh" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                        <stop offset="30%" stopColor="#A78BFA" />
                        <stop offset="100%" stopColor="#D946EF" />
                      </linearGradient>
                    </defs>
                    <path d="M2 16 C 90 4, 200 2, 298 10" stroke="url(#swoosh)" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
              <span className="block sm:whitespace-nowrap">Real Infrastructure.</span>
            </h1>

            <p
              className="mt-5 max-w-[640px] animate-rise border-l-2 border-electric-500 pl-5 text-[15px] leading-[1.6] text-bone-200 sm:text-[16.5px] lg:mt-[2.6vh]"
              style={delay(0.24)}
            >
              A hands-on project series to build{' '}
              <strong className="font-semibold text-white">production-grade AI agents</strong> for
              Kubernetes, AWS and modern IT operations —{' '}
              <strong className="font-semibold text-white">that observe, reason</strong> and take action
              like a real DevOps engineer.
            </p>

            <div className="mt-6 grid animate-rise grid-cols-1 gap-3 sm:grid-cols-3 lg:mt-[3vh]" style={delay(0.34)}>
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 backdrop-blur-sm transition-colors hover:border-electric-400/40 hover:bg-white/[0.05]"
                >
                  {f.icon}
                  <span className="leading-[1.35]">
                    <span className="block text-[13.5px] font-semibold text-bone-50">{f.title}</span>
                    <span className="block text-[13px] text-bone-200">{f.sub}</span>
                  </span>
                </div>
              ))}
            </div>

            <div
              className="mt-7 flex animate-rise flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:mt-[3.6vh]"
              style={delay(0.44)}
            >
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 text-[15px] font-semibold sm:text-[16px]"
              >
                Register Now
                <ArrowRight className="h-[18px] w-[18px] transition-transform duration-500 group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={() => openContact('hero')}
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-electric-400/45 bg-ink-900/40 px-9 py-4 text-[15px] font-medium text-bone-50 backdrop-blur transition-all hover:border-electric-300 hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.7)] sm:text-[16px]"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
                Contact Us
              </button>
            </div>

            <ul
              className="mt-7 flex animate-rise flex-wrap items-center gap-x-6 gap-y-3 lg:mt-[3.6vh]"
              style={delay(0.54)}
            >
              {PROOF.map((p, i) => (
                <li key={p.label} className="flex items-center gap-6">
                  {i > 0 && <span className="hidden h-5 w-px bg-white/20 sm:block" />}
                  <span className="flex items-center gap-2.5 text-[13.5px] text-bone-100 sm:text-[14.5px]">
                    <p.icon className={`h-5 w-5 ${p.color}`} strokeWidth={2} />
                    {p.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* visual */}
          <div className="relative animate-rise" style={delay(0.3)}>
            <div className="relative mx-auto aspect-[640/600] w-full max-w-[420px] sm:max-w-[560px] xl:max-w-[min(680px,78vh)]">
              <div className="absolute inset-x-[4%] bottom-[-2%] top-[12%]">
                <RobotScene />
              </div>

              {/* orbit through the step cards */}
              <svg aria-hidden className="absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 100 100" preserveAspectRatio="none">
                <ellipse cx="50" cy="48" rx="45" ry="38" fill="none" stroke="#8B5CF6" strokeOpacity="0.45" strokeWidth="0.25" strokeDasharray="0.4 0" />
                {[
                  [27, 15],
                  [80, 17],
                  [8, 42],
                  [93, 40],
                ].map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="0.6" fill="#C4B5FD" />
                ))}
              </svg>

              <StepCard d={0} style={{ left: '12%', top: '1%' }} icon={<Box className="h-6 w-6" strokeWidth={1.6} />} title="Detect Issues" sub="(Pods, Services, Infra)" />
              <StepCard d={1.2} style={{ right: '-2%', top: '0%' }} icon={<Wrench className="h-6 w-6" strokeWidth={1.6} />} title="Investigate &" sub="Find Root Cause" />
              <StepCard d={0.6} style={{ left: '2%', top: '29%' }} icon={<TrendingUp className="h-6 w-6" strokeWidth={1.6} />} title="Monitor &" sub="Analyze Health" />
              <StepCard d={1.8} style={{ right: '-5%', top: '23%' }} icon={<Zap className="h-6 w-6" strokeWidth={1.6} />} title="Take Action" sub="(With Approval)" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
