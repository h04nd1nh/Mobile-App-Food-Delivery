import React, { createContext, useState, useEffect, useContext } from "react";
import { AsyncStorage } from "react-native"; // Import AsyncStorage from 'react-native'

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [userToken, setUserToken] = useState(null); // State to store the user token

  useEffect(() => {
    // Check if a token is saved, and authenticate if available
    checkSavedToken();
  }, []);

  const checkSavedToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem("userToken");
      if (savedToken) {
        // Set the token in the state
        setUserToken(savedToken);
      }
    } catch (error) {
      console.error("Error reading saved token:", error);
    }
  };

  const handleLogin = async (phone, password) => {
    // Simulate authentication, replace with actual API call
    try {
      const response = await fetch("http://192.168.0.107:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
          password: password,
        }),
      });

      if (response.status === 200) {
        const res = await response.json();
        const userToken = res.token; // Replace with the actual key where the token is stored in the API response
        await AsyncStorage.setItem("userToken", userToken);
        setUserToken(userToken);
        console.log(userToken);
      } else {
        setIsLoginFailed(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoginFailed(true);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setUserToken(null);
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };

  return (
    <LoginContext.Provider
      value={{ userToken, handleLogin, handleLogout, isLoginFailed }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  return useContext(LoginContext);
};
