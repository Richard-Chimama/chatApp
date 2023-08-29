import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginFunction = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);

    const credentials = {
      username: email,
      password: password
    };

    try {
      const login = await fetch('https://chat-api-with-auth.up.railway.app/auth/token', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const responseData = await login.json();

      if (responseData.status === 200) {
        try {
          // fetch accessToken...
          await AsyncStorage.setItem('accessToken', responseData.data.accessToken);
          setData(responseData.data.accessToken);
        } catch (error) {
          setError(error);
        }
      } else {
        setError('Authentication failed');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, handleLogin };
};

export default LoginFunction;
