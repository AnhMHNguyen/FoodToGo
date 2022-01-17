import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, icons, images, SIZES, FONTS } from '../../theme';

const Header = ({ title, rightComponent, leftComponent, titleStyle, containerStyle }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        marginVertical: SIZES.padding1,
        marginHorizontal: SIZES.padding1 * 2,
        ...containerStyle
      }}
    >
      {leftComponent}
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <View
          style={{
            width: '90%',
            height: '100%',
            alignItems: "center",
            justifyContent: "center",
            ...titleStyle
          }}
        >
          <Text style={{ ...FONTS.h4 }}>{ title }</Text>  
        </View>
      </View>
      { rightComponent }
    </View>
  );
}

export default Header;
