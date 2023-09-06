import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../../../contexts/AuthContext";
import { Stack, TextInput, Button, Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const Profile = () => {
  const { handleLogout, updateUser, accessToken} = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");

  const {loading, error, data, handleUpdate} = updateUser()

  const handleFirstname = (text) => {
    setFirstName(text);
  };

  const handleLastname = (text) => {
    setLastname(text);
  };

  const onUpdateClicked = ()=>{
    if(firstName.trim() !== '' || lastName.trim() !== ''){
      console.log(firstName)
      console.log(lastName)
      handleUpdate(firstName, lastName, accessToken);
    }
  }
  if(data){
    console.log(data)
  }

  return (
    <Stack spacing={20} style={{ margin: 16 }}>
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
