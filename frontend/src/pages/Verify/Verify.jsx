import { useContext, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import './Verify.css';
import axios from 'axios';

const Verify = () => {
  const { url } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const navigate = useNavigate();

  const verifyPayment = useCallback(async () => {
    const response = await axios.post(url + "/api/order/verify", { success, orderId });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  }, [url, success, orderId, navigate]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
