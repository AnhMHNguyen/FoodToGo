import React, { useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground , ActivityIndicator} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SafeArea from '../../components/safe-area/safe-area.component';
import Header from '../../components/header/header.component';
import FormInput from '../../components/form-input/form-input.component';
import TextButton from '../../components/text-button/text-button.component';
import { validateInput } from '../../utils/input-validation/input-validation';
import { useCart } from '../../services/cart/cart.context';
import { useAuth } from '../../services/authentication/authentication.context';
import { firestore } from '../../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";
import { payRequest, cardTokenRequest } from '../../services/checkout/checkout.service';

const AddCardScreen = ({ navigation, route }) => {
  const { payment } = route.params;
  const [cardNumber, setCardNumber] = useState("")
  const [cardNumberError, setCardNumberError] = useState("")
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [expDate, setExpDate] = useState("")
  const [expDateError, setExpDateError] = useState("")
  const [cvv, setCvv] = useState("")
  const [cvvError, setCvvError] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const { emptyCart, total, restaurant, cart, numberOfItems, subtotal, tax } = useCart();
  const { user } = useAuth();

  const isEnabledNext = () => { 
    return cardNumber !== "" && cardNumberError === "" && name !== "" && nameError === "" &&
      expDate !== "" && expDateError === "" && cvv !== "" && cvvError === "";
  }

  const onPay = async () => {
    setIsLoading(true);
    const cardInfo = { 
      card: { 
        number: cardNumber.replace(/\s/g, ''),
        exp_month: expDate.slice(0, 2),
        exp_year: expDate.slice(-2),
        cvc: cvv,
        name: name
      }
    }
    try {
      const card = await cardTokenRequest(cardInfo)
      if (!card || !card.id) {
        setIsLoading(false);
        navigation.navigate("CheckoutError", { error: "Please fill in a valid credit card" });
        return;
      }
      const sum = parseInt(total * 100)
      payRequest(card.id, sum, name)
      .then((result) => {
        addDoc(collection(firestore, "orders"), {
          user: user.uid,
          restaurant: {
            restaurantId: restaurant.id,
            photoUrl: restaurant.photo,
            name: restaurant.name,
            address: restaurant.address
          },
          subtotal,
          total,
          tax,
          numberOfItems,
          items: cart,
          orderAt: new Date(),
          payment: payment,
          last4Digits: cardNumber.slice(-4)
        })
        setIsLoading(false);
        navigation.navigate("CheckoutSuccess");
        emptyCart();
      })
      .catch((err) => {
        setIsLoading(false);
        navigation.navigate("CheckoutError", { error: err });
        console.log(err)
      });
    } catch(err) {
      setIsLoading(false);
      navigation.navigate("CheckoutError", { error: "Oops! Something went wrong" });
      console.log(err)
    }
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
          title="ADD CARD INFO"
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
            <View style={{width: 50}}/>
          }
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: SIZES.padding2,
          }}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
        >
          {/*Card Image*/}
          <ImageBackground
            source={images.card}
            style={{
              height: 230,
              width: '100%',
              marginTop: SIZES.padding2,
              borderRadius: SIZES.padding2,
              overflow: 'hidden',
              ...styles.shadow
            }}
          >
            <Image
              source={icons[payment]}
              resizeMode="contain"
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                height: 40,
                width: 80,
                
              }}
            />

            <View style={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              paddingHorizontal: SIZES.padding
            }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{ name }</Text>

              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text style={{ flex: 1, color: COLORS.white, ...FONTS.body3 }}>{ cardNumber }</Text>
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{ expDate }</Text>
              </View>
            </View>
          </ImageBackground>
          {/*Form Input */}
          <View
            style={{
              marginTop: SIZES.padding * 2,
            }}
          >
            <FormInput
              label="Card Number"
              keyboardType="number-pad"
              maxLength={19}
              value={cardNumber}
              placeholder="4242 4242 4242 4242"
              onChange={(value) => {
                let v = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                setCardNumber(v);
                validateInput(value, 19, setCardNumberError)
              }}
              errorMsg={cardNumberError}
              appendComponent={ 
              <View style={{ justifyContent: 'center' }}>
                <Image source={cardNumber === "" || (cardNumber !== "" && cardNumberError === "") ? icons.correct : icons.cancel}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: cardNumber ==="" ? COLORS.gray : (cardNumber !== "" && cardNumberError === "" ) ? COLORS.green : COLORS.red
                  }}
                />
              </View>
            }
            />

            <FormInput
              label="Cardholder Name"
              value={name}
              containerStyle={{
                marginTop: SIZES.padding3
              }}
              onChange={(value) => {
                validateInput(value, 3, setNameError);
                setName(value);
              }}
              errorMsg={nameError}
              appendComponent={ 
              <View style={{ justifyContent: 'center' }}>
                <Image source={name === "" || (name !== "" && nameError === "") ? icons.correct : icons.cancel}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: name ==="" ? COLORS.gray : (name !== "" && nameError === "" ) ? COLORS.green : COLORS.red
                  }}
                />
              </View>
            }
            />

            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.padding3,
              }}
            >
              <FormInput
                label="Expiry Date"
                keyboardType="number-pad"
                value={expDate}
                maxLength={4}
                placeholder="MMYY"
                containerStyle={{
                  flex: 1
                }}
                onChange={(value) => {
                  setExpDate(value);
                  validateInput(value, 4, setExpDateError);
                }}
                appendComponent={ 
                  <View style={{ justifyContent: 'center' }}>
                    <Image source={expDate === "" || (expDate !== "" && expDateError === "") ? icons.correct : icons.cancel}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: expDate ==="" ? COLORS.gray : (expDate !== "" && expDateError === "" ) ? COLORS.green : COLORS.red
                      }}
                    />
                  </View>
                }
              />

              <FormInput
                label="CVV"
                keyboardType="number-pad"
                value={cvv}
                placeholder="123"
                maxLength={3}
                containerStyle={{
                  flex: 1,
                  marginLeft: SIZES.padding2
                }}
                onChange={(value) => {
                  validateInput(value, 3, setCvvError);
                  setCvv(value);
                }}
                appendComponent={ 
                  <View style={{ justifyContent: 'center' }}>
                    <Image source={cvv === "" || (cvv !== "" && cvvError === "") ? icons.correct : icons.cancel}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: cvv ==="" ? COLORS.gray : (cvv !== "" && cvvError === "" ) ? COLORS.green : COLORS.red
                      }}
                    />
                  </View>
                }
              />
            </View>
          </View>

        </KeyboardAwareScrollView>
        <View
          style={{
            paddingTop: SIZES.padding2,
            paddingBottom: SIZES.padding1 * 2,
            alignItems: 'center',
          }}
        >
          {isLoading ? <ActivityIndicator size="large" color={COLORS.primary} /> : (  
            <TextButton
              label="Place Your Order"
              disabled={isEnabledNext() ? false : true}
              buttonContainerStyle={{
                width: SIZES.width * 0.9,
                height: 55,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                paddingVertical: 15,
                backgroundColor: isEnabledNext() ? COLORS.primary : COLORS.transparentPrimary
              }}
              onPress={onPay}
            />
          )}
        </View>
      </View>
    </SafeArea>
  );
} 

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 7
  }
})
export default AddCardScreen;
