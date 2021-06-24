// Repository pattern for retrieving products
//
// In this case, the products are mocked, but they could easily
// be replaced with data in a database.

const PRODUCTS = [
  {
    id: "1",
    name: "Samsung Galaxy S21 Ultra 5G",
    pictureUrl: "/images/samsung_galaxy_s21_ultra.jpeg",
    price: 250000,
  },
  {
    id: "2",
    name: "Apple iPhone 12 Pro Max 256GB",
    pictureUrl: "/images/iphone_12.jpeg",
    price: 350000,
  },
  {
    id: "3",
    name: "SONY Xperia Pro 512GB",
    pictureUrl: "/images/sony_xperia_pro.jpeg",
    price: 300000,
  },
  {
    id: "4",
    name: "Xiomi Redmi Note 8",
    pictureUrl: "/images/xiaomi_redmi_note_8.jpeg",
    price: 150000,
  },
  {
    id: "5",
    name: "Google Pixel 5",
    pictureUrl: "/images/google_pixel_5.jpeg",
    price: 220000,
  },
  {
    id: "6",
    name: "Motorola G100",
    pictureUrl: "/images/motorola_g100.jpeg",
    price: 90000,
  },
];

export const listProducts = async () => Promise.resolve(PRODUCTS);

export const getProduct = async (id) =>
  Promise.resolve(PRODUCTS.find((product) => product.id === id));
