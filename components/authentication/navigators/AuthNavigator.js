import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/auth/Login";
import { Register } from "../screens/auth/Register";
import IntroScreen from "./IntroScreen";


const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Intro">
     <Stack.Screen
        options={{ headerShown: false }}
        name="Intro"
        component={IntroScreen}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
