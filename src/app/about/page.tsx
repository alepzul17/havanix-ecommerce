import Navbar from "../components/navbar/Navbar";
import AboutHero from "./AboutHero";
import Introduction from "./Introduction";
import Philosophy from "./Philosophy";
import Values from "./Values";
import PortfolioProject from "./PortfolioProject";

export default function AboutPage() {
  return (
    <div className="bg-[url(/texture4.jpg)]">
      <Navbar />
      <AboutHero />
      <Introduction />
      <Philosophy />
      <Values />
      <PortfolioProject />
    </div>
  );
}
