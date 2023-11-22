import SearchImage from "../img/undraw_undraw_undraw_search_engines.svg";
import ApplyImage from "../img/undraw_updated_resume.svg";
import HiredImage from "../img/undraw_career_progress.svg";

const HowItWorks = () => {
  return (
    <div className="flex flex-col gap-14">
      <h1
        className="font-semibold text-xl md:text-2xl lg:text-3xl text-center text-teal-400 mb-10"
        data-sal-duration="1000"
        data-sal="slide-up"
        data-sal-delay="300"
        data-sal-easing="ease-out-bounce"
      >
        How it works
      </h1>
      <div
        className="flex gap-10 xl:mx-20 items-center md:flex-row flex-col"
        data-sal-duration="1000"
        data-sal="slide-up"
        data-sal-delay="500"
        data-sal-easing="ease-out-bounce"
      >
        <img src={SearchImage} alt="Search" className="w-[200px] h-32" />
        <div>
          <h1 className="text-3xl font-medium text-teal-400">Search</h1>
          <p className="text-justify">
            Explore thousands of job listings from various industries and
            locations. Use our powerful search filters to discover the perfect
            job match that aligns with your skills and career aspirations.
          </p>
        </div>
      </div>
      <div
        className="flex gap-10 xl:mx-20 items-center md:flex-row flex-col"
        data-sal-duration="1000"
        data-sal="slide-up"
        data-sal-delay="600"
        data-sal-easing="ease-out-bounce"
      >
        <img
          src={ApplyImage}
          alt="Apply"
          className="w-[200px] h-32 object-contain"
        />
        <div className="flex flex-1 flex-col">
          <h1 className="text-3xl font-medium text-teal-400">Apply</h1>
          <p className="text-justify">
            Once you&apos;ve found your ideal job, apply with ease. Create a
            professional profile, upload your resume, and craft personalized
            cover letters. Our platform simplifies the application process,
            making it effortless to express your interest in exciting job
            opportunities.
          </p>
        </div>
      </div>
      <div
        className="flex gap-10 xl:mx-20 items-center md:flex-row flex-col"
        data-sal-duration="1000"
        data-sal="slide-up"
        data-sal-delay="700"
        data-sal-easing="ease-out-bounce"
      >
        <img src={HiredImage} alt="Get Hired" className="w-[200px] h-32" />
        <div className="flex flex-1 flex-col">
          <h1 className="text-3xl font-medium text-teal-400">Get Hired</h1>
          <p className="text-justify">
            Our platform is designed to help you succeed. Receive job alerts,
            track your application progress, and even connect with potential
            employers. We&apos;re here to guide you on your journey to landing
            the job of your dreams.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
