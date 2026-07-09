import Nav from "./components/nav";
import Hero from "./components/hero";
import Work from "./components/work";
import Services from "./components/services";
import Process from "./components/process";
import Proof from "./components/proof";
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
        <Proof />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
