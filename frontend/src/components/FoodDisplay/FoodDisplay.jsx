import { useContext } from 'react';
import PropTypes from 'prop-types';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);

  // Validar si foodList está cargando o no tiene datos
  if (!foodList || foodList.length === 0) {
    return <p>Loading food items...</p>;
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Las mejores artesanías cerca de ti</h2>
      <div className="food-display-list">
        {foodList
          .filter((item) => category === 'All' || item.category === category) // Filtrar por categoría
          .map((item) => (
            <FoodItem
              key={item._id} // Asegurarse de que _id sea único
              image={item.image}
              name={item.name}
              desc={item.description}
              price={item.price}
              id={item._id}
            />
          ))}
      </div>
    </div>
  );
};

// Validaciones con PropTypes
FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired, // La categoría debe ser una cadena y es requerida
};

export default FoodDisplay;
