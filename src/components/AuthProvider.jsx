import React, { createContext } from "react";
import { app } from "./firebase/firebase.config";
export const AuthContext = createContext();
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const Authdata = {
    createUser,
    signUser,
  };

  return (
    <div>
      <AuthContext value={Authdata}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;
