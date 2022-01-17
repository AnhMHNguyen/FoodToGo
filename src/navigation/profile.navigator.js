import React from 'react';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators  } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile/profile.screen';
import ProfileEditScreen from '../screens/Profile/profile-edit.screen';

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        // cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        ...TransitionPresets.ModalSlideFromBottomIOS
      }}
      // initialRouteName={"Home"}
    >
        <ProfileStack.Screen
          name="ProfileMain"
          component={ProfileScreen}
        />
        <ProfileStack.Screen
          name="ProfileEdit"
          component={ProfileEditScreen}
        />
    </ProfileStack.Navigator>
  );
}