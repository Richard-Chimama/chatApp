import React from "react";
import * as S from "./styled";

const ChatMessage = React.memo(({ item, userId, openModal }) => {
  let isCurrentUser;
  if (item.user !== null) {
    if (item.user._id === userId) {
      isCurrentUser = true;
    } else {
      isCurrentUser = false;
    }
  }

  return (
    <S.Container
      isCurrentUser={isCurrentUser}
      onLongPress={() => openModal(item._id)}
      delayLongPress={1000}
    >
      <S.Username>
        {item.user && item.user.hasOwnProperty("username")
          ? item.user.username
          : "placeholder"}
      </S.Username>
      <S.Content>{item.content}</S.Content>
      <S.TimeStamp>{getTimeDifference(item.date)}</S.TimeStamp>
    </S.Container>
  );
});

function getTimeDifference(date) {
  const currentDate = new Date();
  const messageDate = new Date(date);

  const timeDifference = currentDate - messageDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  } else if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else {
    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  }
}

export default ChatMessage;
