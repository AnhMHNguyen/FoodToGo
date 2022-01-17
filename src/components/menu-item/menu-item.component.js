import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import { COLORS, icons, images, SIZES, FONTS } from '../../theme';

const MenuItem = ({ item, navigation, restaurant }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        justifyContent:'space-between',
        backgroundColor: COLORS.white,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.lightGray1,
        borderRadius: 5
      }}
      onPress={() => navigation.navigate("MenuItemDetail", {item, restaurant})}
    >
      <View
        style={{
          flexDirection: 'column',
          width: '70%',
        }}
      >
        <Text style={{ ...FONTS.h4, marginBottom: 5}}>{item.name}</Text>
        <Text style={{ color: COLORS.darkGray2, marginBottom: 5}}>{item.description}</Text>
        <Text >${item.price}</Text>
      </View>
      <Image
        source={images[item.photo]}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
          borderRadius: 5,
        }}
      />
    </TouchableOpacity>
  );
}

export default MenuItem;