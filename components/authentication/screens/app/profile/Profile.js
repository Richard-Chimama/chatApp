import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../../../contexts/AuthContext";
import { Stack, TextInput, Button, Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  const { handleLogout, updateUser, accessToken, deleteUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  const { loading, error, data, handleUpdate } = updateUser();
  const {loading:isLoading, error:isError, data:DELETED, handleDelete} = deleteUser();

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

  const updateMessage = async () => {
    setStatusMessage("Message Updated");

    setTimeout(() => {
      setStatusMessage(null);
    }, 3000);
  };

  useEffect(() => {
    if (!loading && !error && data) {
      updateMessage();
    }
  }, [loading, error, data]);

  return (
    <Stack spacing={20} style={{ margin: 16 }}>
      {statusMessage && (
        <View
          style={{
            backgroundColor: "green",
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
        <Avatar
          size={90}
          icon={(props) => <Icon name="account" {...props} />}
        />
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
        style={{ backgroundColor: "red" }}
        onPress={() => handleLogout()}
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
