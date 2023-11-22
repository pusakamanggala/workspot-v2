import { useGetVacancy } from "../hooks/useGetVacancy";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { convertDate } from "../utils/helper";
import VacancyDetailModal from "./VacancyDetailModal";
import { useState } from "react";
import emptyImage from "../img/undraw_empty.svg";
import ErrorImage from "../img/undraw_fixing_bugs.svg";

const Vacancy = () => {
  const [vacancyDetailIsOpen, setVacancyDetailIsOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);

  const {
    data: vacancyData,
    isLoading: vacancyLoading,
    isError: vacancyError,
    isSuccess: vacancySuccess,
    error: vacancyErrorData,
  } = useGetVacancy();

  const handleDetailVacancy = (vacancyData) => {
    setSelectedVacancy(vacancyData);
    setVacancyDetailIsOpen(!vacancyDetailIsOpen);
  };

  const settings = {
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 3,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          rows: 2,
          slidesPerRow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          rows: 2,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          rows: 1,
          slidesPerRow: 1,
        },
      },
    ],
  };

  const handleToggleVacancyDetailModal = () => {
    setVacancyDetailIsOpen(!vacancyDetailIsOpen);
  };

  const loadingSkeleton = () => (
    <div className="m-6 bg-white shadow-md relative font-semibold p-5 rounded-md h-60 flex flex-col justify-between animate-pulse">
      <div className="bg-gray-300/30 border-2 border-teal-400 h-12 w-12 rounded-xl absolute -top-6 overflow-hidden bg-white">
        <div className="w-full h-full bg-gray-300/50"></div>
      </div>
      <div className="space-y-2 mt-5">
        <div className="flex text-gray-400 gap-3 items-center">
          <p className="w-20 h-4 bg-gray-300/50"></p>
          <p>•</p>
          <p className="w-16 h-4 bg-gray-300/50"></p>
        </div>
        <h1 className="font-bold text-xl w-3/4 h-6 bg-gray-300/50"></h1>
        <p className="text-gray-400 w-1/2 h-4 bg-gray-300/50"></p>
      </div>
      <p className="w-28 h-4 bg-gray-300/50"></p>
      <p className="capitalize text-teal-500 w-20 h-4 bg-gray-300/50"></p>
    </div>
  );

  return (
    <div
      className="flex flex-col gap-24"
      data-sal-duration="1000"
      data-sal="slide-up"
      data-sal-delay="300"
      data-sal-easing="ease-out-bounce"
    >
      <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl text-center text-teal-400">
        Available job positions
      </h1>
      {vacancyLoading && (
        <Slider {...settings}>
          {Array(5)
            .fill()
            .map((_, i) => (
              <div key={i}>{loadingSkeleton()}</div>
            ))}
        </Slider>
      )}
      {vacancySuccess && vacancyData.data.length > 0 && (
        <Slider {...settings}>
          {/* job_status === 1 means the vacancy is open */}
          {vacancyData.data
            .filter((vacancy) => vacancy.job_status === 1)
            .map((vacancy) => (
              <div key={vacancy.id}>
                <div
                  className="m-6 bg-white shadow-md relative font-semibold p-5 rounded-md h-60 flex flex-col justify-between hover:bg-teal-50 cursor-pointer"
                  onClick={() => handleDetailVacancy(vacancy)}
                >
                  {/* company logo */}
                  <div className="bg-gray-300/30 border-2  border-teal-400 h-12 w-12 rounded-xl absolute -top-6 overflow-hidden bg-white">
                    <img
                      src={vacancy.company_image_url}
                      alt=""
                      className="w-full object-contain h-full"
                    />
                  </div>
                  <div className="space-y-2 mt-5">
                    <div className="flex text-gray-400 gap-3">
                      <p>{convertDate(vacancy.created_at)}</p>
                      <p>•</p>
                      <p>{vacancy.job_tenure}</p>
                    </div>
                    <h1 className="font-bold text-xl">{vacancy.title}</h1>
                    <p className="text-gray-400">{vacancy.company_name}</p>
                  </div>
                  <p>
                    Rp. {vacancy.salary_min.toLocaleString()} -{" "}
                    {vacancy.salary_max.toLocaleString()}
                  </p>
                  <p className="capitalize text-teal-500">
                    {vacancy.company_city}
                  </p>
                </div>
              </div>
            ))}
        </Slider>
      )}
      {/* when success but data is empty */}
      {vacancySuccess && vacancyData.data.length < 1 && (
        <div className="flex flex-col items-center gap-3">
          <img
            src={emptyImage}
            alt=""
            className="md:h-72 h-36 aspect-square object-contain"
          />
          <p className="text-gray-400 text-center mx-20 md:mx-0 md:text-lg">
            There are no available job positions at the moment
          </p>
        </div>
      )}
      {vacancyError && (
        <div className="flex flex-col items-center gap-3">
          <img src={ErrorImage} className="w-96 object-contain" />
          <p className="text-gray-400 text-xl text-center">
            {vacancyErrorData?.response?.data?.message ||
              "Something went wrong when fetching data"}
          </p>
        </div>
      )}
      {/* modal */}
      {vacancyDetailIsOpen && (
        <VacancyDetailModal
          vacancyData={selectedVacancy}
          toggleModal={handleToggleVacancyDetailModal}
        />
      )}
    </div>
  );
};

export default Vacancy;
