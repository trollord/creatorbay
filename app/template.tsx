import PageCurtain from "@/components/motion/PageCurtain";

// Templates re-mount on every navigation, so the curtain plays on each route.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageCurtain />
      {children}
    </>
  );
}
