import WarningImage from "../img/undraw_notify.svg";
const FraudWarning = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-center">
      <img
        src={WarningImage}
        alt=""
        className="lg:h-72 h-52 object-contain"
        data-sal-duration="1000"
        data-sal="slide-right"
        data-sal-delay="300"
        data-sal-easing="ease-out-bounce"
      />
      <h1
        className="font-semibold text-xl text-teal-400 text-justify"
        data-sal-duration="1000"
        data-sal="slide-left"
        data-sal-delay="300"
        data-sal-easing="ease-out-bounce"
      >
        Be cautious of fraudulent job offers. Protect yourself by verifying the
        legitimacy of employers and never provide personal or financial
        information unless you&apos;re certain of the job&apos;s authenticity
      </h1>
    </div>
  );
};

export default FraudWarning;
