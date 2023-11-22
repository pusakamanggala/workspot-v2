import JobOffersImage from "../img/undraw_job_offers.svg";

const HeroSection = () => {
  return (
    <section className="hero-section h-[100dvh] text-slate-950 items-center flex flex-col-reverse justify-center gap-6 sm:flex-row sm:justify-between mb-0">
      <div
        className="text-center sm:text-left"
        data-sal-duration="1000"
        data-sal="slide-left"
        data-sal-delay="300"
        data-sal-easing="ease-out-bounce"
        data-sal-repeat="true"
      >
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl 2xl:text-8xl">
          Find Your Dream <span className="text-teal-400">Job</span>
        </h1>
        <p className="text-base sm:text-lg">
          Discover the perfect job opportunities for your career.
        </p>
      </div>
      <img
        src={JobOffersImage}
        alt=""
        className="w-[90%] sm:w-[40%] lg:w-[50%] h-auto"
        data-sal-duration="1000"
        data-sal="slide-right"
        data-sal-delay="300"
        data-sal-easing="ease-out-bounce"
        data-sal-repeat="true"
      />
    </section>
  );
};

export default HeroSection;
