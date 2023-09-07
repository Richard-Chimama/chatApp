import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatScreen  from './Chat';
import {Settings} from './Settings';



const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <Drawer.Navigator 
            initialRouteName="ChatApp"
            screenOptions={{
                  headerStyle:{
                        backgroundColor: '#3154AE',
                  },
                  headerTitleAlign:'left',
                  headerTintColor: '#fff',

            }}
            >
        <Drawer.Screen name="ChatApp" component={ChatScreen} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
  );
}
