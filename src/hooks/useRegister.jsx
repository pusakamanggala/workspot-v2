import axios from "axios";
import { useMutation } from "react-query";

async function register(data) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}register`,
    data
  );
  return response.data;
}

export function useRegister() {
  return useMutation((data) => register(data));
}
