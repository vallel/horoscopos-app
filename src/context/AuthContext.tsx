import React, { useState, createContext } from "react";

export const AuthContext = createContext({
  auth: undefined,
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider(props: any) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);

  const logIn = (userData: any) => {
    setAuth(userData);
  };

  const logOut = () => {
    setAuth(undefined);
  };

  const valueContext = {
    auth,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
