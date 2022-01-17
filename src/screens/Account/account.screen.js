import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, ImageBackground } from 'react-native';
import SafeArea from '../../components/safe-area/safe-area.component';
import TextButton from '../../components/text-button/text-button.component';
import { FadeInView } from '../../utils/animations/fade.animation';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const AccountScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor:COLORS.white }}>
      <View
        style={{
          position: 'absolute',
          top: SIZES.height > 800 ? 50 : 25,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{
            width: SIZES.width * 0.5,
            height: 100
          }}
        /> 
      </View>
      <View style={{flex: 3}}>
        <ImageBackground
          source={images.background}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              width: SIZES.width,
              height: SIZES.height * 0.5,
              marginBottom: -SIZES.padding1
            }}
          >
            <LottieView
              key="animation"
              autoPlay
              loop
              resizeMode="cover"
              source={images.food}
            />
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: SIZES.radius
        }}
      >
        <Text style={{ textAlign: 'center', ...FONTS.h1 }}>What’s your eating Mood today?</Text>
        <Text
          style={{
            marginTop: SIZES.radius,
            textAlign: 'center',
            color: COLORS.darkGray,
            paddingHorizontal: SIZES.padding1,
            ...FONTS.body3
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
      <View
        style={{
          height: 150,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TextButton
          label="Let's get started!"
          buttonContainerStyle={{
            width: SIZES.width * 0.9,
            height: 55,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary
          }}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
}

export default AccountScreen;