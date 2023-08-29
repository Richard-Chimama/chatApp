
import 'react-native-gesture-handler';

import {useCallback} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, Button } from 'react-native';

/* import JsxAndStylingIntro from './components/1.intro-jsx-and-styling/JsxAndStylingIntro';
import FlexboxPart1 from './components/1.intro-jsx-and-styling/FlexboxPart1';
import FlexboxPart2 from './components/1.intro-jsx-and-styling/FlexboxPart2';
import ImagesFontsAndIcons from './components/1.intro-jsx-and-styling/ImagesFontsAndIcons'; */
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
/* import Formhandling from './components/2.form-handling/Formhandling';
import PostList from './components/3.lists/PostList';
import StackNavigator from './components/4.navigation/navigators/StackNavigator'; */
import { NavigationContainer } from '@react-navigation/native';
/* import DrawerNavigator from './components/4.navigation/navigators/DrawerNavigator';
import BottomTabNavigator from './components/4.navigation/navigators/BottomTabNavigator'; */
//import { CameraApp } from './components/5.camera/CameraApp';
import { RootNavigator } from './components/authentication/navigators/RootNavigator';
import { AuthProvider } from './components/authentication/contexts/AuthContext';

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [fontsLoaded] = useFonts({
    'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return ( 
    <NavigationContainer>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        {/* 6. Authentication  */}
        {/* If logged in, display AppNav Else display AuthNav */}
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>

        
        

        {/* 5. camera */}
        {/* <CameraApp /> */}
        
        
        {/* 4. Navigation */}
        {/* <StackNavigator /> */}
        {/* <DrawerNavigator /> */}
       


        {/* 3. Form handling */}
        {/* <PostList /> */}

        {/* 2. Form handling */}
        {/* <Formhandling /> */}


        {/* 1. JSX & styling intro */}
        {/* <ImagesFontsAndIcons /> */}
        {/* <FlexboxPart2 /> */}
        {/* <FlexboxPart1 /> */}
        {/* <JsxAndStylingIntro /> */}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,          // Stretches out, takes up the available space
  }
});