import axios from "axios";
import { useQuery } from "react-query";

async function fetchVacancyByID(vacancyID) {
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}job-vacancy/${vacancyID}`
  );
  return response.data;
}

export function useGetVacancyByID(vacancyID) {
  return useQuery(["vacancyByID", vacancyID], () =>
    fetchVacancyByID(vacancyID)
  );
}
