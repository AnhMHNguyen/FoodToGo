import React from 'react';
import RestaurantsScreen from '../screens/Home/restaurants.screen';
import { OrderNavigator } from './order.navigator';
import FavouriteScreen from '../screens/Favourite/favourite.screen';
import MapScreen from '../screens/Map/map.screen';
import { ProfileNavigator } from './profile.navigator';
import TabBarCustomButton from '../components/tab-custom-button/tab-custom-button.component';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons, images, COLORS, SIZES, FONTS } from '../theme';

const Tab = createBottomTabNavigator();

export const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0,
          height: 60,
        }
      }}
    >
      <Tab.Screen name="Home" component={RestaurantsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.home}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary
              }}
            />
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton {...props}/>
          )
        }}
      />
      <Tab.Screen name="Map" component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.map}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary
              }}
            />
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton {...props}/>
          )
        }}
      />
      <Tab.Screen name="Favourite" component={FavouriteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.favourite}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary
              }}
            />
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton {...props}/>
          )
        }}
      />
      <Tab.Screen name="Order" component={OrderNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.order}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary
              }}
            />
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton {...props}/>
          )
        }}
      />
      <Tab.Screen name="Profile" component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.profile}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary
              }}
            />
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton {...props}/>
          )
        }}
      />
    </Tab.Navigator>
  );
}