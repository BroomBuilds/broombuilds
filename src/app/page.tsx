import Nav from "./components/nav";
import Hero from "./components/hero";
import Work from "./components/work";
import Services from "./components/services";
import Process from "./components/process";
import Team from "./components/team";
import Careers from "./components/careers";
import Booking from "./components/booking";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div id="top">
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Services />
        <Process />
        <Team />
        <Careers />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
