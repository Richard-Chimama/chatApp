import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Stack, TextInput, IconButton, Button } from '@react-native-material/core';
import { View, Text } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export const Login = ({ navigation }) => {
  const { isLoggedIn, LoginFunction } = useContext(AuthContext);
  const { loading, data, error, handleLogin } = LoginFunction();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(null); 

  useEffect(() => {
    if (error) {
      setErrorMessage('Incorrect user information');
    }
  }, [error]);

  const handleChangeEmail = (text) => {
    setEmail(text);
  };

  const handleChangePassword = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    if (email.trim() !== '' && password.trim() !== '') {
      handleLogin(email.toLowerCase(), password);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('Register');
  };
 

  if (data) {
    isLoggedIn();
  }

  return (
    <Stack spacing={10} style={{ margin: 16 }}>
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>} {/* Display error message */}
      <TextInput
        placeholder='Email'
        value={email}
        onChangeText={handleChangeEmail}
      />
      <TextInput
        variant='standard'
        placeholder='Password'
        value={password}
        onChangeText={handleChangePassword}
      />
      <Button style={{ backgroundColor: '#3154AE' }} loading={loading} title='Login' onPress={handleSubmit} />
      <View style={{ marginTop: 25, flexDirection: "row" }}>
        <Text>Dont have an account? </Text>
        <Text
          style={{ color: "blue", textDecorationLine: "underline" }}
          onPress={() => handleCreateAccount()}
        >
          Create a new account
        </Text>
        </View>
    </Stack>
  );
};
