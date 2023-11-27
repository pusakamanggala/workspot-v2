import { useGetVacancyByID } from "../hooks/useGetVacancyByID";
import { convertDate, formatSalary } from "../utils/helper";
import PropTypes from "prop-types";
import ErrorImage from "../img/undraw_fixing_bugs.svg";
import { useEffect } from "react";

const VacancyDetailModal = ({ toggleModal, vacancyID }) => {
  const {
    data: vacancyData,
    isLoading: vacancyLoading,
    isError: vacancyError,
    isSuccess: vacancySuccess,
    error: vacancyErrorData,
  } = useGetVacancyByID(vacancyID);

  const jobStatusBadge = (status) => {
    if (status === 1) {
      return (
        <p className="px-2 py-1 bg-green-400 text-white font-semibold text-sm rounded-2xl w-fit shadow-md">
          open
        </p>
      );
    } else
      return (
        <p className="px-2 py-1 bg-red-400 text-white font-semibold text-sm rounded-2xl w-fit shadow-md">
          close
        </p>
      );
  };

  // disable parent component scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  //   if esc key is pressed, close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        toggleModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [toggleModal]);

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg md:h-5/6 md:w-4/6 h-full w-full border-4 border-teal-200 flex flex-col">
      <div className="flex justify-between p-4 border-b animate-pulse">
        <div className="flex gap-3 md:items-center flex-col md:flex-row">
          <div className="h-28 w-28 bg-gray-300 rounded-md"></div>
          <div>
            <h1 className="bg-gray-300 h-6 mb-2 w-40"></h1>
            <h2 className="text-teal-500 bg-gray-300 h-4 w-1/3"></h2>
          </div>
        </div>
        <div>
          <button onClick={toggleModal} title="Close" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="overflow-y-scroll flex-1 animate-pulse">
        <div className="border-b p-4">
          <h1 className="mb-2 font-semibold bg-gray-300 h-6 w-1/4"></h1>
          <p className="bg-gray-300 h-4 w-3/4"></p>
        </div>
        <div className="p-4">
          <h1 className="mb-2 font-semibold bg-gray-300 h-6 w-1/4"></h1>
          <p className="bg-gray-300 h-4 w-3/4"></p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 h-dvh w-screen bg-black/25 backdrop-blur-sm bg-opacity-30 modal">
      {vacancyLoading && LoadingSkeleton()}
      {vacancyError && (
        <div className="bg-white rounded-lg md:h-5/6 md:w-4/6 h-full w-full  border-4 border-teal-200 flex flex-col justify-center items-center relative">
          <img src={ErrorImage} className="md:w-96 w-56" />

          <p className="text-gray-400 md:text-xl text-lg">
            {vacancyErrorData?.response?.data?.message ||
              "Something went wrong when fetching data"}
          </p>
          <button
            onClick={toggleModal}
            title="Close"
            type="button"
            className="absolute top-4 right-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      {vacancySuccess && (
        <div className="bg-white rounded-lg md:h-5/6 md:w-4/6 h-full w-full  border-4 border-teal-200 flex flex-col">
          <div className="flex justify-between p-4 border-b">
            <div className="flex gap-3 md:items-center flex-col md:flex-row">
              <div className="h-28 relative">
                <img
                  src={vacancyData.company_image_url}
                  className="object-contain h-full rounded-md"
                />
                <div className="absolute top-2 left-2">
                  {jobStatusBadge(vacancyData.job_status)}
                </div>
              </div>
              <div>
                <h1 className="font-bold text-xl">{vacancyData.title}</h1>
                <h2 className="text-teal-500 font-semibold">
                  {vacancyData.company_name}
                </h2>
                <div className="flex gap-3 mt-2">
                  <p>{convertDate(vacancyData.created_at)}</p>
                  <p>•</p>
                  <p>{vacancyData.job_tenure}</p>
                  <p>•</p>
                  <p>{vacancyData.job_type}</p>
                </div>
                <p>
                  Rp. {formatSalary(vacancyData.salary_min)} -{" "}
                  {formatSalary(vacancyData.salary_max)}
                </p>
              </div>
            </div>
            <div>
              <button onClick={toggleModal} title="Close" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="overflow-y-scroll flex-1">
            <div className="border-b p-4">
              <h1 className="mb-2 font-semibold">Job Description</h1>
              <p>{vacancyData.job_description}</p>
            </div>
            <div className="p-4">
              <h1 className="mb-2 font-semibold">Job Qualification</h1>
              <p>{vacancyData.job_qualification}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

VacancyDetailModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  vacancyID: PropTypes.number.isRequired,
};

export default VacancyDetailModal;
