import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebsae.config";

const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoadin] = useState(true);

  const createUser = (email, password) => {
    setLoadin(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoadin(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoole = () => {
    setLoadin(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  const setProfile = (updateData) => {
    return updateProfile (auth.currentUser, updateData);
  };

  const signOutUser = () => {
    setLoadin(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (createUser) => {
      setUser(createUser);
      setLoadin(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    signInUser,
    signInWithGoole,
    signOutUser,
    loading,
    setLoadin,
    setProfile,
    setUser
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
