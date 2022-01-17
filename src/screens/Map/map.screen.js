import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { TouchableOpacity, Image } from 'react-native';
import { useRestaurants } from '../../services/restaurants/restaurants.context';
import { useLocation } from '../../services/location/location.context';
import Header from '../../components/header/header.component';
import MapCallout from '../../components/map-callout/map-callout.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import LocationModal from '../../components/location-modal/location-modal.component';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const MapScreen = ({ navigation }) => {
  const { location, keyword } = useLocation();
  const { lat, lng, viewport} = location;
  const { restaurants=[] } = useRestaurants();
  const [latDelta, setLatDelta] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);

  },[location, viewport]);

  return (
    <>
      <Header
        title={keyword}
        titleStyle={{}}
        containerStyle={{
          position: "absolute",
          zIndex: 999,
          top: 30,
          width: '95%',
          backgroundColor: COLORS.white,
          alignSelf: "center",
          borderRadius: 10,
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
      <MapView style={{ width: '100%', height: '100%'}}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.03
        }}
      >
        {restaurants.map((restaurant) => (
          <MapView.Marker
            key={restaurant.id}
            title={restaurant.name}
            coordinate={{
              latitude: restaurant.geometry.latitude,
              longitude: restaurant.geometry.longitude
            }}
          >
            <MapView.Callout
              onPress={() => navigation.navigate("RestaurantDetail", {restaurantId: restaurant.id})}
            >
              <MapCallout restaurant={restaurant} />
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
      {showModal && (
        <LocationModal isVisible={showModal} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default MapScreen;