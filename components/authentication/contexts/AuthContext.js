import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginFunction from './LoginFunction';

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState(null);

  const handleLogout = async () => {
    console.log('handleLogout')

    try {
      await AsyncStorage.removeItem('accessToken')
      setAccessToken(null)
    } catch(error) {
      console.log(error)
    }
  }

  const isLoggedIn = async () => {
    console.log('isLoggedIn')

    try {
      const token = await AsyncStorage.getItem('accessToken')
      setAccessToken(token)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, [])

  return (
    <AuthContext.Provider value={{accessToken,isLoggedIn, LoginFunction, handleLogout}}>
      {children}
    </AuthContext.Provider>
  )

}