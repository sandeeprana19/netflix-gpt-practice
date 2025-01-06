import React, { useEffect } from "react";
import { supabase } from "../utils/supabaseclient";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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

  return (
    <div className="absolute px-4 py-2 bg-gradient-to-b from-black w-full z-10 flex justify-between items-center">
      <img src={LOGO} alt="Netflix Logo" className="w-44" />
      {user && (
        <button
          className="bg-red-600 text-white py-1 px-3 rounded-sm text-[14px]"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;
