import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import {
  Stack,
  TextInput,
  IconButton,
  Button,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../contexts/AuthContext";

export const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(null); // New state for error message

  const { RegisterUser } = useContext(AuthContext);
  const { loading, data, error, handleRegister } = RegisterUser();

  const handleChangeEmail = (text) => {
    setEmail(text);
  };

  const handleChangePassword = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    if (email.trim() !== "" && password.trim() !== "") {
      handleRegister(email.toLowerCase(), password);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (error) {
      setErrorMessage("Username already exists."); // Update error message
    }
  }, [error]);

  if (!loading && !error && data) {
    handleCreateAccount();
  }

  return (
    <Stack spacing={10} style={{ margin: 16 }}>
      {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}{" "}
      {/* Display error message */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={handleChangeEmail}
      />
      <TextInput
        variant="standard"
        placeholder="Password"
        value={password}
        onChangeText={handleChangePassword}
      />
      <Button
        style={{ backgroundColor: "#3154AE" }}
        loading={loading}
        title="Register Account"
        onPress={handleSubmit}
      />
      <View style={{ marginTop: 25, flexDirection: "row" }}>
        <Text>Already have an account? </Text>
        <Text
          style={{ color: "blue", textDecorationLine: "underline" }}
          onPress={() => handleCreateAccount()}
        >
          Login
        </Text>
      </View>
    </Stack>
  );
};
