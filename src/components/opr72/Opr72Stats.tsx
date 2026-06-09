import Opr72ClientsMarquee from "./Opr72ClientsMarquee";

export default function Opr72Stats() {
  return (
    <section className="opr-gradient-band relative overflow-hidden py-10 sm:py-12">
      <div className="opr-gradient-patriotic absolute top-0 right-0 left-0" />
      <div id="opr72-stats-content" className="relative will-change-transform">
        <Opr72ClientsMarquee />
      </div>
    </section>
  );
}
