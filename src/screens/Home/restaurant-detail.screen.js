import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import SafeArea from '../../components/safe-area/safe-area.component';
import { ScrollView } from 'react-native-gesture-handler';
import { useRestaurants } from '../../services/restaurants/restaurants.context';
import FavouriteHeart from '../../components/favourite-heart/favourite-heart.component';
import MenuItem from '../../components/menu-item/menu-item.component';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const RestaurantDetailScreen = ({ route, navigation }) => {
  const { restaurantId } = route.params;
  const { getRestaurantById } = useRestaurants();
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => { 
    const rst = getRestaurantById(restaurantId);
    setRestaurant(rst);
  }, [restaurantId])

  return (
    <SafeArea>
      {restaurant === null ? (
        <View style={{flex: 1 , alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (          
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          <View>
              <Image
                source={{uri: restaurant.photo}}
                resizeMode="cover"
                  style={{
                    width: '100%',
                    height: 250,
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
                  height: 200,
                  top: 200,
                  backgroundColor: COLORS.white,
                  alignSelf: "center",
                  borderRadius: SIZES.radius,
                  ...styles.shadow
                }}
              >
              {restaurant &&  <FavouriteHeart
                  restaurant={restaurant}
                  containerStyle={{
                    top: -25,
                    right: 25,
                    backgroundColor: COLORS.white,
                    padding: 10,
                    borderRadius: 25,
                    ...styles.shadow
                  }}  
                />}
                <Text style={{ ...FONTS.h2 }}>{restaurant.name}</Text>
                <View
                  style={{
                    marginTop: SIZES.padding2,
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
                        <Text style={{...FONTS.body3, color: COLORS.gray2}}> . </Text>
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: SIZES.padding,
                  }}
                >
                  <Image
                    source={icons.location}
                    resizeMode="contain"
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: COLORS.gray
                    }}
                  />
                  <Text style={{ color: COLORS.gray, paddingLeft: SIZES.padding1 }}>{restaurant.address}</Text>
                </View>

                <TouchableOpacity>
                  <Image
                    source={{}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 170,
                  alignSelf: 'center',
                  width: '100%',
                  paddingBottom: 100
                }}
              >
                {restaurant.menu.map((item) => (
                  <MenuItem key={item.menuId} item={item} navigation={navigation} restaurant={restaurant}/>
                ))}
              </View>
          </View>
        </ScrollView>
      )}
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

export default RestaurantDetailScreen;