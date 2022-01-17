import React, { useState, useContext, createContext, useEffect } from 'react';
import { restaurantsRequest, restaurantTransform } from './restaurants.service';
import { useLocation } from '../location/location.context';

const RestaurantsContext = createContext();
export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useLocation();
  
  const filterRestaurants = (category) => {
    if (category === null) {
      setFilteredRestaurants(restaurants);
    } else { 
      const listRestaurants = restaurants.filter(r => r.categories.find(c => c.id === category.id))
      setFilteredRestaurants(listRestaurants);
    }
  }
  
  const getRestaurantById = (id) => {
    const restaurant = restaurants.find(r => r.id ===id)
    return restaurant
  }

  const retrieveRestaurants = (location) => {
    setIsLoading(true);
    setTimeout(() => {
      restaurantsRequest(location)
        .then(restaurantTransform)
        .then(results => {
          setIsLoading(false);
          setRestaurants(results);
          setFilteredRestaurants(results);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err)
        })
      
    }, 2000)
  };

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants: filteredRestaurants,
        isLoading,
        error,
        filter: filterRestaurants,
        getRestaurantById
      }}
    >
      { children }
    </RestaurantsContext.Provider>
  );
}

export const useRestaurants = () => useContext(RestaurantsContext)