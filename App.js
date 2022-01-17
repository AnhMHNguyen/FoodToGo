import React from "react";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Navigation } from "./src/navigation";
import {AuthenticationContextProvider} from './src/services/authentication/authentication.context';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
// warnings for fetching asynchronous firebase firestore 
LogBox.ignoreLogs(['Async Storage has been extracted from react-native core']);
//warings from firebase persistence of user authentication

const App = () => {
  const [loaded] = useFonts({
    "Poppins-Black": require('./assets/fonts/Poppins-Black.ttf'),
    "Poppins-Bold": require('./assets/fonts/Poppins-Bold.ttf'),
    "Poppins-SemiBold": require('./assets/fonts/Poppins-SemiBold.ttf'),
    "Poppins-Regular": require('./assets/fonts/Poppins-Regular.ttf'),
  })
  
  if(!loaded){
    return null;
  }
  return (
    <>
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
      <ExpoStatusBar style="auto" />
    </>
  )
}

export default App