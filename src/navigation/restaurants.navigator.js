import React from 'react';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators  } from '@react-navigation/stack';
// import RestaurantsScreen from '../screens/Home/restaurants.screen';
import RestaurantDetailScreen from '../screens/Home/restaurant-detail.screen';
import MenuItemDetailScreen from '../screens/Home/menu-item-detail.screen';
import CartDetailScreen from '../screens/Home/cart-detail.screen';
import PaymentOptionsScreen from '../screens/Home/payment-option.screen';
import AddCardScreen from '../screens/Home/add-card.screen';
import CheckoutSuccessScreen from '../screens/Home/checkout-success.screen';
import CheckoutErrorScreen from '../screens/Home/checkout-error.screen';
import { AppNavigation } from './app.navigator';
import { FavouritesContextProvider } from '../services/favourites/favourites.context';
import { RestaurantsContextProvider } from '../services/restaurants/restaurants.context';
import { CartContextProvider } from '../services/cart/cart.context';
import { LocationContextProvider } from '../services/location/location.context';

const RestaurantStack = createStackNavigator();

export const RestaurantNavigator = () => {
  return (
    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <CartContextProvider>
            <RestaurantStack.Navigator
              screenOptions={{
                headerShown: false,
                // cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                ...TransitionPresets.ModalSlideFromBottomIOS
              }}
              // initialRouteName={"Home"}
            >
                <RestaurantStack.Screen
                  name="RestaurantsMain"
                  component={AppNavigation}
                />
                <RestaurantStack.Screen
                  name="RestaurantDetail"
                  component={RestaurantDetailScreen}
                />
                <RestaurantStack.Screen
                  name="MenuItemDetail"
                  component={MenuItemDetailScreen}
                />
                <RestaurantStack.Screen
                  name="CartDetail"
                  component={CartDetailScreen}
                />
                <RestaurantStack.Screen
                  name="PaymentOptions"
                  component={PaymentOptionsScreen}
                />
                <RestaurantStack.Screen
                  name="AddCard"
                  component={AddCardScreen}
                />
                <RestaurantStack.Screen
                  name="CheckoutSuccess"
                  component={CheckoutSuccessScreen}
                  />
                <RestaurantStack.Screen
                  name="CheckoutError"
                  component={CheckoutErrorScreen}
                />
            </RestaurantStack.Navigator>
          </CartContextProvider>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
}