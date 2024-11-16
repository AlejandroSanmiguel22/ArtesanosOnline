import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Importa las imágenes de las categorías
import menu_1 from '../assets/categories/menu_1.png';
import menu_2 from '../assets/categories/menu_2.png';
import menu_3 from '../assets/categories/menu_3.png';
import menu_4 from '../assets/categories/menu_4.png';
import menu_5 from '../assets/categories/menu_5.png';
import menu_6 from '../assets/categories/menu_6.png';
import menu_8 from '../assets/categories/menu_8.png';

// Importa las imágenes de los productos
import food_1 from '../assets/sublist/food_1.png';
import food_2 from '../assets/sublist/1.png';
import food_3 from '../assets/sublist/2.png';
import food_4 from '../assets/sublist/3.png';
import food_5 from '../assets/sublist/food_5.png';
import food_6 from '../assets/sublist/food_6.png';
import food_7 from '../assets/sublist/4.png';
import food_16 from '../assets/sublist/food_16.png';
import food_17 from '../assets/sublist/food_17.png';
import food_18 from '../assets/sublist/food_18.png';
import food_20 from '../assets/sublist/food_20.png';
import food_22 from '../assets/sublist/food_22.png';
import food_25 from '../assets/sublist/food_25.png';
import food_26 from '../assets/sublist/food_26.png';
import food_30 from '../assets/sublist/food_30.png';
import food_33 from '../assets/sublist/food_33.png';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "https://artesanosonline-backend-ak8f.onrender.com";

  // Menú estático con imágenes correctas
  const [menu_list] = useState([
    { menu_name: "Cerámica", menu_image: menu_1 },
    { menu_name: "Textiles", menu_image: menu_2 },
    { menu_name: "Cestería", menu_image: menu_3 },
    { menu_name: "Tallado", menu_image: menu_4 },
    { menu_name: "Joyería", menu_image: menu_5 },
    { menu_name: "Vidrio", menu_image: menu_6 },
    { menu_name: "Pintura", menu_image: menu_8 },
  ]);

  // Lista de productos con categorías asignadas
  const [foodList] = useState([
    // Cerámica
    { _id: "1", name: "Vaso de Cerámica", description: "Hecho a mano", price: 20, category: "Cerámica", image: food_17 },
    { _id: "2", name: "Vasijas", description: "Único y artesanal", price: 35, category: "Cerámica", image: food_1 },

    // Textiles
    { _id: "3", name: "Tela", description: "Color vibrante", price: 15, category: "Textiles", image: food_18 },
    { _id: "4", name: "Bolsa de Tela", description: "Ecológica y duradera", price: 12, category: "Textiles", image: food_16 },

    // Cestería
    { _id: "5", name: "Floreros Multiuso", description: "Hecha con mimbre", price: 50, category: "Cestería", image: food_22 },
    { _id: "6", name: "Jarrón", description: "Ideal para la mesa", price: 45, category: "Cestería", image: food_30 },

    // Tallado
    { _id: "7", name: "Figura Tallada", description: "Arte en madera", price: 70, category: "Tallado", image: food_5 },
    { _id: "8", name: "Juguetes Tallados", description: "Perfecto para niños", price: 30, category: "Tallado", image: food_25 },

    // Joyería
    { _id: "9", name: "Collar Elegante", description: "Diseño único", price: 100, category: "Joyería", image: food_4 },
    { _id: "10", name: "Pulsera Artesanal", description: "Hecho a mano", price: 25, category: "Joyería", image: food_7 },

    // Vidrio
    { _id: "11", name: "Florero de Vidrio", description: "Ideal para flores", price: 60, category: "Vidrio", image: food_2 },
    { _id: "12", name: "Plato de Vidrio", description: "Decoración elegante", price: 80, category: "Vidrio", image: food_3 },

    // Pintura
    { _id: "15", name: "Pintura Flores", description: "Colores vibrantes", price: 150, category: "Pintura", image: food_20 },
    { _id: "16", name: "Floreros", description: "Detalles precisos", price: 200, category: "Pintura", image: food_26 },

    // Extras para completar
    { _id: "20", name: "Cesta Decorativa", description: "Perfecto para interiores", price: 55, category: "Cestería", image: food_6 },
    { _id: "21", name: "Zapatos de Tela", description: "Con estilo artesanal", price: 120, category: "Textiles", image: food_33 },
  ]);

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const currency = "$";
  const deliveryCharge = 50;

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
    if (token) {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const itemInfo = foodList.find((product) => product._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    url,
    menu_list,
    foodList,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    currency,
    deliveryCharge,
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

// Validación de las props con PropTypes
StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreContextProvider;
