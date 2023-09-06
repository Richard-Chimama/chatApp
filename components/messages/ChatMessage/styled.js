import styled from "styled-components/native"

export const Container = styled.TouchableOpacity`
      padding: 12px;
      background-color: lightgray;
      opacity: 0.8;
      border-radius: 8px;
      max-width: 75%;
      min-width: 50%;
      display: flex;
      align-self: ${(props) => props.isCurrentUser ?'flex-end':'flex-start'};
      margin: 5px;
`

export const Username = styled.Text`
      font-weight: 800;
      font-size: 12px;
      margin-bottom: 10px;
`

export const Content = styled.Text`
      font-size: 12px;
`

export const TimeStamp = styled.Text`
      align-self: flex-end;
      margin-top: 5px;
      font-size: 10px;
`

