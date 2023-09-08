import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../../../contexts/AuthContext";
import { Stack, TextInput, Button, Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";

const Profile = ({ navigation }) => {
  const { handleLogout, updateUser, accessToken, deleteUser } =
    useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusColor, setStatusColor] = useState("");
  const [userData, setUserData] = useState({ firstName: null, lastname: null });

  const { loading, error, data, handleUpdate } = updateUser();
  const {
    loading: isLoading,
    error: isError,
    data: DELETED,
    handleDelete,
  } = deleteUser();

  const handleFirstname = (text) => {
    setFirstName(text);
  };

  const handleLastname = (text) => {
    setLastname(text);
  };

  const onUpdateClicked = () => {
    if (firstName.trim() !== "" || lastName.trim() !== "") {
      handleUpdate(firstName, lastName, accessToken);
    }
  };

  const onDeleteClicked = () => {
    handleDelete(accessToken);
  };

  const statusMessages = async (text, color) => {
    setStatusMessage(text);
    setStatusColor(color);

    setTimeout(() => {
      setStatusMessage(null);
    }, 3000);
  };

  useEffect(() => {
    if (!loading && !error && data) {
      statusMessages("Profile Updated!", "green");
    }
    if (error) {
      statusMessages(error, "red");
    }
  }, [loading, error, data]);

  useEffect(() => {
    if (!isLoading && !isError && DELETED) {
      statusMessages("Account deleted successfully", "yellow");
      setTimeout(() => {
        handleLogout();
      }, 2000);
    }
    if (isError) {
      statusMessages(isError, "red");
    }
  }, [isLoading, isError, DELETED]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetch(
        "https://chat-api-with-auth.up.railway.app/users",
        {
          headers: {
            authorization: "Bearer " + accessToken,
          },
        }
      );
      if (user.status === 200) {
        const data = await user.json();
        setUserData(data.data);
      }
    };
    fetchUser();
  }, [statusMessage]);

  return (
    <Stack spacing={20} style={{ margin: 16 }}>
      {statusMessage && (
        <View
          style={{
            backgroundColor: statusColor,
            height: 40,
            justifyContent: "center",
            opacity: 0.7,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            {statusMessage}
          </Text>
        </View>
      )}
      <StatusBar />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          rowGap: 20,
        }}
      >
        <Text
          style={{
            fontSize: 35,
          }}
        >
          Profile
        </Text>
        {userData.firstname || userData.lastname ? (
          <Avatar
            size={90}
            label={userData.firstname + " " + userData.lastname}
          />
        ) : (
          <Avatar size={90} icon={<Icon name="account"size={40} />} />
        )}
      </View>
      <TextInput
        placeholder="first name"
        value={firstName}
        onChangeText={handleFirstname}
      />
      <TextInput
        placeholder="last name"
        value={lastName}
        onChangeText={handleLastname}
      />

      <Button
        title="Update"
        style={{ backgroundColor: "#228558" }}
        loading={loading}
        onPress={onUpdateClicked}
      />
      <Button
        title="Delete"
        loading={isLoading}
        style={{ backgroundColor: "red" }}
        onPress={() => onDeleteClicked()}
      />
      <Button
        title="Logout"
        style={{ backgroundColor: "blue" }}
        onPress={() => handleLogout()}
      />
    </Stack>
  );
};

export default Profile;
