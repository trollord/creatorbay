import Hero from "@/components/home/Hero";
import Captions from "@/components/home/Captions";
import Profile from "@/components/home/Profile";
import ReelServices from "@/components/home/ReelServices";
import StoryProcess from "@/components/home/StoryProcess";
import Receipts from "@/components/home/Receipts";
import BrandMarquee from "@/components/home/BrandMarquee";
import GoLive from "@/components/home/GoLive";

export default function Home() {
  return (
    <>
      <Hero />
      <Profile />
      <ReelServices />
      <StoryProcess />
      <Receipts />
      <BrandMarquee />
      <GoLive />
      <Captions />
    </>
  );
}
