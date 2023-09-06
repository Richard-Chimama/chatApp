import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './CameraScreen';  // Replace with your actual import
import PreviewScreen from './PreviewScreen';  // Replace with your actual import

const Stack = createStackNavigator();

export default function Camera() {
  return (
      <Stack.Navigator initialRouteName="CameraScreen">
        <Stack.Screen 
            name="CameraScreen"
            options={{
                  headerShown: false,
            }}
         component={CameraScreen} />
        <Stack.Screen name="Preview" component={PreviewScreen} />
      </Stack.Navigator>
  );
}
