"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { services, contact, whatsappLink } from "@/lib/site";
import BLogo from "@/components/BLogo";

const OTHER = "Something else";

type Fields = { name: string; brand: string; email: string; phone: string; service: string; message: string };

function compose(f: Fields) {
  return [
    `Hi CreatorBay! I'm ${f.name}${f.brand ? ` from ${f.brand}` : ""}.`,
    f.service ? `I'm interested in: ${f.service}.` : "",
    "",
    f.message,
    "",
    `Email: ${f.email}`,
    f.phone ? `Phone: ${f.phone}` : "",
  ]
    .filter((l, i, a) => l !== "" || (a[i - 1] ?? "") !== "")
    .join("\n")
    .trim();
}

const input =
  "w-full rounded-2xl border-2 border-transparent bg-fog px-4 py-3.5 text-[16px] text-ink outline-none transition-[border-color,background-color] duration-200 placeholder:text-ink/40 focus:border-ink focus:bg-paper";

/** The contact form, dressed as a DM thread. Sends via WhatsApp or email. */
export default function DMForm() {
  const params = useSearchParams();
  const preset = services.find((s) => s.slug === params.get("service"))?.title ?? "";
  const [f, setF] = useState<Fields>({ name: "", brand: "", email: "", phone: "", service: preset, message: "" });
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === "email" ? "email" : "whatsapp";
    const body = compose(f);
    if (via === "whatsapp") {
      window.open(whatsappLink(body), "_blank", "noopener,noreferrer");
    } else {
      const subject = `New campaign enquiry${f.brand ? `: ${f.brand}` : ""}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setSent(via);
  };

  return (
    <div className="overflow-hidden rounded-[30px] bg-paper text-ink shadow-[0_50px_100px_-40px_rgba(0,0,0,0.55)] ring-1 ring-ink/10">
      <header className="flex items-center gap-3 border-b border-ink/10 px-5 py-4 md:px-7">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-red">
          <BLogo className="h-7 w-auto" />
        </span>
        <div>
          <p className="text-[16px] font-semibold">{contact.instagram}</p>
          <p className="flex items-center gap-1.5 text-[13px] text-ink/55">
            <span className="h-2 w-2 rounded-full bg-[#25d366]" /> Usually replies within 24 hours
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-2 px-5 pt-6 md:px-7">
        <p className="max-w-[80%] self-start rounded-[20px] rounded-bl-md bg-fog px-4 py-2.5 text-[15px]">
          Hey! Tell us about your brand and what you&apos;re launching.
        </p>
        <p className="max-w-[80%] self-start rounded-[20px] rounded-tl-md bg-fog px-4 py-2.5 text-[15px]">
          Pick a service if you know which one you need. If not, just describe the goal.
        </p>
      </div>

      {sent ? (
        <div className="flex flex-col gap-2 px-5 pb-8 pt-4 md:px-7" role="status">
          <p className="max-w-[85%] self-end whitespace-pre-line rounded-[20px] rounded-br-md bg-red px-4 py-3 text-[15px] text-ink">
            {compose(f)}
          </p>
          <p className="self-end text-[12px] text-ink/45">Seen</p>
          <p className="mt-3 max-w-[85%] self-start rounded-[20px] rounded-bl-md bg-fog px-4 py-2.5 text-[15px]">
            {sent === "whatsapp"
              ? "Your message is ready in WhatsApp. Tap send there to deliver it. "
              : "Your email is ready in your mail app. Hit send there to deliver it. "}
            If nothing opened, write to us at{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold underline decoration-red decoration-2 underline-offset-2">
              {contact.email}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => setSent(null)}
            className="mt-4 self-start text-[14px] font-semibold underline underline-offset-4"
          >
            Edit message
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 px-5 pb-7 pt-6 md:px-7 md:pb-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
              Your name
              <input required name="name" autoComplete="name" value={f.name} onChange={set("name")} placeholder="Aanya Mehta" className={input} />
            </label>
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
              Brand or venue
              <input name="brand" autoComplete="organization" value={f.brand} onChange={set("brand")} placeholder="Your brand" className={input} />
            </label>
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
              Email
              <input required type="email" name="email" autoComplete="email" value={f.email} onChange={set("email")} placeholder="you@brand.com" className={input} />
            </label>
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
              Phone (optional)
              <input type="tel" name="phone" autoComplete="tel" value={f.phone} onChange={set("phone")} placeholder="+91 98765 43210" className={input} />
            </label>
          </div>

          <fieldset>
            <legend className="mb-2 text-[13px] font-semibold">What do you need?</legend>
            <div className="flex flex-wrap gap-2">
              {[...services.map((s) => s.title), OTHER].map((t) => (
                <label key={t} className="cursor-pointer">
                  <input
                    type="radio"
                    name="service"
                    value={t}
                    checked={f.service === t}
                    onChange={() => setF((v) => ({ ...v, service: t }))}
                    className="peer sr-only"
                  />
                  <span className="inline-block rounded-full border-2 border-ink/15 px-3.5 py-2 text-[14px] font-medium transition-colors duration-150 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
            Message
            <textarea
              required
              name="message"
              rows={4}
              value={f.message}
              onChange={set("message")}
              placeholder="What are you launching, when, and what would success look like?"
              className={`${input} resize-none`}
            />
          </label>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              value="whatsapp"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-7 text-[16px] font-semibold text-paper transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              Send on WhatsApp
            </button>
            <button
              type="submit"
              value="email"
              className="inline-flex h-14 items-center justify-center rounded-full border-2 border-ink px-6 text-[16px] font-semibold transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              Send by email
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
