import React from 'react';
import { TouchableOpacity, View, Text, Image, Platform } from 'react-native';
import { COLORS, icons, images, SIZES, FONTS } from '../../theme';
import Webview from 'react-native-webview';

const MapCallout = ({ restaurant }) => {
  return (
    <View
      style={{
        padding: 5,
        width: 120,
        // height: 120,
        alignItems: 'center'
      }}
    >
      {Platform.OS === 'android' ? (
        <Webview
          source={{ uri: restaurant.photo }}
          style={{
            borderRadius: SIZES.padding1,
            width: 120,
            height: 90, 
            resizeMode: 'contain',
          }}
        />
      ) : (
        <Image
          source={{ uri: restaurant.photo }}
          style={{
            borderRadius: SIZES.padding1,
            width: 120,
            height: 100
          }}
        />
      )}
      <Text style={{...FONTS.h5 }}>{ restaurant.name }</Text>
    </View>
  );
}

export default MapCallout;