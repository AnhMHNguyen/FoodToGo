import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { COLORS, icons, images, SIZES, FONTS } from '../../theme';
import { Entypo } from '@expo/vector-icons';
import FavouriteHeart from '../favourite-heart/favourite-heart.component';

const RestaurantInfoCard = ({ restaurant }) => {

  return (
    <>    
      <View
        style={{
          marginBottom: SIZES.padding1
        }}
      >
        <Image
          source={{uri: restaurant.photo}}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
            borderRadius: SIZES.radius
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 50,
            width: SIZES.width * 0.3,
            backgroundColor: COLORS.white,
            borderTopRightRadius: SIZES.radius,
            borderBottomLeftRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            ...styles.shadow
          }}
        >
          <Text style={{ ...FONTS.h4 }}>{ restaurant.duration }</Text>
        </View>
        <FavouriteHeart
          restaurant={restaurant}
          containerStyle={{
            padding: 10,
            right: 15,
            top: 15,
            backgroundColor: COLORS.transparentWhite,
            borderRadius: SIZES.radius
          }}
        />
      </View>

      <Text style={{ ...FONTS.body2 }}>{restaurant.name}</Text>
      <View
        style={{
          marginTop: SIZES.padding1,
          flexDirection: 'row',
        }}
      >
        <Image
          source={icons.star}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.primary,
            marginRight: 10
          }}
        />
        <Text style={{ ...FONTS.body3 }}>{restaurant.rating}</Text>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10
          }}
        >
          {restaurant.categories.map((category) => (
            <View
              style={{ flexDirection: 'row' }}
              key={category.id}
            >
              <Text style={{...FONTS.body3, color: COLORS.darkGray2}}>{category.name}</Text>
              <Entypo name="dot-single" size={24} color={COLORS.darkGray2}/>
            </View>
          ))}
          {
            [1, 2, 3].map((priceRating) => (
              <Text
                key={priceRating}
                style={{
                  ...FONTS.body3,
                  color: (priceRating <= restaurant.priceRating ? COLORS.darkGray2 : COLORS.gray3) 
                }}
              >$</Text>
            ))
          }
        </View>
      </View>
    </>
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
    elevation: 1
  }
})

export default RestaurantInfoCard;