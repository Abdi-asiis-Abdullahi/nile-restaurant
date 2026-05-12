import bariis from "@/assets/bariis.jpg";
import baasto from "@/assets/baasto.jpg";
import canjeero from "@/assets/canjeero.jpg";
import sabaayad from "@/assets/sabaayad.jpg";
import sambuus from "@/assets/sambuus.jpg";
import bur from "@/assets/bur.jpg";
import shawarma from "@/assets/shawarma.jpg";
import drinks from "@/assets/drinks.jpg";
import tikkaFish from "@/assets/tikka-fish.jpg";
import rollFish from "@/assets/roll-fish.jpg";
import oliveSalad from "@/assets/olive-salad.jpg";
import bread from "@/assets/bread.jpg";
import pizza from "@/assets/pizza.jpg";
import banana from "@/assets/banana.jpg";
import burger from "@/assets/burger.jpg";
import redSoup from "@/assets/red-soup.jpg";
import chocolateDessert from "@/assets/chocolate-dessert.jpg";
import tiramisu from "@/assets/tiramisu.jpg";
import cremeBrulee from "@/assets/creme-brulee.jpg";
import milkshake from "@/assets/milkshake.jpg";
import orangeJuice from "@/assets/orange-juice.jpg";
import furulaato from "@/assets/furulaato.jpg";
import latte from "@/assets/latte.jpg";
import macchiato from "@/assets/macchiato.jpg";

// Groups and categories are dynamic (managed via useTaxonomy).
// `group` and `category` on MenuItem are free-form strings that match taxonomy.
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  group: string;
};

export type TaxonomyGroup = {
  id: string;
  name: string;
  categories: { id: string; name: string }[];
};

export const defaultTaxonomy: TaxonomyGroup[] = [
  {
    id: "g-foods",
    name: "Foods",
    categories: [
      { id: "c-rice", name: "Rice" },
      { id: "c-pasta", name: "Pasta" },
      { id: "c-pancake", name: "Pancake" },
      { id: "c-flatbread", name: "Flatbread" },
      { id: "c-samosa", name: "Samosa" },
      { id: "c-fish", name: "Fish" },
      { id: "c-salad", name: "Salad" },
      { id: "c-bread", name: "Bread" },
      { id: "c-pizza", name: "Pizza" },
      { id: "c-burger", name: "Burger" },
      { id: "c-soup", name: "Soup" },
      { id: "c-shawarma", name: "Shawarma" },
      { id: "c-fruits", name: "Fruits" },
    ],
  },
  {
    id: "g-drinks",
    name: "Drinks",
    categories: [
      { id: "c-milkshake", name: "Milkshake" },
      { id: "c-juice", name: "Juice" },
      { id: "c-smoothie", name: "Smoothie" },
      { id: "c-coffee", name: "Coffee" },
      { id: "c-tea", name: "Tea" },
      { id: "c-soft", name: "Soft Drinks" },
    ],
  },
  {
    id: "g-desserts",
    name: "Desserts",
    categories: [
      { id: "c-chocolate", name: "Chocolate" },
      { id: "c-international", name: "International" },
    ],
  },
];

export const menu: MenuItem[] = [
  // ===== FOODS =====
  { id: "rice-1", name: "Spiced Rice with Lamb", description: "Fragrant basmati rice slow-cooked with tender lamb and caramelized onions.", price: 8, image: bariis, category: "Rice", group: "Foods" },
  { id: "rice-2", name: "Chicken Biryani", description: "Aromatic basmati rice served with grilled chicken and sweet plantain.", price: 7, image: bariis, category: "Rice", group: "Foods" },
  { id: "pasta-1", name: "Pasta Bolognese", description: "Hand-tossed pasta in a rich tomato sauce with seasoned ground beef.", price: 6, image: baasto, category: "Pasta", group: "Foods" },
  { id: "pancake-1", name: "Pancake & Stew", description: "Soft sourdough pancake served with savory beef and vegetable stew.", price: 5, image: canjeero, category: "Pancake", group: "Foods" },
  { id: "flatbread-1", name: "Flatbread & Honey", description: "Warm flaky flatbread drizzled with golden honey.", price: 4, image: sabaayad, category: "Flatbread", group: "Foods" },
  { id: "samosa-1", name: "Beef Samosas (3 pcs)", description: "Crispy pastry triangles filled with spiced minced beef.", price: 3, image: sambuus, category: "Samosa", group: "Foods" },
  { id: "bread-sweet-1", name: "Sweet Fried Bread", description: "Light fried dough lightly dusted with sugar — a sweet treat.", price: 3, image: bur, category: "Bread", group: "Foods" },
  { id: "shawarma-1", name: "Chicken Shawarma", description: "Marinated chicken wrapped in soft flatbread with garlic sauce.", price: 6, image: shawarma, category: "Shawarma", group: "Foods" },
  { id: "shawarma-2", name: "Beef Shawarma", description: "Slow-roasted beef shawarma with fresh veggies and tahini.", price: 7, image: shawarma, category: "Shawarma", group: "Foods" },
  { id: "fish-1", name: "Fish Tikka", description: "Grilled fish marinated in special spices, served with lemon.", price: 9, image: tikkaFish, category: "Fish", group: "Foods" },
  { id: "fish-2", name: "Fish Roll", description: "Crispy fish roll served with fresh house salsa.", price: 8, image: rollFish, category: "Fish", group: "Foods" },
  { id: "salad-1", name: "Olive Salad", description: "Fresh olives, tomatoes, feta cheese and crisp greens.", price: 5, image: oliveSalad, category: "Salad", group: "Foods" },
  { id: "bread-1", name: "Artisan Bread", description: "Golden, lightly baked, soft and aromatic artisan bread.", price: 2, image: bread, category: "Bread", group: "Foods" },
  { id: "pizza-1", name: "Signature Pizza", description: "Modern wood-fired pizza with melted cheese and fresh basil.", price: 9, image: pizza, category: "Pizza", group: "Foods" },
  { id: "fruit-1", name: "Fresh Banana", description: "Naturally ripened banana — sweet and refreshing.", price: 1.5, image: banana, category: "Fruits", group: "Foods" },
  { id: "burger-1", name: "Classic Beef Burger", description: "Juicy beef patty with cheese, fresh salad and a soft brioche bun.", price: 7, image: burger, category: "Burger", group: "Foods" },
  { id: "soup-1", name: "Thick Red Soup", description: "Rich, hearty red soup with savory spices and deep flavor.", price: 4, image: redSoup, category: "Soup", group: "Foods" },

  // ===== DESSERTS =====
  { id: "dessert-1", name: "Molten Chocolate Cake", description: "Warm chocolate cake with a flowing molten chocolate center.", price: 5, image: chocolateDessert, category: "Chocolate", group: "Desserts" },
  { id: "dessert-2", name: "Dark Chocolate Mousse", description: "Silky, airy dark chocolate mousse — pure indulgence.", price: 4.5, image: chocolateDessert, category: "Chocolate", group: "Desserts" },
  { id: "dessert-3", name: "Tiramisu", description: "Classic Italian dessert with espresso and cocoa.", price: 5.5, image: tiramisu, category: "International", group: "Desserts" },
  { id: "dessert-4", name: "Crème Brûlée", description: "French custard with a caramelized sugar crust and fresh berries.", price: 6, image: cremeBrulee, category: "International", group: "Desserts" },
  { id: "dessert-5", name: "New York Cheesecake", description: "Smooth cheesecake on a graham crust with seasonal fruit.", price: 5, image: cremeBrulee, category: "International", group: "Desserts" },

  // ===== DRINKS =====
  { id: "milkshake-1", name: "Strawberry Milkshake", description: "Creamy strawberry milkshake topped with whipped cream.", price: 3.5, image: milkshake, category: "Milkshake", group: "Drinks" },
  { id: "milkshake-2", name: "Chocolate Milkshake", description: "Rich, cold and indulgent chocolate milkshake.", price: 3.5, image: milkshake, category: "Milkshake", group: "Drinks" },
  { id: "milkshake-3", name: "Vanilla Milkshake", description: "Smooth vanilla milkshake with real vanilla bean.", price: 3, image: milkshake, category: "Milkshake", group: "Drinks" },
  { id: "juice-1", name: "Orange Juice", description: "Freshly squeezed orange juice — chilled and bright.", price: 2.5, image: orangeJuice, category: "Juice", group: "Drinks" },
  { id: "juice-2", name: "Mango Juice", description: "Sweet, fresh mango juice.", price: 2.5, image: orangeJuice, category: "Juice", group: "Drinks" },
  { id: "juice-3", name: "Avocado Juice", description: "Smooth avocado juice with a touch of honey.", price: 3, image: orangeJuice, category: "Juice", group: "Drinks" },
  { id: "juice-4", name: "Mixed Fruit Juice", description: "Blend of seasonal fruits in one refreshing glass.", price: 3, image: orangeJuice, category: "Juice", group: "Drinks" },
  { id: "smoothie-1", name: "Berry Smoothie", description: "Thick smoothie with fresh berries and creamy yogurt.", price: 3, image: furulaato, category: "Smoothie", group: "Drinks" },
  { id: "smoothie-2", name: "Mango Smoothie", description: "Cold mango smoothie — naturally sweet and creamy.", price: 3, image: furulaato, category: "Smoothie", group: "Drinks" },
  { id: "coffee-1", name: "Espresso", description: "A bold, freshly pulled shot of espresso.", price: 2, image: latte, category: "Coffee", group: "Drinks" },
  { id: "coffee-2", name: "Cappuccino", description: "Smooth espresso topped with velvety milk foam.", price: 2.5, image: latte, category: "Coffee", group: "Drinks" },
  { id: "coffee-3", name: "Latte", description: "Creamy latte with delicate latte art.", price: 3, image: latte, category: "Coffee", group: "Drinks" },
  { id: "coffee-4", name: "Macchiato", description: "Espresso marked with a touch of foamed milk.", price: 2.8, image: macchiato, category: "Coffee", group: "Drinks" },
  { id: "coffee-5", name: "Mocha", description: "Espresso blended with chocolate and steamed milk.", price: 3.2, image: macchiato, category: "Coffee", group: "Drinks" },
  { id: "coffee-6", name: "Americano", description: "Espresso lengthened with hot water — clean and bold.", price: 2.2, image: latte, category: "Coffee", group: "Drinks" },
  { id: "coffee-7", name: "Iced Coffee", description: "Cold-brewed coffee over ice — perfect for warm days.", price: 2.8, image: macchiato, category: "Coffee", group: "Drinks" },
  { id: "tea-1", name: "Spiced Milk Tea", description: "Traditional milk tea with cardamom and warm spices.", price: 1.5, image: drinks, category: "Tea", group: "Drinks" },
  { id: "tea-2", name: "Black Spiced Tea", description: "Bold black tea infused with cinnamon, cardamom and clove.", price: 1.5, image: drinks, category: "Tea", group: "Drinks" },
  { id: "soft-1", name: "Coca-Cola", description: "Classic ice-cold Coca-Cola.", price: 1.5, image: drinks, category: "Soft Drinks", group: "Drinks" },
  { id: "soft-2", name: "Fanta", description: "Sparkling orange Fanta.", price: 1.5, image: drinks, category: "Soft Drinks", group: "Drinks" },
  { id: "soft-3", name: "Sprite", description: "Crisp lemon-lime Sprite.", price: 1.5, image: drinks, category: "Soft Drinks", group: "Drinks" },
  { id: "soft-4", name: "Mineral Water", description: "Clean, chilled mineral water.", price: 1, image: drinks, category: "Soft Drinks", group: "Drinks" },
];

export const WHATSAPP_NUMBER = "2520771883469";
export const RESTAURANT_NAME = "Nile Restaurant";
export const RESTAURANT_LOCATION = "Zoobe, opposite Safari Apartments";
export const RESTAURANT_PHONE = "+252 0771 883 469";
