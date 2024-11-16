import  { useContext } from 'react';
import PropTypes from 'prop-types';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
    const { menu_list } = useContext(StoreContext);

    // Aseguramos que menu_list está definido y no está vacío
    if (!menu_list || menu_list.length === 0) {
        return <p>Loading menu...</p>;
    }

    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Explora Nuestra Colección</h1>
            <p className="explore-menu-text">
                Descubre una diversa gama de tesoros artesanales. Nuestra misión es celebrar el arte y la tradición,
                ofreciendo piezas únicas que aportan cultura y creatividad a tu vida, una obra artesanal a la vez.
            </p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => (
                    <div
                        key={index}
                        className="explore-menu-list-item"
                        onClick={() =>
                            setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))
                        }
                    >
                        <img
                            src={item.menu_image}
                            alt={item.menu_name}
                            className={category === item.menu_name ? 'active' : ''}
                        />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );
};

// Validaciones con PropTypes
ExploreMenu.propTypes = {
    category: PropTypes.string.isRequired, // Verifica que sea string y obligatorio
    setCategory: PropTypes.func.isRequired, // Verifica que sea función y obligatorio
};

export default ExploreMenu;
