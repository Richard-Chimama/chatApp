import { useState } from "react";

const deleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async (accessToken) => {
    setLoading(true);
    setError(null);

    try {
      const del = await fetch(
        "https://chat-api-with-auth.up.railway.app/users",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(del);

      if (del.status === 200) {
        setData("DELETED");
      } else {
        setError("Authentication failed");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, handleDelete };
};

export default deleteUser;
