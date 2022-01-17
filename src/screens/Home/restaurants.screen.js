import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import SafeArea from '../../components/safe-area/safe-area.component';
import categoriesData from '../../../data/category.json';
import RestaurantInfoCard from '../../components/restaurant-info-card/restaurant-info-card.component';
import Header from '../../components/header/header.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import LocationModal from '../../components/location-modal/location-modal.component';
import { useRestaurants } from '../../services/restaurants/restaurants.context';
import { useLocation } from '../../services/location/location.context';
import { FadeInView } from '../../utils/animations/fade.animation';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const RestaurantsScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isLoading, error, restaurants, filter } = useRestaurants();
  const restaurantsRef = useRef(null);
  const { keyword } = useLocation();
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [showModal, setShowModal] = useState(false);

  const onSelectCategory = (category) => {
    restaurantsRef.current?.scrollToOffset({ animated: true, offset: 0 });
    if (selectedCategory && category.id === selectedCategory.id) {
      setSelectedCategory(null);
      filter(null);
    } else {      
      setSelectedCategory(category);
      filter(category);
    }
  }

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword])
  
  const locationOnPress = () => null;

  return isLoading ? (
    <SafeArea>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary}/>
      </View>
    </SafeArea>
  ):
  (
    <SafeArea>
      {/*Header*/}
      <Header
        title={searchKeyword}
        titleStyle={{
          backgroundColor: COLORS.lightGray3,
          borderRadius: SIZES.radius,
        }}
        leftComponent={ 
            <TouchableOpacity
              style={{
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowModal(true)}
            >
              <Image 
                source={icons.location}
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
      {/*Category*/}

      <View
        style={{
          padding: SIZES.padding1 * 2
        }}
      >
        <FlatList
          data={categoriesData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  padding: SIZES.padding1,
                  paddingBottom: SIZES.padding1 * 2,
                  backgroundColor: (selectedCategory?.id === item.id ) ? COLORS.primary : COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: SIZES.padding1,
                  borderRadius: SIZES.radius,
                  ...styles.shadow
                }}
                onPress={() => onSelectCategory(item)}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: (selectedCategory?.id === item.id ) ? COLORS.white : COLORS.lightGray,
                  }}
                >
                  <Image
                    source={icons[item.icon]}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30
                    }}
                  />
                </View>
                  <Text
                    style={{
                      marginTop: SIZES.padding1,
                      color: (selectedCategory?.id === item.id ) ? COLORS.white : COLORS.black,
                      ...FONTS.body5
                    }}
                  >{item.name}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>

      {/*Restaurants List*/}
      <FlatList
        ref={restaurantsRef}
        data={restaurants}
        vertical
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding1 * 2,
          paddingBottom: 100,
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ marginBottom: SIZES.padding1 * 2 }}
              onPress={() => navigation.navigate("RestaurantDetail", { restaurantId: item.id })}
            >
              <FadeInView>
                <RestaurantInfoCard restaurant={item}/>
              </FadeInView>
            </TouchableOpacity>
          );
        }}
        />
        
        {showModal && (
          <LocationModal isVisible={showModal} onClose={() => setShowModal(false)} />
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
    elevation: 1
  }
})

export default RestaurantsScreen;