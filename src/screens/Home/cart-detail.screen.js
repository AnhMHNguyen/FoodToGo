import React, { useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useCart } from '../../services/cart/cart.context';
import Header from '../../components/header/header.component';
import SafeArea from '../../components/safe-area/safe-area.component';
import FooterTotal from '../../components/footer-total/footer-total.component';
import QuantityButton from '../../components/quantity-button/quantity-button.component';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const CartDetailScreen = ({ navigation }) => {
  const { cart, clearItem, addToCart, removeFromCart, restaurant, numberOfItems } = useCart();

  return (
    <SafeArea>
      <View
        style={{
        flex: 1,
          backgroundColor:COLORS.white
        }}
      >
        <Header
          title={restaurant ? `CART - ${restaurant.name}` : "MY CART"}
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
            <View />
          }
        />
        {numberOfItems > 0 ? (          
          <SwipeListView
            data={cart}
            keyExtractor={(item) => `${item.menuId}`}
            contentContainerStyle={{
              marginTop: SIZES.padding2,
              paddingHorizontal: SIZES.base,
              paddingBottom: SIZES.padding1 * 2
            }}
            disableRightSwipe={true}
            rightOpenValue={-75}
            renderItem={(data, rowData) => (
              <View
                style={{
                  height: 120,
                  backgroundColor: COLORS.lightGray,
                  ...styles.cartItemContainer
                }}
              >
                <Image
                  source={images[data.item.photo]}
                  resizeMode="cover"
                  style={{
                    width: 85,
                    height: 85,
                    borderRadius: 5,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    marginLeft: SIZES.padding2
                  }}
                >
                  <Text style={{ ...FONTS.body3 }}>{data.item.name}</Text>
                  <Text style={{ color: COLORS.primary, ...FONTS.h, marginTop: 3 }}>${data.item.price}</Text>
                </View>
                <QuantityButton
                  containerStyle={{
                    width: 100,
                    height: 40,
                  }}
                  buttonStyle={{
                    width: 35,
                  }}
                  quantity={data.item.quantity}
                  minusOnPress={() => removeFromCart(data.item)}
                  plusOnPress={() => addToCart(data.item, 1, null)}
                />
              </View>
            )}

            renderHiddenItem={(data, rowData) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  backgroundColor: COLORS.primary,
                  ...styles.cartItemContainer
                }}
                onPress={() => clearItem(data.item)}
              >
                <Image
                  source={icons.delete_icon}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: 10
                  }}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
            <View style={{flex:1 , alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{ ...FONTS.h3, color: COLORS.gray}}>Your Cart is Empty</Text>
            </View>
        )}
        <FooterTotal navigation={ navigation }/>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  cartItemContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.padding1,
    paddingHorizontal: SIZES.padding2,
    borderRadius: SIZES.padding1
  }
})

export default CartDetailScreen;