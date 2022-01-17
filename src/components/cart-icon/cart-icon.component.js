import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { useCart } from '../../services/cart/cart.context';
import { COLORS, icons, images, SIZES, FONTS } from '../../theme';

const CartIcon = ({ onPress }) => {
  const { numberOfItems } = useCart();

  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.padding1,
        backgroundColor: numberOfItems > 0 ? COLORS.lightOrange2 : COLORS.transparent,
        // ...containerStyle
      }}
      onPress={onPress}
    >
      <Image
        source={icons.cart}
        style={{
          width: 23,
          height: 23,
          tintColor: COLORS.black,
          // ...iconStyle
        }}
      />

      {numberOfItems > 0 && (
        <View
          style={{
            position: 'absolute',
            top: 7,
            right: 7,
            height: 15,
            width: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 10
            }}
          >{numberOfItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default CartIcon;
