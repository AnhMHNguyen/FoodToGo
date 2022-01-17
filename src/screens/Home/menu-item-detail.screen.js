import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/header/header.component';
import QuantityButton from '../../components/quantity-button/quantity-button.component';
import TextButton from '../../components/text-button/text-button.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import SafeArea from '../../components/safe-area/safe-area.component';
import { FadeInView } from '../../utils/animations/fade.animation';
import { useCart } from '../../services/cart/cart.context';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const MenuItemDetailScreen = ({ route, navigation }) => {
  const { item, restaurant } = route.params;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const onAddHandle = (item) => {
    addToCart(item, quantity, restaurant);
    navigation.navigate("CartDetail");
  }

  const onMinusHandle = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  }
  const onPlusHandle = () => {
    setQuantity(quantity + 1);
  }

  useEffect(() => {
    setTotalPrice(quantity*item.price)
  },[quantity])

  return (
    <SafeArea>
      <View
        style={{
          flex: 1,
        }}
      >
        <Header
          title={restaurant.name}
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

        <View
          style={{
            flex: 1,
            alignItems: "center"
          }}
        >
          <View
            style={{
              height: SIZES.height * 0.35,
            }}
          >   
            <Image
              source={images[item.photo]}
              resizeMode="cover"
              style={{
                width: SIZES.width,
                height: '100%',
              }}
            />
            <QuantityButton
              containerStyle={{
                position: 'absolute',
                bottom: -20,
                width: SIZES.width,
                height: 50,
              }}
              buttonStyle={{
                width: 50
              }}
              minusOnPress={onMinusHandle}
              plusOnPress={onPlusHandle}
              quantity={quantity}
            />
          </View>
          <View
            style={{
              width: SIZES.width,
              alignItems: 'center',
              marginTop: 15,
              paddingHorizontal: SIZES.padding1 * 2,
            }}
          >
            <Text style={{ marginVertical: 15, textAlign: 'center', ...FONTS.h2 }}>{item.name}</Text> 
            <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
            {item.calories && 
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10
                }}
              >
                <Image
                  source={icons.fire}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 10
                  }}
                />
                <Text style={{...FONTS.body3, color: COLORS.darkGray}}>{item.calories}</Text>
              </View>
            }
          </View>
        </View>
        <View
          style={{
            padding: SIZES.padding1 * 2,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <TextButton
            label={`Add to Order - $${totalPrice.toFixed(2)}`}
            buttonContainerStyle={{
              width: SIZES.width * 0.9,
              height: 55,
              alignItems: 'center',
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
              paddingVertical: 15,
            }}
            onPress={() => onAddHandle(item)}
          />
        </View>
      </View>
    </SafeArea>
  );
}

export default MenuItemDetailScreen;