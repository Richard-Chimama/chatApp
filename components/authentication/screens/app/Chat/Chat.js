import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  ImageBackground,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";
import ChatMessage from "../../../../messages/ChatMessage/ChatMessage";
import { useQuery } from "react-query";
import * as S from "./styled";

import { AuthContext } from "../../../contexts/AuthContext";

const Chat = () => {
  const { accessToken } = useContext(AuthContext);
  const [inputText, setInputText] = useState("");
  const [userId, setUserId] = useState(null);
  const flatListRef = useRef(null);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://chat-api-with-auth.up.railway.app/messages",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        return res.json().then((data) => data.data.reverse());
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      throw new Error("Fetching failed");
    }
  };

  const {
    data: chatMessages,
    isLoading,
    isError,
    refetch,
  } = useQuery("chatMessages", fetchData, {
    refetchInterval: 3000,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const user = await AsyncStorage.getItem("userId");
      if (user !== null) {
        setUserId(user);
      }
    };

    fetchUserId();
  }, []);

  // Scroll to the end when component first loads
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(isError);
    }
    if (!isLoading && !isError && chatMessages) {
      setDisplayedMessages(chatMessages.slice(0, 20).reverse());
    }
  }, [isLoading, isError, chatMessages]);

  const handleLoadMore = () => {
    const newOffset = displayedMessages.length;
    const moreMessages = chatMessages.slice(newOffset, newOffset + 20); // Adjust the number as needed

    setDisplayedMessages((prevMessages) => [
      ...moreMessages.reverse(),
      ...prevMessages,
    ]);

    if (flatListRef.current) {
      const newContentHeight = moreMessages.length * 100;
      flatListRef.current.scrollToOffset({
        offset: newContentHeight,
        animated: false,
      });
    }
  }; //end of handleLoadMore

  const handleSend = async () => {
    if (inputText.trim() !== "") {
      const newMessage = {
        content: inputText,
      };

      try {
        const res = await fetch(
          "https://chat-api-with-auth.up.railway.app/messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(newMessage),
          }
        );

        if (res.status === 201) {
          refetch();
          flatListRef.current.scrollToEnd({ animated: true });
          setInputText("");
          // Scroll to the end after adding a new message
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    }
  };

  const renderChatMessage = useMemo(
    () =>
      ({ item }) =>
        <ChatMessage item={item} userId={userId} openModal={openModal} />,
    [userId]
  );

  const openModal = (messageId) => {
    setIsModalVisible(true);
    setSelectedMessageId(messageId);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedMessageId(null);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        "https://chat-api-with-auth.up.railway.app/messages/"+selectedMessageId,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.status === 200) {
        refetch(); // Refetch messages after deletion
        closeModal();
      }else{
        console.log(res.message)
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../../../assets/flower.jpg")}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          {userId !== null && (
            <FlatList
              data={displayedMessages}
              renderItem={renderChatMessage}
              keyExtractor={(item, index) => item._id.toString() + index}
              initialNumToRender={20}
              maxToRenderPerBatch={25}
              windowSize={21}
              ref={flatListRef}
              onMomentumScrollEnd={({ nativeEvent }) => {
                if (nativeEvent.contentOffset.y === 0) {
                  handleLoadMore();
                }
              }}
            />
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderTopWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              backgroundColor: "#fff",
            }}
          >
            <TextInput
              style={{ flex: 1, marginRight: 8 }}
              placeholder="Type a message..."
              value={inputText}
              onChangeText={setInputText}
              multiline={true}
              numberOfLines={5}
            />
            <TouchableOpacity onPress={handleSend}>
              <Ionicons name="send" size={24} color="blue" />
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
          >
            <TouchableWithoutFeedback onPress={closeModal}>
              <S.ModalContainer>
                <S.ModelContent>
                  <Text>Do you want to delete this message?</Text>
                  <Button title="Delete" onPress={handleDelete} />
                  <Button title="Cancel" onPress={closeModal} />
                </S.ModelContent>
              </S.ModalContainer>
            </TouchableWithoutFeedback>
          </Modal>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Chat;
