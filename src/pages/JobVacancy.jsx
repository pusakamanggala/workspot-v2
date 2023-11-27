import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useGetVacancy } from "../hooks/useGetVacancy";
import { convertDate, formatSalary } from "../utils/helper";
import EmptyImage from "../img/undraw_empty.svg";
import VacancyDetailModal from "../components/VacancyDetailModal";
import ErrorImage from "../img/undraw_fixing_bugs.svg";

const JobVacancy = () => {
  const keywordRef = useRef(null);
  const jobStatusRef = useRef(null);
  const [filteredVacancy, setFilteredVacancy] = useState([]);
  const [vacancyDetailIsOpen, setVacancyDetailIsOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const handleDetailVacancy = (vacancyID) => {
    setSelectedVacancy(vacancyID);
    setVacancyDetailIsOpen(!vacancyDetailIsOpen);
  };

  const [searchParams, setSearchParams] = useState({
    keyword: "",
    jobStatus: "1",
  });

  const handleSearchKeyword = (event) => {
    event.preventDefault();

    setSearchParams({
      keyword: keywordRef.current.value,
      jobStatus: jobStatusRef.current.value,
    });
  };

  const handleToggleVacancyDetailModal = () => {
    setVacancyDetailIsOpen(!vacancyDetailIsOpen);
  };

  const {
    data: vacancyData,
    isLoading: vacancyLoading,
    isError: vacancyError,
    isSuccess: vacancySuccess,
    error: vacancyErrorData,
  } = useGetVacancy();

  useEffect(() => {
    if (vacancySuccess && vacancyData.data) {
      const filteredVacancy = vacancyData.data.filter((vacancy) => {
        // Check if job_status is equal to searchParams.jobStatus
        if (vacancy.job_status != searchParams.jobStatus) {
          return false;
        }

        // Check if any string property includes the search term
        for (const key in vacancy) {
          if (
            key !== "job_status" &&
            typeof vacancy[key] === "string" &&
            vacancy[key]
              .toLowerCase()
              .includes(searchParams.keyword.toLowerCase())
          ) {
            return true; // If any property includes the search term, include the vacancy in the filtered list
          }
        }

        // If none of the string properties include the search term, exclude the vacancy from the filtered list
        return false;
      });

      setFilteredVacancy(filteredVacancy);
    }
  }, [searchParams, vacancySuccess, vacancyData]);

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
    <>
      <Navbar />
      <section className="flex flex-col min-h-[100dvh] bg-gray-100 w-full">
        <div
          className="flex-1"
          data-sal="flip-up"
          data-sal-duration="500"
          data-sal-delay="300"
          data-sal-easing="ease-out-bounce"
        >
          <div className="2xl:mx-44 xl:mx-36 lg:mx-24 sm:mx-14 my-40 flex flex-col justify-center items-center gap-14">
            {/* search bar */}
            <form
              className="flex gap-4 flex-wrap justify-end mx-10"
              onSubmit={handleSearchKeyword}
            >
              <div className="border border-gray-300 px-4 py-2 w-full md:w-96 flex bg-white focus-within:border-teal-500 focus-within:border-2">
                <input
                  type="text"
                  name="search_keyword"
                  placeholder="Search job title, company, or city"
                  ref={keywordRef}
                  className="w-full outline-none"
                />
                {searchParams.keyword && (
                  <button
                    type="button"
                    title="Clear search"
                    onClick={() => {
                      setSearchParams({ keyword: "", jobStatus: "1" }); // Reset search params
                      keywordRef.current.value = ""; // Reset search input
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {/* job status, select 1 or 2 value */}
              <select
                name="vacancy_status"
                id="vacancy_status"
                className="border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 focus:border-2"
                ref={jobStatusRef}
                title="Select job status"
              >
                <option value={1}>Open</option>
                <option value={0}>Closed</option>
              </select>
              <button
                type="submit"
                className="bg-teal-400 text-white px-4 py-2 shadow-md hover:bg-teal-500 transition duration-300 ease-in-out"
              >
                Search
              </button>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 w-full">
              {vacancySuccess &&
                filteredVacancy.length > 0 &&
                filteredVacancy.map((vacancy) => (
                  <div key={vacancy.id}>
                    <div
                      className="m-5 bg-white shadow-md relative font-semibold p-5 rounded-md h-60 flex flex-col justify-between hover:bg-teal-50 cursor-pointer"
                      onClick={() => handleDetailVacancy(vacancy.id)}
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
                        <div className="flex text-gray-400 gap-2 lg:text-base text-sm">
                          <p>{convertDate(vacancy.created_at)}</p>
                          <p>•</p>
                          <p>{vacancy.job_tenure}</p>
                        </div>
                        <h1 className="font-bold xl:text-xl lg:text-lg text-base line-clamp-2">
                          {vacancy.title}
                        </h1>
                        <p className="text-gray-400 line-clamp-1">
                          {vacancy.company_name}
                        </p>
                      </div>
                      <p className="lg:text-base text-sm line-clamp-1">
                        Rp. {formatSalary(vacancy.salary_min)} -{" "}
                        {formatSalary(vacancy.salary_max)}
                      </p>
                      <p className="capitalize text-teal-500 line-clamp-1">
                        {vacancy.company_city}
                      </p>
                    </div>
                  </div>
                ))}
              {vacancyLoading &&
                Array(5)
                  .fill()
                  .map((_, i) => <div key={i}>{loadingSkeleton()}</div>)}
            </div>
            {vacancySuccess && filteredVacancy.length < 1 && (
              <div className="flex flex-col items-center gap-3">
                <img src={EmptyImage} className="w-96 object-contain" />
                <h1 className="text-xl text-gray-400">
                  No result found for &quot;{searchParams.keyword}&quot;
                </h1>
              </div>
            )}
            {vacancyError && (
              <div className="flex flex-col items-center gap-3 mx-20">
                <img src={ErrorImage} className="w-96 object-contain" />
                <p className="text-gray-400 text-xl text-center">
                  {vacancyErrorData?.response?.data?.message ||
                    "Something went wrong when fetching data"}
                </p>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </section>
      {vacancyDetailIsOpen && (
        <VacancyDetailModal
          vacancyID={selectedVacancy}
          toggleModal={handleToggleVacancyDetailModal}
        />
      )}
    </>
  );
};

export default JobVacancy;
