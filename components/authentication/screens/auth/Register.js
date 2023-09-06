import React,{useContext} from "react";
import { Text, View } from "react-native";
import { Stack, TextInput, IconButton, Button} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AuthContext } from '../../contexts/AuthContext';


export const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const {RegisterUser} = useContext(AuthContext);
  const { loading, data, error, handleRegister } = RegisterUser();


  const handleChangeEmail = (text)=>{
      setEmail(text)
  }

  const handleChangePassword = (text)=>{
      setPassword(text)
  }

  const handleSubmit = ()=>{
    if(email.trim() !== '' || password.trim() !== ''){
          handleRegister(email.toLowerCase(), password)
    }
}

const handleCreateAccount = ()=>{
  navigation.navigate('Login')
}

if(!loading && !error && data){
  handleCreateAccount()
}

  return (
    <Stack spacing={10} style={{margin: 16}} >
        <TextInput
        placeholder='Email'
        value={email}
      leading={props => <Icon name="account" {...props} />}
      onChangeText={handleChangeEmail}
    />
    <TextInput
      variant="standard"
      placeholder='password'
      value={password}
      onChangeText={handleChangePassword}
      trailing={props => (
        <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
      )}
    />
    <Button 
      style={{backgroundColor:'#3154AE'}}
      loading={loading}
       title="Register Account"
       onPress={handleSubmit}
        />
    <View style={{marginTop: 25}}>
      <Button 
      title="Login" 
      onPress={()=>handleCreateAccount()} 
      />
    </View>
    </Stack>
  );
};
