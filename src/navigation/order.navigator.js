import React from 'react';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators  } from '@react-navigation/stack';
import OrderDetailScreen from '../screens/Order/order-detail.screen';
import OrderScreen from '../screens/Order/order.screen';

const OrderStack = createStackNavigator();

export const OrderNavigator = () => {
  return (
    <OrderStack.Navigator
      screenOptions={{
        headerShown: false,
        // cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        ...TransitionPresets.ModalSlideFromBottomIOS
      }}
      // initialRouteName={"Home"}
    >
        <OrderStack.Screen
          name="OrdersMain"
          component={OrderScreen}
        />
        <OrderStack.Screen
          name="OrderDetail"
          component={OrderDetailScreen}
        />
    </OrderStack.Navigator>
  );
}