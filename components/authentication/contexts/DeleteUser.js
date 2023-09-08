import { useState } from "react";

const deleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async (accessToken) => {
    setLoading(true);
    setError(null);

    console.log(accessToken)

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
      

      if (del.ok) {
        setData("DELETED");
      } else {
        console.log(del)
        setError("Something went wrong");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, handleDelete };
};

export default deleteUser;

