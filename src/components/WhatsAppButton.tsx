import { MessageCircle, Phone } from 'lucide-react';
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from '@/content';

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-[65] flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full border border-white/10 bg-ink-900/90 px-4 py-2 text-[13px] font-medium text-bone-50 opacity-0 shadow-xl backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat with us on WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.75)] transition-transform duration-300 group-hover:scale-110">
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:2.4s]" />
        <span className="relative">
          <MessageCircle className="h-7 w-7" strokeWidth={2} />
          <Phone className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 fill-current" strokeWidth={0} />
        </span>
      </span>
    </a>
  );
}
