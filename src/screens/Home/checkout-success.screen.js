import React from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SafeArea from '../../components/safe-area/safe-area.component';
import TextButton from '../../components/text-button/text-button.component';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";


const CheckoutSuccessScreen = ({ navigation }) => (
  <SafeArea>
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray4
      }}
    >
      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          marginTop: SIZES.width* 0.4,
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: 400,
            height: 370,
          }}
        >
          <LottieView
            key="animation"
            autoPlay
            loop
            resizeMode="cover"
            source={images.success}
          />
        </View>
        <Text style={{ ...FONTS.h3, color: COLORS.black }}>Success! Thank You for your order!</Text>
      </View>
      <View
        style={{
          padding: SIZES.padding1 * 2,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TextButton
          label="Done"
          buttonContainerStyle={{
            width: SIZES.width * 0.9,
            height: 55,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
            paddingVertical: 15,
          }}
          onPress={() => navigation.navigate('RestaurantsMain')}
        />
      </View>
    </View>
  </SafeArea>
);

export default CheckoutSuccessScreen;