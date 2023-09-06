import { createStackNavigator } from '@react-navigation/stack';
import App from '../screens/app';

const Stack = createStackNavigator();

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