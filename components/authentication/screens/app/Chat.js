import React, {useContext, useState, useEffect} from 'react'
import { View, Text,Button, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListItem, Avatar } from "@react-native-material/core";

import { AuthContext } from '../../contexts/AuthContext'
 
const Chat = () => {
  const {handleLogout} = useContext(AuthContext)
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSend = ()=>{
    if (inputText.trim() !== '') {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
      };
      setChatMessages([...chatMessages, newMessage]);
      setInputText('');
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://chat-api-with-auth.up.railway.app/messages",{
          method:"GET" ,
          headers:{Authorization:`Bearer ${await AsyncStorage.getItem('accesstoken')}`}
         });
     
        const data = await res.json();
        console.log(data.data);
        if (res.status === 200) {
          setChatMessages(data);
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };
  
    fetchData();
  }, []);

  const renderChatMessage = ({ item }) => (
    <View style={{ 
      padding: 8,
      backgroundColor: 'red',
      borderRadius: 8,
      alignSelf: item.isMe ? 'flex-end' : 'flex-start',
      marginBottom: 4
       }}>
      <Text>{item.text}</Text>
    </View>
  );
  /**!SECTION
   * <Button title="Test login function" onPress={() => handleLogout()} />
   */

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={chatMessages}
        renderItem={renderChatMessage}
        keyExtractor={(item) => item.id}
      />
      
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderTopWidth: 1,
          borderColor: '#ccc',
          padding: 10,
        }}
      >
        <TextInput
          style={{ flex: 1, marginRight: 8 }}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="send" size={24} color="blue" />
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default Chat