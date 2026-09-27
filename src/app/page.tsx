import Nav from "./components/nav";
import Hero from "./components/hero";
import Questions from "./components/questions";
import AnswerBlock from "./components/answer-block";
import Services from "./components/services";
import Work from "./components/work";
import Method from "./components/method";
import Stack from "./components/stack";
import Engage from "./components/engage";
import Faq from "./components/faq";
import Booking from "./components/booking";
import Footer from "./components/footer";
import BookingModal from "./components/booking-modal";

/**
 * The page is one argument, in order. Each section answers the question the
 * previous one leaves open, so the sequence below is the story.
 *
 *   1  Claim     build a site that sells, automate the work       Hero
 *                …acted out: the site comes apart into its layers  (LayerStack)
 *   2  Frame     the two questions every client arrives with      Questions
 *   3  Orient    the whole studio in one quotable paragraph       AnswerBlock
 *   4  Offer     design, build, automate, grow                    Services
 *   5  Proof     live products and live sites                     Work
 *   6  Method    six steps, first call to growing                 Method
 *   7  Fit       the tools it's built on and plugs into           Stack
 *   8  Terms     a project, or a partner                          Engage
 *   9  Doubts    the questions people ask before they book        Faq
 *  10  Close     one button to the calendar                       Booking
 *
 *  The booking modal is always one click away: every "Book a call" and the
 *  floating launcher open it.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Questions />
        <AnswerBlock />
        <Services />
        <Work />
        <Method />
        <Stack />
        <Engage />
        <Faq />
        <Booking />
      </main>
      <Footer />
      <BookingModal />
    </>
  );
}
