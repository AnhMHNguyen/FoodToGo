import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import { useLocation } from '../../services/location/location.context';
import { COLORS, icons, images, SIZES, FONTS } from '../../theme';

const LocationModal = ({ isVisible, onClose }) => {
  const [showModal, setShowModal] = useState(isVisible);
  const { search } = useLocation();
  const modalAnimatedValue = useRef(new Animated.Value(0)).current
  useEffect(() => {
    if (showModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start(() => onClose());
    }
  }, [showModal])
  
  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height-450]
  })

  const onPressHandle = (city) => {
    search(city);
    setShowModal(false);
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.transparentBlack
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setShowModal(false)}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            padding: SIZES.padding3,
            borderTopRightRadius: SIZES.padding3,
            borderTopLeftRadius: SIZES.padding3,
            backgroundColor: COLORS.white
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Text style={{ flex: 1, ...FONTS.h3 }}>Choose Your City</Text>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.padding1,
                borderWidth: 2,
                borderRadius: SIZES.padding1,
                borderColor: COLORS.gray2
              }}
              onPress={() => setShowModal(false)}
            >
              <Image
                source={icons.cross}
                style={{
                  width: 23,
                  height: 23,
                  tintColor: COLORS.gray2,
                }}
              />
              </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 50
            }}
          >
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.8,
                height: 70,
                borderBottomWidth: 2,
                borderBottomColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => onPressHandle('Vancouver')}
            >
              <Text style={{...FONTS.h4, color: COLORS.darkGray2 }}>VANCOUVER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.8,
                height: 70,
                borderBottomWidth: 2,
                borderBottomColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => onPressHandle('Toronto')}
            >
              <Text style={{...FONTS.h4, color: COLORS.darkGray2 }}>TORONTO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.8,
                height: 70,
                borderBottomWidth: 2,
                borderBottomColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => onPressHandle('Ottawa')}
            >
              <Text style={{...FONTS.h4, color: COLORS.darkGray2 }}>OTTAWA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.8,
                height: 70,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => onPressHandle('Montreal')}
            >
              <Text style={{...FONTS.h4, color: COLORS.darkGray2 }}>MONTREAL</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default LocationModal;