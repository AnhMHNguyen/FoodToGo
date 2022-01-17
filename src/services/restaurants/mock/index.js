import toronto from "./toronto.json";
import ottawa from "./ottawa.json";
import montreal from "./montreal.json";
import vancouver from "./vancouver.json";

export const mocks = {
  "43.653225,-79.383186": toronto,
  "49.2827291,-123.1207375": vancouver,
  "45.4215296,-75.69719309999999": ottawa,
  "45.5016889,-73.567256": montreal
}

export const mockDuration = [
  "20 - 30 mins",
  "10 - 15 mins",
  "30 - 45 mins",
  "15 - 20 mins"
]

export const mockRating = [3.5, 4, 4.1, 4.2, 4.5, 4.7, 4.8, 4.8, 5];


// const mockImages = [
//   "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
//   "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-oranges-ice-600x750.jpg",
//   "https://www.foodiesfeed.com/wp-content/uploads/2020/08/detail-of-pavlova-strawberry-piece-of-cake-600x800.jpg",
//   "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg",
//   "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-pancakes-600x750.jpg",
//   "https://www.foodiesfeed.com/wp-content/uploads/2019/02/messy-pizza-on-a-black-table-600x400.jpg",
//   "https://www.foodiesfeed.com/wp-content/uploads/2019/02/pizza-ready-for-baking-600x400.jpg",
// ];

// module.exports.addMockImages = (restaurant) => {
//   restaurant.photos = [mockImages[Math.ceil(Math.random() * (mockImages.length - 1))]];
//   return restaurant;
// };