import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { supabase } from "../utils/supabaseclient";
import { LOGIN_BG } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const displayName = useRef();
  const email = useRef();
  const password = useRef();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const signUpNewUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email.current.value,
      password: password.current.value,
    });
    if (error) {
      setErrorMessage(error.message);
    }
  };

  const signInExistingUser = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.current.value,
      password: password.current.value,
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      signUpNewUser();
    } else {
      signInExistingUser();
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute w-full h-full overflow-hidden">
        <img
          src={LOGIN_BG}
          alt="Browse"
          className="w-full h-full object-cover"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black p-12 w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={displayName}
            type="text"
            placeholder="Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="text"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-xl py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already register? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
