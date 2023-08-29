import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../screens/app';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
            name="App" 
            component={App}
            options={{
                  headerShown: false
            }}
             />
    </Stack.Navigator>
  );
}