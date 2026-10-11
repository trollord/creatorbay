import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/site";
import PageHero from "@/components/PageHero";
import ServiceRow from "@/components/services/ServiceRow";
import StoryProcess from "@/components/home/StoryProcess";
import GoLive from "@/components/home/GoLive";

export const metadata: Metadata = {
  title: "Services | Creator Bay",
  description:
    "Event marketing, brand collaborations, reel creation, creative production, strategy and reporting.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="What we make happen."
        seed={4.4}
        intro="Influencer marketing and content, from picking the right creators to reporting on what they delivered."
        aside={
          <nav aria-label="Jump to a service" className="flex max-w-[520px] flex-wrap gap-2 md:justify-end">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border-2 border-ink px-4 py-2 text-[14px] font-semibold transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                {s.title}
              </Link>
            ))}
          </nav>
        }
      />
      <section className="on-dark bg-ink text-paper" aria-label="Our services">
        {services.map((s, i) => (
          <ServiceRow key={s.slug} service={s} flip={i % 2 === 1} />
        ))}
      </section>
      <StoryProcess />
      <GoLive title="Pick a format. We'll do the rest." body="Launching a product? Building a brand? Defending a narrative? Creators are your fastest way into the feed." />
    </>
  );
}
