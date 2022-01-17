import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import SafeArea from '../../components/safe-area/safe-area.component';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons'; 
import TextButton from '../../components/text-button/text-button.component';
import { FadeInView } from '../../utils/animations/fade.animation';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;

  const covertTimestamp = (timestamp) => {
    let date = timestamp.toDate();
    let mm = date.getMonth()+1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
    return date;
  }

  return (
    <SafeArea>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <View style={{ flex: 1, paddingBottom: 100}}>
          <Image
            source={{uri: order.restaurant.photoUrl}}
            resizeMode="cover"
              style={{
                width: '100%',
                height: 200,
              }}
          />

          <TouchableOpacity
            style={{
              position: 'absolute',
              backgroundColor: COLORS.white,
              borderRadius: 25,
              padding: 5,
              top: 10,
              left: 10,
            }}
            onPress={ () => navigation.goBack()}
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

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              width: "80%",
              paddingVertical: SIZES.padding3,
              top: 150,
              backgroundColor: COLORS.white,
              alignSelf: "center",
              borderRadius: SIZES.padding3,
              ...styles.shadow
            }}
          >
            <Text style={{ ...FONTS.h4 }}>{order.restaurant.name}</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: "center",
                marginTop: SIZES.padding2,
              }}
            >
              <Image
                source={icons.location}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.gray
                }}
              />
              <Text style={{ color: COLORS.gray, paddingLeft: SIZES.padding1 }}>{order.restaurant.address}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.padding1,
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>{covertTimestamp(order.orderAt)}</Text>
              <Entypo name="dot-single" size={16} color={COLORS.gray} />
              <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>Completed</Text>
            </View>
            <TextButton
              label="View Store"
              buttonContainerStyle={{
                backgroundColor: COLORS.lightGray,
                height: 35,
                width: 90,
                borderRadius: SIZES.radius,
                marginTop: SIZES.padding2
              }}
              labelStyle={{
                ...FONTS.body5,
                color: COLORS.black
              }}
              onPress={() => navigation.navigate("RestaurantDetail", { restaurantId: order.restaurant.restaurantId})}
            />
          </View>
          <View
            style={{
              marginTop: 130,
              alignSelf: 'center',
              width: '100%',
              paddingVertical: 30,
              backgroundColor: COLORS.white,
              padding: SIZES.padding2,
            }}
          >
            <Text style={{ ...FONTS.h3, marginBottom: 20}}>Order Items</Text>
            {order.items.map((item, idx) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: SIZES. padding3,
                  borderBottomWidth: 2,
                  borderBottomColor: COLORS.lightGray
                }}
                key={idx}
              >
                <View
                  style={{
                    borderRadius: SIZES.padding2,
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: COLORS.gray2
                  }}>
                  <Text style={{ ...FONTS.h5 }}>{item.quantity}</Text>
                </View>
                <Text style={{marginLeft: SIZES.padding3, ...FONTS.body4 }}>{item.name}</Text>
              </View>
            ))}

            <View style={{ flexDirection: 'column', paddingVertical: SIZES.radius, borderBottomWidth: 2, borderBottomColor: COLORS.lightGray}}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, ...FONTS.body4, color: COLORS.darkGray2 }}>Subtotal</Text>
                <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>${order.subtotal}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.padding3,
                }}
              >
                <Text style={{ flex: 1, ...FONTS.body4, color: COLORS.darkGray2 }}>Tax</Text>
                <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>${order.tax}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.padding3,
                }}
              >
                <Text style={{ flex: 1, ...FONTS.h4, color: COLORS.black }}>Total</Text>
                <Text style={{ ...FONTS.h4, color: COLORS.black }}>${order.total}</Text>
              </View>
            </View>
            <View
              style={{flexDirection:'column', paddingVertical: SIZES. padding3, borderBottomWidth: 2, borderBottomColor: COLORS.lightGray }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>{order.payment.toUpperCase()}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, ...FONTS.body4, color: COLORS.darkGray2 }}>Charge to {order.payment}: **** {order.last4Digits}</Text>
                <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>${order.total}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  }
})

export default OrderDetailScreen;