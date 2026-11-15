import { Activity } from "@/components/Activity";
import { Footer, SignupBand } from "@/components/Closing";
import { Community } from "@/components/Community";
import { Flick } from "@/components/Flick";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { CtaBand, Platform } from "@/components/Platform";
import { Walkthrough } from "@/components/Walkthrough";

export default function Home() {
  return (
    <>
      {/* one cursor-reactive layer behind the whole page: no section edges to cut the bars off */}
      <Flick fixed />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Walkthrough />
        <Activity />
        <Platform />
        <CtaBand />
        <Community />
        <SignupBand />
      </main>
      <Footer />
    </>
  );
}
