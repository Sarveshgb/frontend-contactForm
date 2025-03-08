import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const FormSuccess = () => {
  return (
    <div className="form-success">
      <FaCheckCircle className="success-icon" />
      <h2>Thank You!</h2>
      <p>Your message has been successfully submitted.</p>
      <p>We'll get back to you as soon as possible.</p>
      <div className="success-actions">
        <Link to="/" className="home-link">Return to Home</Link>
        <button 
          onClick={() => window.location.reload()} 
          className="new-form-link"
        >
          Send Another Message
        </button>
      </div>
    </div>
  );
};

export default FormSuccess;