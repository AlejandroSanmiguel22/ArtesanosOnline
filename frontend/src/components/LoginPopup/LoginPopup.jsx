import { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'; // Importar PropTypes para la validación de props

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, url, loadCartData } = useContext(StoreContext);
  const [currState, setCurrState] = useState('Sign Up');

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    const endpoint = currState === 'Login' ? '/api/user/login' : '/api/user/register';
    try {
      const response = await axios.post(`${url}${endpoint}`, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        await loadCartData({ token: response.data.token });
        toast.success(`Welcome ${currState === 'Login' ? 'back' : ''}, ${data.name || 'User'}!`);
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error during login/register:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close popup"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Sign Up' && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === 'Login' ? 'Login' : 'Create account'}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the <a href="#terms">terms of use</a> &{' '}
            <a href="#privacy">privacy policy</a>.
          </p>
        </div>
        {currState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

// Validación de las props con PropTypes
LoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired, // Validamos que setShowLogin sea una función obligatoria
};

export default LoginPopup;
