import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [sum, setSum] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);

  useEffect(() => {
    if (!cart.length) {
      setRestaurant(null)
      setSum(0);
      setTax(0)
      setTotal(0)
      setNumberOfItems(0);
      return;
    }
    const newSum = cart.reduce((acc, { price, quantity }) => {
      return (acc += price * quantity);
    }, 0);
    const newNumber = cart.reduce((acc, { quantity }) => {
      return (acc += quantity);
    }, 0);
    setSum(newSum);
    setTax((newSum * 0.13).toFixed(2))
    setTotal((newSum * 1.13).toFixed(2))
    setNumberOfItems(newNumber);
  }, [cart])

  const add = (item, quantity, rst) => {
    if (rst !== null) {
      if (!restaurant || restaurant.id !== rst.id) {
        setRestaurant(rst);
        setCart([{ ...item, quantity: quantity }]);
        return;
      }
    }
    const existingItem = cart.find((i) => i.menuId === item.menuId);
    if (existingItem) {
      const newCart = cart.map(i => i.menuId !== item.menuId ? i : {...i, quantity: i.quantity + quantity})
      setCart(newCart);
    } else {
      setCart([...cart, {...item, quantity: quantity}])
    }
  };
  
  const clear = (item) => {
    const newCart = cart.filter((i) => i.menuId !== item.menuId);
    setCart(newCart);
  }

  const remove = (item) => {
    const existingItem = cart.find((i) => i.menuId === item.menuId);
    if (existingItem) {
      if (existingItem.quantity === 1) {
        clear(item)
      } else {
        const newCart = cart.map(i => i.menuId !== item.menuId ? i : {...i, quantity: i.quantity - 1})
        setCart(newCart)
      }
    } else {
      return;
    }
  }

  const empty = () => {
    setCart([]);
    setRestaurant(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal: sum,
        total: total,
        tax: tax,
        numberOfItems: numberOfItems,
        restaurant: restaurant,
        addToCart: add,
        removeFromCart: remove,
        clearItem: clear,
        emptyCart: empty
      }}
    >
      { children }
    </CartContext.Provider>
  )
}


export const useCart = () => useContext(CartContext);