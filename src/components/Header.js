import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";

const Header = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClicked = () => {
    const message = isSignInForm
      ? checkValidData(null, email.current.value, password.current.value)
      : checkValidData(
          name.current.value,
          email.current.value,
          password.current.value
        );
    setErrorMessage(message);
  };

  return (
    <div>
      <div className="absolute px-8 py-2 bg-gradient-to-b from-black">
        <img
          className="w-44"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute my-36 mx-auto left-0 right-0 bg-black bg-opacity-80 rounded-lg w-3/12 p-12 text-white"
      >
        <h1 className="text-3xl font-bold py-4">
          Sign {isSignInForm ? "In" : "Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 bg-gray-700 w-full"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 bg-gray-700 w-full"
        />
        <input
          ref={password}
          type="password"
          placeholder="password"
          className="p-4 my-4 bg-gray-700 w-full"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 rounded-lg w-full"
          onClick={handleButtonClicked}
        >
          Sign {isSignInForm ? "In" : "Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Header;
