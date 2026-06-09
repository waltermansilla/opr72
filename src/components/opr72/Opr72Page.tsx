import Opr72About from "./Opr72About";
import Opr72Clients from "./Opr72Clients";
import Opr72Contact from "./Opr72Contact";
import Opr72Footer from "./Opr72Footer";
import Opr72Institutional from "./Opr72Institutional";
import Opr72Gallery from "./Opr72Gallery";
import Opr72IntroScroll from "./Opr72IntroScroll";
import Opr72MobileClosing from "./Opr72MobileClosing";
import Opr72MobileStripGallery from "./Opr72MobileStripGallery";
import Opr72Navbar from "./Opr72Navbar";
import Opr72Opr from "./Opr72Opr";
import Opr72Services from "./Opr72Services";
import Opr72Vision from "./Opr72Vision";
import { opr72Content } from "@/data/opr72-content";

const { mobileGalleries } = opr72Content;

export default function Opr72Page() {
  return (
    <div className="opr72-page min-h-screen overflow-x-clip">
      <Opr72Navbar />
      <main className="overflow-x-clip">
        <Opr72IntroScroll />
        <Opr72About />
        <Opr72MobileStripGallery
          images={mobileGalleries.afterAbout.images}
          showCounter={false}
          compact
          className="pt-12 pb-10"
        />
        <Opr72Services />
        <Opr72Opr />
        <Opr72Vision />
        <Opr72Gallery />
        <Opr72Clients />
        <Opr72Institutional />
        <Opr72Contact />
        <Opr72MobileClosing />
      </main>
      <Opr72Footer />
    </div>
  );
}
