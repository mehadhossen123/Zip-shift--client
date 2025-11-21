import React, { Children, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userRegister = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const userLogout = () => {
    return signOut(auth);
  };

  const updateUserProfile =(profile)=>{
    return updateProfile(auth.currentUser,profile)
  }
//   Reset password 
  const resetPassword=(email)=>{
    return sendPasswordResetEmail (auth,email)

  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      
        setUser(currentUser);
        setLoading(false);
    
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    userRegister,
    userSignIn,
    googleLogin,
    user,
    loading,
    userLogout,
    updateUserProfile,
    resetPassword,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
