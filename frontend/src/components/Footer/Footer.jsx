import './Footer.css'; // Mantén la importación de estilos
import { assets } from '../../assets/assets'; // Mantén la importación de assets

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        {/* Sección izquierda del footer */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Company Logo" />
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>



        {/* Sección derecha del footer */}
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>
              <a href="mailto:contact@tomato.com">contact@tomato.com</a>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      {/* Derechos de autor */}
      <p className="footer-copyright">
        Copyright © {new Date().getFullYear()} Tomato.com - All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
