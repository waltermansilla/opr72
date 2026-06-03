import Opr72About from "./Opr72About";
import Opr72Audience from "./Opr72Audience";
import Opr72Clients from "./Opr72Clients";
import Opr72Contact from "./Opr72Contact";
import Opr72Footer from "./Opr72Footer";
import Opr72Hero from "./Opr72Hero";
import Opr72Institutional from "./Opr72Institutional";
import Opr72Marquee from "./Opr72Marquee";
import Opr72Navbar from "./Opr72Navbar";
import Opr72Opr from "./Opr72Opr";
import Opr72Services from "./Opr72Services";
import Opr72Stats from "./Opr72Stats";
import Opr72Vision from "./Opr72Vision";
export default function Opr72Page() {
  return (
    <div className="min-h-screen">
      <Opr72Navbar />
      <main>
        <Opr72Hero />
        <Opr72Marquee />
        <Opr72Stats />
        <Opr72About />
        <Opr72Opr />
        <Opr72Vision />
        <Opr72Audience />
        <Opr72Services />
        <Opr72Clients />
        <Opr72Institutional />
        <Opr72Contact />
      </main>
      <Opr72Footer />
    </div>
  );
}
