import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleRegister = async (email, password) => {
    setLoading(true);
    setError(null);

    const credentials = {
      username: email,
      password: password
    };

    try {
      const register = await fetch('https://chat-api-with-auth.up.railway.app/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      
      if (register.status === 200) {
          setData('registered');
        } else{
            setError('Authentication failed');
        }
     
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, handleRegister };
};

export default RegisterUser;
