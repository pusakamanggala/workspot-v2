import Footer from "../components/Footer";
import FraudWarning from "../components/FraudWarning";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import PopularStartups from "../components/PopularStartups";
import UserReviews from "../components/UserReview";
import Vacancy from "../components/Vacancy";

const LandingPage = () => {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <section className="space-y-32 space-y-reverse lg:mx-32 xl:mx-52 mx-6">
        <HeroSection />
        <PopularStartups />
        <UserReviews />
        <HowItWorks />
        <Vacancy />
        <FraudWarning />
      </section>
      <Footer />
    </main>
  );
};

export default LandingPage;
