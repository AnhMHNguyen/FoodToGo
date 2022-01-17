import React, { useState, useCallback} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import {  Entypo } from '@expo/vector-icons'; 
import Header from '../../components/header/header.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import SafeArea from '../../components/safe-area/safe-area.component';
import TextButton from '../../components/text-button/text-button.component';
import { firestore } from '../../../firebase';
import { useAuth } from '../../services/authentication/authentication.context';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const OrderScreen = ({ navigation }) => {
  const [myOrderList, setMyOrderList] = useState([])
  const { user } = useAuth();
  // const isFocused = useIsFocused();

  const covertTimestamp = (time) => {
    let date = time.toDate();
    let mm = date.getMonth()+1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
    return date;
  }

  const getOrders = async () => {
    const ordersRef = collection(firestore, "orders")
    const q = query(ordersRef, where("user", "==", user.uid));
    if (q) {
      const snapshot = await getDocs(q)
      const orders = []
      snapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data()
        })
      }); 
      setMyOrderList(orders)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getOrders()
    }, [])
  );

  return (
    <SafeArea>
      {myOrderList.length === 0 ? (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text>You have no Past Orders</Text>
        </View>
      ) : (          
        <View
          style={{
            flex: 1,
          }}
        >
          <Header
            title="My Orders"
            leftComponent={ 
              <View style={{width: 50}} />
            }
            rightComponent={
              <CartIcon
                onPress={() => navigation.navigate("CartDetail")}
              />
            }
          />

          <FlatList
            data={myOrderList}
            vertical
            keyExtractor={item => `${item.id}`}
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding2,
              paddingBottom: 100,
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    marginBottom: SIZES.padding1,
                    flex: 1,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.padding1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: SIZES.padding2,
                  }}
                  onPress={() => navigation.navigate("OrderDetail", { order: item })}
                >
                  <Image
                    source={{uri: item.restaurant.photoUrl}}
                    resizeMode="cover"
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 5,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: SIZES.padding2
                    }}
                  >
                    <Text style={{ ...FONTS.h5, marginBottom:SIZES.base }}>{item.restaurant.name}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}
                    >
                      <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>{item.numberOfItems} items</Text>
                      <Entypo name="dot-single" size={16} color={COLORS.gray} />
                      <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>${item.total}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}
                    >
                      <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>{covertTimestamp(item.orderAt)}</Text>
                      <Entypo name="dot-single" size={16} color={COLORS.gray} />
                      <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>Completed</Text>
                    </View>
                  </View>
                  <TextButton
                    label="View Store"
                    buttonContainerStyle={{
                      backgroundColor: COLORS.lightGray,
                      height: 35,
                      width: 90,
                      borderRadius: SIZES.radius
                    }}
                    labelStyle={{
                      ...FONTS.body5,
                      color: COLORS.black
                    }}
                    onPress={() => navigation.navigate("RestaurantDetail", { restaurantId: item.restaurant.restaurantId})}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </SafeArea>
  );
}


export default OrderScreen;