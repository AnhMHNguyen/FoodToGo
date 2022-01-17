import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
// import { Animated } from 'react-native';
import FavouriteHeart from '../../components/favourite-heart/favourite-heart.component';
import Header from '../../components/header/header.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import SafeArea from '../../components/safe-area/safe-area.component';
import { useFavourites } from '../../services/favourites/favourites.context';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const FavouriteScreen = ({ navigation }) => {
  const { favourites, removeFromFavourites } = useFavourites();

  return (
    <SafeArea>
      <View
        style={{
          flex: 1,
        }}
      >
        <Header
          title="My Favourites"
          leftComponent={ 
            <View style={{width: 50}} />
          }
          rightComponent={
            <CartIcon
              onPress={() => navigation.navigate("CartDetail")}
            />
          }
        />

        <SwipeListView
          data={favourites}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding2,
            paddingBottom: 100,
          }}
          disableRightSwipe={true}
          rightOpenValue={-75}
          renderItem={(data, rowData) => (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("RestaurantDetail", {restaurantId: data.item.id})}>
              <View
                style={{
                height: 120,
                padding: SIZES.padding2,
                backgroundColor: COLORS.white,
                ...styles.cartItemContainer
              }}
              >
                <Image
                  source={{ uri: data.item.photo }}
                  resizeMode="cover"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 5,
                  }}
                />
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: SIZES.padding2
                    }}
                  >
                    <Text style={{ ...FONTS.h5, marginBottom: 5 }}>{data.item.name}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}
                    >
                      <Image
                        source={icons.star}
                        style={{
                          height: 15,
                          width: 15,
                          tintColor: COLORS.primary,
                          marginRight: 7
                        }}
                      />
                      <Text style={{ ...FONTS.body4, color: COLORS.darkGray }}>{data.item.rating}</Text>
                    </View>
                    <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>{data.item.address}</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>{data.item.duration}</Text>
                  </View>
                  <FavouriteHeart
                    restaurant={data.item}
                    containerStyle={{
                      padding: 15,
                      right: 0,
                      top: 0
                    }}
                  />
              </View>
            </TouchableWithoutFeedback>
          )}

          renderHiddenItem={(data, rowData) => (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: COLORS.lightGray1,
                ...styles.cartItemContainer
              }}
              onPress={() => removeFromFavourites(data.item)}
            >
              <Image
                source={icons.cross}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 10,
                  tintColor: COLORS.primary
                }}
              />
            </TouchableOpacity>
          )}
        />
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

export default FavouriteScreen;