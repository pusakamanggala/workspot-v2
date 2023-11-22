import axios from "axios";
import { useQuery } from "react-query";

async function fetchVacancy() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}job-vacancy`
  );
  return response.data;
}

export function useGetVacancy() {
  return useQuery("vacancy", fetchVacancy);
}
