import React, { useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, icons, images, SIZES, FONTS } from '../../theme';
import { useFavourites } from '../../services/favourites/favourites.context';
// import { FavouritesContext } from '../../services/favourites/favourites.context';


const FavouriteHeart = ({ restaurant, containerStyle }) => {
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites();
  const isFavourite = favourites.find((r) => r.id === restaurant.id);
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        ...containerStyle,
        // z-index: 9,
      }}
      onPress={() => !isFavourite ? addToFavourites(restaurant) : removeFromFavourites(restaurant)}
    >
      <AntDesign
        name={ isFavourite ? 'heart' : 'hearto' }
        size={24}
        color={ isFavourite ? COLORS.red : COLORS.gray }
      />
    </TouchableOpacity>
  );
}

export default FavouriteHeart;