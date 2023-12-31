import React, {useContext} from 'react'
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { AuthContext } from '../contexts/AuthContext';


export const RootNavigator = () => {
  const {accessToken} = useContext(AuthContext);

  return (
    <>
      {
        accessToken !== null
          ? <AppNavigator />
          : <AuthNavigator />
      }
    </>
  )
}