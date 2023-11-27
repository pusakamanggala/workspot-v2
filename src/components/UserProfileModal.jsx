import UserContext from "../context/UserContext";
import { useContext, useEffect, useRef } from "react";
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import PropTypes from "prop-types";

const UserProfileModal = ({ toggleModal }) => {
  const { user } = useContext(UserContext);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);
  const currentPasswordRef = useRef(null);

  const updatePasswordMutation = useUpdatePassword();

  // disable parent component scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  function formatTimestamp(timestamp) {
    const dateObject = new Date(timestamp);

    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-indexed
    const year = dateObject.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  }

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

  const handleChangePassword = (e) => {
    e.preventDefault();
    // if value is empty alert user
    if (
      !currentPasswordRef.current?.value ||
      !newPasswordRef.current?.value ||
      !confirmNewPasswordRef.current?.value
    ) {
      alert("Please fill all fields");
      console.log(
        currentPasswordRef.current?.value,
        newPasswordRef.current?.value,
        confirmNewPasswordRef.current?.value
      );
      return;
    }

    // new password must be at least 8 characters
    if (newPasswordRef.current?.value?.length < 8) {
      alert("New password must be at least 8 characters");
      return;
    }

    // if new password and confirm new password is not the same alert user
    if (
      newPasswordRef.current?.value !== confirmNewPasswordRef.current?.value
    ) {
      alert("New password does not match");
      return;
    }

    const data = {
      new_password: newPasswordRef.current.value,
      current_password: currentPasswordRef.current.value,
      new_confirm_password: confirmNewPasswordRef.current.value,
    };

    updatePasswordMutation.mutate(data);
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 h-dvh w-screen bg-black/25 backdrop-blur-sm bg-opacity-30 modal">
      <div className="bg-white rounded-lg overflow-hidden md:h-5/6 md:w-3/6 h-full w-full border-4 border-teal-200 flex flex-col relative">
        {/* close button */}
        <button
          className="absolute right-5 top-5 hover:scale-110"
          onClick={toggleModal}
          title="Close"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#ffff"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* user detail */}
        <div className="flex flex-col items-center">
          <div className="bg-teal-400 w-full flex flex-col items-center pt-10 gap-3 text-center">
            <img
              src={user.image_url}
              alt="profile_picture"
              onError={(e) => {
                e.target.src =
                  "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg";
              }}
              className="w-28 aspect-square rounded-full object-cover"
            />
            <hgroup>
              <h1 className="text-xl font-semibold text-white">{user.name}</h1>
              <h2 className="text-white">{user.email}</h2>
            </hgroup>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
            <path
              fill="#2dd4bf"
              fillOpacity="1"
              d="M0,32L18.5,32C36.9,32,74,32,111,37.3C147.7,43,185,53,222,80C258.5,107,295,149,332,170.7C369.2,192,406,192,443,181.3C480,171,517,149,554,170.7C590.8,192,628,256,665,240C701.5,224,738,128,775,112C812.3,96,849,160,886,186.7C923.1,213,960,203,997,197.3C1033.8,192,1071,192,1108,202.7C1144.6,213,1182,235,1218,208C1255.4,181,1292,107,1329,80C1366.2,53,1403,75,1422,85.3L1440,96L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"
            ></path>
          </svg>
        </div>
        {/* change password */}
        <div className="mx-10 md:mx-20 space-y-3">
          <h1 className="text-center text-teal-400 font-semibold mt-5">
            Change Password
          </h1>
          {updatePasswordMutation.isError && (
            <p className="text-red-600">
              {updatePasswordMutation.error?.response?.data.includes(
                "The current password is match with old password."
              )
                ? "Failed : Current password is incorrect"
                : "An error occured"}
            </p>
          )}
          <form
            className="flex flex-col lg:flex-row items-center gap-2"
            onSubmit={handleChangePassword}
          >
            <input
              type="password"
              placeholder="Current password"
              className="py-1 px-2 w-full rounded-md text-teal-600 focus:border-teal-400 border-2 outline-none"
              id="current-password"
              name="current-password"
              autoComplete="current-password"
              ref={currentPasswordRef}
              onChange={(e) => {
                e.target.value = e.target.value.trim();
              }}
              required
            />
            <input
              type="password"
              placeholder="New password"
              className="py-1 px-2 w-full rounded-md text-teal-600 focus:border-teal-400 border-2 outline-none"
              id="new-password"
              name="new-password"
              autoComplete="new-password"
              ref={newPasswordRef}
              onChange={(e) => {
                e.target.value = e.target.value.trim();
              }}
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="py-1 px-2 w-full rounded-md text-teal-600 focus:border-teal-400 border-2 outline-none"
              id="confirm-new-password"
              name="confirm-new-password"
              autoComplete="new-password"
              ref={confirmNewPasswordRef}
              onChange={(e) => {
                e.target.value = e.target.value.trim();
              }}
              required
            />
            <div className="flex justify-end w-full lg:w-fit">
              <button
                className={`py-1 px-2 rounded-md text-white ${
                  updatePasswordMutation.isLoading
                    ? "cursor-not-allowed bg-teal-200"
                    : "hover:bg-teal-500 shadow-md bg-teal-400"
                }`}
                type="submit"
                disabled={updatePasswordMutation.isLoading}
              >
                {updatePasswordMutation.isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
        <hgroup className="flex gap-3 items-center justify-center text-teal-500 absolute bottom-2 left-2 font-semibold">
          <p>
            Created at{" "}
            <span className="text-black">
              {formatTimestamp(user.created_at)}
            </span>
          </p>
          <p>|</p>
          <p>
            Updated at{" "}
            <span className="text-black">
              {formatTimestamp(user.updated_at)}
            </span>
          </p>
        </hgroup>
      </div>
    </section>
  );
};

UserProfileModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default UserProfileModal;
