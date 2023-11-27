import axios from "axios";
import { useMutation } from "react-query";

async function login(credentials) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}login`,
    credentials
  );
  return response.data;
}

export function useLogin() {
  return useMutation((credentials) => login(credentials), {
    onSuccess: (data) => {
      // set user data to cookies
      document.cookie = `user=${JSON.stringify(data.user)}`;
      // set token to cookies
      document.cookie = `token=${data.token}`;
      // reload page
      window.location.reload();
    },
  });
}
