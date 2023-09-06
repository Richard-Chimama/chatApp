import React, { useContext } from 'react';
import { Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import Profile from './profile/Profile';
import Camera from './profile/CameraScreen/index.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const Settings = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#228558',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
       
      })}
    >
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Camera" component={Camera} />
    </Tab.Navigator>
  );
};
