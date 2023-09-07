import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginFunction from "./LoginFunction";
import RegisterUser from "./RegisterUser";
import updateUser from "./UpdateUser";
import deleteUser from "./DeleteUser";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  const handleLogout = async () => {
    console.log("handleLogout");

    try {
      await AsyncStorage.removeItem("accessToken");
      setAccessToken(null);
    } catch (error) {
      console.log(error);
    }
  };

  const isLoggedIn = async () => {
    console.log("isLoggedIn");

    try {
      const token = await AsyncStorage.getItem("accessToken");
      setAccessToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <AuthContext.Provider
      value={{
        accessToken,
        isLoggedIn,
        LoginFunction,
        handleLogout,
        RegisterUser,
        updateUser,
        deleteUser
      }}
    >
      {children}
    </AuthContext.Provider>
    </QueryClientProvider>
  );
};
