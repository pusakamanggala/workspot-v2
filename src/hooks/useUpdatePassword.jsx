import axios from "axios";
import { useMutation } from "react-query";
import UserContext from "../context/UserContext";
import { useContext } from "react";

export function useUpdatePassword() {
  const { token } = useContext(UserContext);

  return useMutation(
    async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}change-password`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    {
      onSuccess: async (data) => {
        // yes, this API return status 200 even if token is invalid for unknown reason
        if (data.status === "Token is Invalid") {
          alert("Token is invalid, please login again");
        } else alert("Password has been changed, please login again");

        // delete token and user data from cookies
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        // redirect to login page
        window.location.href = "/login";
      },
    }
  );
}
