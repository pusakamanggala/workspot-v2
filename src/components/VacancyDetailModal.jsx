import { convertDate } from "../utils/helper";
import PropTypes from "prop-types";

const VacancyDetailModal = ({ toggleModal, vacancyData }) => {
  const jobStatusBadge = (status) => {
    if (status === 1) {
      return (
        <p className="px-2 py-1 bg-green-400 text-white font-semibold text-xs rounded-2xl w-fit">
          open
        </p>
      );
    } else
      return (
        <p className="px-2 py-1 bg-red-400 text-white font-semibold text-xs rounded-2xl w-fit">
          close
        </p>
      );
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 h-dvh w-screen bg-black/25 backdrop-blur-sm bg-opacity-30 modal">
      <div className="bg-white rounded-lg md:h-5/6 md:w-4/6 h-full w-full  border-4 border-teal-200 flex flex-col">
        <div className="flex justify-between p-4 border-b">
          <div className="flex gap-3 md:items-center flex-col md:flex-row">
            <div className="h-28">
              <img
                src={vacancyData.company_image_url}
                className="object-contain h-full rounded-md"
              />
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
                Rp. {vacancyData.salary_min.toLocaleString()} -{" "}
                {vacancyData.salary_max.toLocaleString()}
              </p>
            </div>
          </div>
          <div>
            <button onClick={toggleModal}>
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
    </section>
  );
};

VacancyDetailModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  vacancyData: PropTypes.object.isRequired,
};

export default VacancyDetailModal;
