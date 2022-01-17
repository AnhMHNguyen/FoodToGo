import React, { useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/header/header.component';
import SafeArea from '../../components/safe-area/safe-area.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import TextButton from '../../components/text-button/text-button.component';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const PaymentOptionsScreen = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(null)
  const isEnabledNext = () => { 
    return selectedCard !== null
  }
  return (
    <SafeArea>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white
        }}
      >
        <Header
          title="Choose Payment Method"
          leftComponent={ 
            <TouchableOpacity
              style={{
                width: 50,
                justifyContent: 'center'
              }}
              onPress={() => navigation.goBack()}
            >
              <Image 
                source={icons.cross}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25
                }}
              />
            </TouchableOpacity>
          }
          rightComponent={ 
            <CartIcon
              onPress={() => navigation.navigate("CartDetail")}
            />
          }
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding2,
            paddingBottom: SIZES.padding
          }}
        >
          {/* Visa button*/}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 100,
              alignItems: 'center',
              marginTop: SIZES.padding2,
              paddingHorizontal: SIZES.padding3,
              borderWidth: 2,
              borderRadius: SIZES.padding2,
              borderColor: selectedCard === "visa" ? COLORS.primary : COLORS.lightGray2
            }}
            onPress={() => setSelectedCard("visa")}
          >
            <View
              style={{
                width: 60,
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderRadius: SIZES.padding2,
                borderColor: COLORS.lightGray2
              }}
            >
              <Image
                source={icons.visa}
                resizeMode="center"
                style={{
                  width: 35,
                  height: 35
                }}
              />
            </View>
            <Text style={{ flex: 1, marginLeft: SIZES.padding3, ...FONTS.h3 }}>Visa</Text>
            <Image
              source={selectedCard === "visa" ? icons.check_on : icons.check_off}
              style={{
                width: 25,
                height: 25
              }}
            />
          </TouchableOpacity>
          {/* paypal button*/}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 100,
              alignItems: 'center',
              marginTop: SIZES.padding2,
              paddingHorizontal: SIZES.padding3,
              borderWidth: 2,
              borderRadius: SIZES.padding2,
              borderColor: selectedCard === "mastercard" ? COLORS.primary : COLORS.lightGray2
            }}
            onPress={() => setSelectedCard("mastercard")}
          >
            <View
              style={{
                width: 60,
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderRadius: SIZES.padding2,
                borderColor: COLORS.lightGray2
              }}
            >
              <Image
                source={icons.mastercard}
                resizeMode="center"
                style={{
                  width: 35,
                  height: 35
                }}
              />
            </View>
            <Text style={{ flex: 1, marginLeft: SIZES.padding3, ...FONTS.h3 }}>Mastercard</Text>
            <Image
              source={selectedCard === "mastercard" ? icons.check_on : icons.check_off}
              style={{
                width: 25,
                height: 25
              }}
            />
          </TouchableOpacity>
        </ScrollView>

        <View
          style={{
            paddingTop: SIZES.padding2,
            paddingBottom: SIZES.padding1 * 2,
            alignItems: 'center',
          }}
        >
          <TextButton
            label="Next"
            disabled={isEnabledNext() ? false : true}
            buttonContainerStyle={{
              width: SIZES.width * 0.9,
              height: 55,
              alignItems: 'center',
              borderRadius: SIZES.radius,
              paddingVertical: 15,
              backgroundColor: isEnabledNext() ? COLORS.primary : COLORS.transparentPrimary
            }}
            onPress={() => navigation.navigate("AddCard", {payment: selectedCard})}
          />
        </View>
      </View>
    </SafeArea>
  );
} 

export default PaymentOptionsScreen;
