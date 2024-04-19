import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

function useLocalUser() {
  const dispatch = useDispatch();

  const loginFromLocalStorage = () => {
    let localUser = localStorage.getItem("user");
    localUser = localUser !== "undefined" ? JSON.parse(localUser) : undefined;

    if (localUser) {
      dispatch(setUser(localUser));
    }
  };

  return { loginFromLocalStorage };
}

export default useLocalUser;
