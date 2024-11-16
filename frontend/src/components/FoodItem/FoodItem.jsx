import { useContext } from 'react';
import PropTypes from 'prop-types'; // Importamos PropTypes para la validación de props
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
  const { cartItems, addToCart, removeFromCart, currency } = useContext(StoreContext);

  return (
    <div className="food-item">
      {/* Contenedor de la imagen del producto */}
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={image} // Aquí usamos la imagen directamente desde las props
          alt={`Image of ${name}`} // Descripción accesible
        />
        {!cartItems[id] ? (
          // Mostrar el ícono para agregar si no hay ningún artículo en el carrito
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          // Contador de artículos si ya hay algún artículo en el carrito
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
              alt="Remove one item"
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={() => addToCart(id)}
              alt="Add one more item"
            />
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Product rating" />
        </div>
        <p className="food-item-desc">{desc}</p>
        <p className="food-item-price">
          {currency}
          {price.toFixed(2)} {/* Formato de precio con dos decimales */}
        </p>
      </div>
    </div>
  );
};

// Validación de props con PropTypes
FoodItem.propTypes = {
  image: PropTypes.string.isRequired, // `image` debe ser una cadena y obligatorio
  name: PropTypes.string.isRequired,  // `name` debe ser una cadena y obligatorio
  price: PropTypes.number.isRequired, // `price` debe ser un número y obligatorio
  desc: PropTypes.string.isRequired,  // `desc` debe ser una cadena y obligatorio
  id: PropTypes.string.isRequired,    // `id` debe ser una cadena y obligatorio
};

export default FoodItem;
