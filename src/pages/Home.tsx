import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import Stats from "../components/Home/Stats";
import Features from "../components/Home/Features";
import HowItWork from "../components/Home/HowItWork";
import Footer from "../components/Home/Footer";

export default function LandingPage() {
  return (
    <div className="bg-bg text-text overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWork />
      <Footer />
    </div>
  )
}
