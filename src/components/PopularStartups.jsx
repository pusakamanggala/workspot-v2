import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TokopediaLogo from "../img/tokopedia_logo.webp";
import BukalapakLogo from "../img/bukalapak_logo.webp";
import TravelokaLogo from "../img/traveloka_logo.webp";
import ShopeeLogo from "../img/shopee_logo.webp";
import GojekLogo from "../img/gojek_logo.webp";
import OvoLogo from "../img/ovo_logo.webp";

const PopularStartups = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section
      data-sal-duration="1000"
      data-sal="slide-up"
      data-sal-delay="300"
      data-sal-easing="ease-out-bounce"
    >
      <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl text-center text-teal-400">
        Get hired by popular startups
      </h1>
      <div className="mt-10 md:mt-28">
        <Slider {...settings}>
          <div className="h-5 md:h-8 lg:h-10">
            <img src={TokopediaLogo} alt="" className="h-full mx-auto" />
          </div>
          <div className="h-5 md:h-8 lg:h-10">
            <img src={BukalapakLogo} alt="" className="h-full mx-auto" />
          </div>
          <div className="h-5 md:h-8 lg:h-10">
            <img src={TravelokaLogo} alt="" className="h-full mx-auto" />
          </div>
          <div className="h-5 md:h-8 lg:h-10">
            <img src={ShopeeLogo} alt="" className="h-full mx-auto" />
          </div>
          <div className="h-5 md:h-8 lg:h-10">
            <img src={GojekLogo} alt="" className="h-full mx-auto" />
          </div>
          <div className="h-5 md:h-8 lg:h-10">
            <img src={OvoLogo} alt="" className="h-full mx-auto" />
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default PopularStartups;
