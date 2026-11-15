import { AnyLab } from "@/components/AnyLab";
import { Biosafety } from "@/components/Biosafety";
import { FinalCta, Footer } from "@/components/Closing";
import { Faq } from "@/components/Faq";
import { FormatsBand } from "@/components/FormatsBand";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Registry } from "@/components/Registry";
import { Steps } from "@/components/Steps";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AnyLab />
        <Registry />
        <FormatsBand />
        <Steps />
        <Biosafety />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
