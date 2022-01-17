import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { AppNavigation } from './app.navigator';
import { RestaurantNavigator } from './restaurants.navigator';
import { AccountNavigator } from './account.navigator';
import { useAuth } from '../services/authentication/authentication.context';

export const Navigation = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {isAuthenticated ? <RestaurantNavigator/> : <AccountNavigator />}
    </NavigationContainer>
  );
}