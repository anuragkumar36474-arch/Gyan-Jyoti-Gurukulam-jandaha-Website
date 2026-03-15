import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Notices from "@/components/sections/Notices";
import Teachers from "@/components/sections/Teachers";
import Activities from "@/components/sections/Activities";
import Location from "@/components/sections/Location";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Notices />
        <Teachers />
        <Activities />
        <Location />
      </div>

      <Footer />
    </main>
  );
}
