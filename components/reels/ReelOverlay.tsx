import BLogo from "@/components/BLogo";
import { contact } from "@/lib/site";

const icon = "h-[7cqw] w-[7cqw]";

/** The app chrome around a reel: right rail, creator line, caption, audio. */
export default function ReelOverlay({ caption, likes, light = false }: { caption: string; likes: string; light?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${light ? "text-ink" : "text-paper [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]"}`}
    >
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[5cqw] pt-[4.5cqh] text-[4.6cqw] font-semibold">
        <span>Reels</span>
        <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="6" width="18" height="14" rx="3" />
          <circle cx="12" cy="13" r="3.5" />
          <path d="M8 6l1.5-2h5L16 6" />
        </svg>
      </div>

      <div className="absolute bottom-[14cqh] right-[3.5cqw] flex flex-col items-center gap-[2.6cqh] text-[3.2cqw] font-semibold">
        <span className="flex flex-col items-center gap-[0.5cqh]">
          <svg viewBox="0 0 24 24" className={`${icon} text-red`} fill="currentColor">
            <path d="M12 21.2s-7.6-4.6-9.8-9.3C.7 8.6 2.6 4.3 6.6 4.3c2.3 0 3.9 1.3 5.4 3.2 1.5-1.9 3.1-3.2 5.4-3.2 4 0 5.9 4.3 4.4 7.6-2.2 4.7-9.8 9.3-9.8 9.3z" />
          </svg>
          {likes}
        </span>
        <span className="flex flex-col items-center gap-[0.5cqh]">
          <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.5-5.2A8.5 8.5 0 1 1 21 12z" />
          </svg>
          1,204
        </span>
        <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 3L10 14M22 3l-7 19-5-8-8-5z" strokeLinejoin="round" />
        </svg>
        <span className="grid h-[8cqw] w-[8cqw] place-items-center rounded-[1.6cqw] border-[0.5cqw] border-current bg-red">
          <BLogo className="h-[5cqw] w-auto" />
        </span>
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent px-[5cqw] pb-[5cqh] pt-[10cqh] ${
          light ? "from-white/90" : "from-black/55"
        }`}
      >
        <div className="flex items-center gap-[2.4cqw] text-[3.9cqw] font-semibold">
          <span className="grid h-[8cqw] w-[8cqw] place-items-center rounded-full bg-red">
            <BLogo className="h-[5cqw] w-auto" />
          </span>
          {contact.instagram}
          <span className="rounded-[1.4cqw] border border-current px-[2cqw] py-[0.4cqh] text-[3.3cqw] opacity-85">Follow</span>
        </div>
        <p className="mt-[1.4cqh] max-w-[78%] text-[3.8cqw] leading-snug">{caption}</p>
        <p className="mt-[1cqh] flex items-center gap-[1.6cqw] overflow-hidden whitespace-nowrap text-[3.3cqw] opacity-85">
          <span>♫</span> Creator Bay · Original audio
        </p>
      </div>
    </div>
  );
}
