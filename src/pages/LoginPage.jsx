import { useRef, useState } from "react";
import JobOffersImage from "../img/undraw_job_offers.svg";
import { useNavigate } from "react-router-dom";
import Blob from "../img/blob.webp";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";

const LoginPage = () => {
  const navigate = useNavigate();

  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const photoRef = useRef(null);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    loginMutation.mutate(data);
    console.log("login", data);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      image_url: photoRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    registerMutation.mutate(data);
    console.log("register", data);
  };

  return (
    <section className="h-[100dvh] flex items-center relative">
      <div
        className="md:w-1/2 w-0 z-20"
        data-sal-duration="1000"
        data-sal="slide-up"
        data-sal-delay="300"
        data-sal-easing="ease-out-bounce"
      >
        <img
          src={JobOffersImage}
          alt=""
          className="lg:w-3/4 w-96 mx-auto z-50"
        />
      </div>
      <div
        className="md:w-1/2 w-full flex flex-col items-center bg-teal-400 h-full justify-center relative"
        data-sal-duration="1000"
        data-sal="fade-in"
        data-sal-delay="500"
        data-sal-easing="ease-out-bounce"
      >
        <img
          src={Blob}
          alt="blob-image"
          className="absolute lg:w-1/2 lg:-left-56 w-72 -left-40 top-0 h-full z-0 hidden md:block"
        />
        <h1 className="text-white font-semibold text-2xl z-20">
          {isCreateAccount ? "Create" : "Log into"} your account
        </h1>
        {/* Login Form */}
        {!isCreateAccount && (
          <form
            className="flex flex-col gap-3 mt-20 z-20"
            onSubmit={handleLogin}
          >
            {loginMutation.isError && (
              <div className="px-2 py-1 bg-red-400 rounded-md text-white text-center">
                <h1>
                  {loginMutation?.error?.response?.data?.error ||
                    "An error occurred"}
                </h1>
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              className="py-1 px-2 w-72 rounded-md text-lg text-teal-600"
              required
              id="email"
              name="email"
              autoComplete="email"
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Password"
              className="py-1 px-2 w-72 rounded-md text-lg text-teal-600"
              required
              id="password"
              name="password"
              autoComplete="current-password"
              ref={passwordRef}
              minLength="8"
            />
            <button
              className="bg-white text-teal-400 w-fit rounded-md py-1 px-2 self-end font-semibold hover:bg-teal-100 shadow-md"
              type="submit"
              title="Login"
              disabled={loginMutation.isLoading}
            >
              {loginMutation.isLoading ? "Logging you in..." : "Login"}
            </button>
          </form>
        )}

        {/* Sign Up Form */}
        {isCreateAccount && (
          <form
            className="flex flex-col gap-3 mt-20 z-20"
            autoComplete="off"
            onSubmit={handleSignUp}
          >
            {/* Error res example =  "{\"name\":[\"The name field is required.\"],\"email\":[\"The email has already been taken.\"]}" */}
            {registerMutation.isError &&
              (registerMutation?.error?.response?.data ? (
                <div className="px-2 py-1 bg-red-400 rounded-md text-white text-center w-72">
                  {(() => {
                    try {
                      const parsedErrors = JSON.parse(
                        registerMutation.error.response.data
                      );
                      return <h1>{Object.values(parsedErrors)[0]?.[0]}</h1>;
                    } catch (error) {
                      console.error("Error parsing JSON:", error);
                      return <h1>An error occurred</h1>;
                    }
                  })()}
                </div>
              ) : (
                <div className="px-2 py-1 bg-red-400 rounded-md text-white text-center">
                  <h1>An error occurred</h1>
                </div>
              ))}
            {registerMutation.isSuccess && (
              <div className="px-2 py-1 bg-green-500 rounded-md text-white text-center w-72">
                <h1>Your account has been created</h1>
              </div>
            )}
            <input
              type="text"
              placeholder="Full Name"
              className="py-1 px-2 w-72 rounded-md text-lg text-teal-600"
              required
              autoComplete="new-user-name"
              id="new-user-name"
              name="new-user-name"
              ref={nameRef}
            />
            <input
              type="url"
              placeholder="Foto Profile (URL)"
              className="py-1 px-2 w-72 rounded-md text-lg text-teal-600"
              required
              autoComplete="new-user-photo"
              id="photo"
              name="photo"
              ref={photoRef}
            />
            <input
              type="email"
              placeholder="Email"
              className="py-1 px-2 w-72 rounded-md text-lg text-teal-600"
              required
              autoComplete="new-user-email"
              id="new-user-email"
              name="new-user-email"
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Password"
              className="py-1 px-2 w-72 rounded-md text-lg text-teal-600"
              required
              autoComplete="new-password"
              id="new-password"
              name="new-password"
              minLength="8"
              ref={passwordRef}
            />
            <button
              className="bg-white text-teal-400 w-fit rounded-md py-1 px-2 self-end font-semibold hover:bg-teal-100 shadow-md"
              type="submit"
              title="Sign Up"
              disabled={registerMutation.isLoading}
            >
              {registerMutation.isLoading ? "Signing you up..." : "Sign Up"}
            </button>
          </form>
        )}

        <div className=" flex gap-2 mt-5 z-20">
          <p className="text-white">
            {isCreateAccount
              ? "Already have an account ?"
              : "Don't have an account ?"}
          </p>
          <button
            className="text-teal-900 font-semibold hover:underline"
            onClick={() => setIsCreateAccount(!isCreateAccount)}
            disabled={loginMutation.isLoading || registerMutation.isLoading}
          >
            {isCreateAccount ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
      <button
        className="absolute top-5 left-5"
        onClick={() => navigate("/")}
        type="button"
        title="Home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-10 h-10 md:stroke-teal-400 stroke-white hover:scale-105"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </button>
    </section>
  );
};

export default LoginPage;
