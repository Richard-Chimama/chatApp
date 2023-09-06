import { useState } from 'react';


const updateUser = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdate = async (firstname, lastname, accessToken) => {
    setLoading(true);
    setError(null);

    const info = {
      firstname: firstname,
      lastname: lastname
    };

    try {
      const update = await fetch('https://chat-api-with-auth.up.railway.app/users', {
        method: 'PATCH',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(info),
      });

      console.log('you are here!')      
      if (update.status === 200) {
            console.log(update)
          setData('updated');
        } else{
            setError('Authentication failed');
        }
     
    } catch (error) {
      console.log(error)
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, handleUpdate };
};

export default updateUser;
