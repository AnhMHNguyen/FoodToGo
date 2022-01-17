import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/Account/account.screen';
import LoginScreen from '../screens/Account/login.screen';
import RegisterScreen from '../screens/Account/register.screen';
import RecoverPasswordScreen from '../screens/Account/recover-password.screen'

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false}}>
    <Stack.Screen name="Main" component={ AccountScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
  </Stack.Navigator>
);