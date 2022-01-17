import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FadeInView } from '../../utils/animations/fade.animation';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const AuthLayout = ({ children, title, subtitle }) => {

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: SIZES.padding1,
        backgroundColor: COLORS.white
      }}
    >
      {/* Header */}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.padding2,
        }}
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
      >
        <View
          style={{
            alignItems: 'center',
            marginTop: 20
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{
              height: 100,
              width: 200
            }}
          />
        </View>

        <View
          style={{
            marginTop: SIZES.padding,
            marginBottom: SIZES.padding2
          }}
        >
          <Text style={{ textAlign: 'center', ...FONTS.h2 }}>{title}</Text>
          <Text style={{ textAlign: 'center', color: COLORS.darkGray2, marginTop: SIZES.base, ...FONTS.body3 }}>{subtitle}</Text>
        </View>
        {/* Children Content */}
        { children }
      </KeyboardAwareScrollView>
    </View>
  );
}

export default AuthLayout;