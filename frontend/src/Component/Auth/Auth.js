import React, { useState } from 'react';
import './Auth.css';
import logo from '../Assets/Frame2.png';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-form-container">
          <div className="auth-form">
            <div className="auth-form-header">
              <img 
                src={logo}
                alt="logo" 
                className="logo"
              />
              <h4 className="header-title">We are MarketMate</h4>
            </div>
            {isLogin ? <LoginForm handleSwitch={handleSwitch} /> : <RegisterForm handleSwitch={handleSwitch} />}
          </div>
        </div>
        <div className="auth-info">
          <h4>We're here to help you navigate the aisles and find what you need</h4>
          <p>At MarketMate, we believe that shopping should be a breeze, not a chore. That's why we're dedicated to providing you with a personalized shopping experience that's tailored to your needs and preferences.</p>
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ handleSwitch }) => (
  <form className="form">
    <input type="email" placeholder="Email address" className="form-input" required />
    <input type="password" placeholder="Password" className="form-input" required />
    <button type="submit" className="submit-btn">Sign In</button>
    <a href="#!" onClick={(e) => { e.preventDefault(); handleSwitch(); }} className="switch-link">Create a new account</a>
  </form>
);

const RegisterForm = ({ handleSwitch }) => (
  <form className="form">
    <input type="text" placeholder="Full Name" className="form-input" required />
    <input type="email" placeholder="Email address" className="form-input" required />
    <input type="password" placeholder="Password" className="form-input" required />
    <button type="submit" className="submit-btn">Sign Up</button>
    <a href="#!" onClick={(e) => { e.preventDefault(); handleSwitch(); }} className="switch-link">Already have an account? Login</a>
  </form>
);

export default Auth;
