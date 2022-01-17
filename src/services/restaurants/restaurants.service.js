import { mocks, mockDuration, mockRating } from './mock';

export const restaurantsRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  })
}

export const restaurantTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      id: restaurant.fsq_id,
      address: restaurant.location.address,
      name: restaurant.name,
      geometry: restaurant.geocodes.main,
      categories: restaurant.categories,
      photo: restaurant.photo,
      neighbourhood: (restaurant.location.neighborhood && restaurant.location.neighborhood[0]) || restaurant.location.cross_street || "",
      duration: mockDuration[Math.ceil(Math.random() * (mockDuration.length - 1))],
      rating: mockRating[Math.ceil(Math.random() * (mockRating.length - 1))],
      priceRating: Math.floor(Math.random() * (3 - 1 + 1) + 1),
      menu: [
        {
          "menuId": `${restaurant.fsq_id}-1`,
          "name": "Crispy Chicken Burger",
          "photo": "crispy_chicken_burger",
          "description": "Burger with crispy chicken, cheese and lettuce",
          "calories": 200,
          "price": 10
        },
        {
            "menuId": `${restaurant.fsq_id}-2`,
            "name": "Crispy Chicken Burger with Honey Mustard",
            "photo": "honey_mustard_chicken_burger",
            "description": "Crispy Chicken Burger with Honey Mustard Coleslaw",
            "calories": 250,
            "price": 15
        },
        {
          "menuId":`${restaurant.fsq_id}-3`,
          "name": "Crispy Baked French Fries",
          "photo": "baked_fries",
          "description": "Crispy Baked French Fries",
          "calories": 194,
          "price": 8
        },
        {
            "menuId": `${restaurant.fsq_id}-4`,
            "name": "Hawaiian Pizza",
            "photo": "hawaiian_pizza",
            "description": "Canadian bacon, homemade pizza crust, pizza sauce",
            "calories": 250,
            "price": 15
        },
        {
            "menuId": `${restaurant.fsq_id}-5`,
            "name": "Tomato & Basil Pizza",
            "photo": "pizza",
            "description": "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
            "calories": 250,
            "price": 20
        },
        {
            "menuId": `${restaurant.fsq_id}-6`,
            "name": "Tomato Pasta",
            "photo": "tomato_pasta",
            "description": "Pasta with fresh tomatoes",
            "calories": 100,
            "price": 10
        },
        {
            "menuId": `${restaurant.fsq_id}-7`,
            "name": "Mediterranean Chopped Salad ",
            "photo": "salad",
            "description": "Finely chopped lettuce, tomatoes, cucumbers",
            "calories": 100,
            "price": 10
        },
        {
            "menuId": `${restaurant.fsq_id}-8`,
            "name": "Sushi sets",
            "photo": "sushi",
            "description": "Fresh salmon, sushi rice, fresh juicy avocado",
            "calories": 100,
            "price": 50
        }
      ]
    }
  })
  return mappedResults;
}