import React, {useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { Stack, TextInput, IconButton, Button} from "@react-native-material/core";
import {View, Text} from 'react-native'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export const Login = ({navigation}) => {
  const {isLoggedIn,LoginFunction} = useContext(AuthContext);
  const { loading, data, error, handleLogin } = LoginFunction();

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleChangeEmail = (text)=>{
      setEmail(text)
  }

  const handleChangePassword = (text)=>{
      setPassword(text)
  }

  const handleSubmit = ()=>{
      if(email.trim() !== '' || password.trim() !== ''){
            handleLogin(email.toLowerCase(), password)
      }
  }

  const handleCreateAccount = ()=>{
    navigation.navigate('Register')
  }

  if(error){
      console.log(error)
  }

  if(data){
      isLoggedIn()
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
       title="Login"
       onPress={handleSubmit}
        />
    <View style={{marginTop: 25}}>
      <Button 
      title="create account" 
      onPress={()=>handleCreateAccount()} 
      />
    </View>
    </Stack>
  )
}