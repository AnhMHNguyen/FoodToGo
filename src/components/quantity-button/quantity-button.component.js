import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import { useCart } from '../../services/cart/cart.context';
import { COLORS, icons, images, SIZES, FONTS } from '../../theme';

const QuantityButton = ({ containerStyle, buttonStyle, quantity, minusOnPress, plusOnPress }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        ...containerStyle
      }}
    >
      <TouchableOpacity
        style={{
          // width: 50,
          backgroundColor: COLORS.white,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopLeftRadius: 25,
          borderBottomLeftRadius: 25,
          ...buttonStyle
        }}
        onPress={minusOnPress}
      >
        <Text style={{...FONTS.body1}}>-</Text>
      </TouchableOpacity>

      <View
        style={{
          // width: 50,
          backgroundColor: COLORS.white,
          alignItems: 'center',
          justifyContent: 'center',
          ...buttonStyle
,        }}
      >
        <Text style={{ ...FONTS.h2 }}>{ quantity }</Text>
      </View>
      <TouchableOpacity
        style={{
          // width: 50,
          backgroundColor: COLORS.white,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          ...buttonStyle
        }}
        onPress={plusOnPress}
      >
        <Text style={{...FONTS.body1}}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default QuantityButton;