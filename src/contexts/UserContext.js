import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.init";

const auth = getAuth(app);
export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  //1. Create user
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign in with email and password
  const userSignIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  //2. update name
  const updateName = (name) => {
    setLoading(true)
    return updateProfile(auth.currentUser, { displayName: name });
  };

  //3. email verify
  const verifyEmail = () => {
    setLoading(true)
    return sendEmailVerification(auth.currentUser);
  };

  // 4. google sign in
  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };

  //5. logOut
  const LogOut = () => {
    setLoading(true)
    return signOut(auth);
  };

  //6. forget password
  const resetPassword = (email) => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  };

  //
  useEffect(() => {
    //eta run hobe jokhon component mount hobe
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });

    return () => {
      // jokhon unMount hobe
      unSubscribe();
    };
  }, []);

  // send data
  const authInfo = {
    user,
    createUser,
    updateName,
    verifyEmail,
    signInWithGoogle,
    userSignIn,
    resetPassword,
    LogOut,
    loading
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
