import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Platform } from 'react-native';
import TextButton from '../text-button/text-button.component';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from '../../services/cart/cart.context';
import { COLORS, icons, images, SIZES, FONTS } from '../../theme';

const FooterTotal = ({ navigation }) => {
  const { subtotal, total, tax, restaurant, numberOfItems } = useCart();

  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[COLORS.transparent, COLORS.lightGray1]}
        style={{
          position: 'absolute',
          top: -15,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 200 : 50,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15
        }}
      />
      <View
        style={{
          padding: SIZES.padding3,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.white
        }}
      >
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <Text style={{flex:1, ...FONTS.body3}}>Subtotal</Text>
          <Text style={{ ...FONTS.h4 }}>${subtotal}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base
          }}
        >
          <Text style={{flex:1, ...FONTS.body3}}>Tax</Text>
          <Text style={{ ...FONTS.h4 }}>${tax}</Text>
        </View>
        <View
          style={{
            height: 1,
            marginVertical: SIZES.padding,
            backgroundColor: COLORS.lightGray1
          }}
        />
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <Text style={{flex:1, ...FONTS.h2}}>Total</Text>
          <Text style={{ ...FONTS.h2 }}>${total}</Text>
        </View>

        <TextButton
          label="Place your Order"
          disabled={numberOfItems > 0  ? false : true}
          buttonContainerStyle={{
            width: SIZES.width * 0.9,
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: SIZES.radius,
            backgroundColor: numberOfItems > 0 ? COLORS.primary : COLORS.transparentPrimary,
            marginTop: SIZES.padding,
            alignSelf: 'center',
          }}
          onPress={() => navigation.navigate("PaymentOptions")}
        />
        {restaurant !== null && 
          <TextButton
            label="Add Items"
            buttonContainerStyle={{
              width: SIZES.width * 0.9,
              height: 55,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.black,
              marginTop: 5,
              alignSelf: 'center',
            }}
            onPress={() => navigation.navigate("RestaurantDetail", {restaurantId: restaurant.id})}
          />
        }
      </View>
    </View>
  );
}

export default FooterTotal;