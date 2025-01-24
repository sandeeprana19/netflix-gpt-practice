import React, { useEffect, useRef } from "react";
import { supabase } from "../utils/supabaseclient";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGE } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);
  const language = useRef();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION" && session === null) {
        navigate("/");
      } else if (event === "SIGNED_IN") {
        const { id, email } = session?.user;
        dispatch(addUser({ id: id, email: email }));
        navigate("/browse");
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
        dispatch(removeUser());
        navigate("/");
      }
    });

    // call unsubscribe to remove the callback
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute px-4 py-2 bg-gradient-to-b from-black w-full z-10 flex justify-between items-center">
      <img src={LOGO} alt="Netflix Logo" className="w-44" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white m-2"
              ref={language}
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="bg-purple-800 py-2 px-4 mx-4 my-2 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <button
            className="bg-red-600 text-white py-1 px-3 rounded-sm text-[14px]"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
