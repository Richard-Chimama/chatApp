import { createStackNavigator } from "@react-navigation/stack";
import IntroScreen from "./IntroScreen";
import App from "../screens/app";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Intro">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Intro"
        component={IntroScreen}
      />
      <Stack.Screen
        name="App"
        component={App}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
