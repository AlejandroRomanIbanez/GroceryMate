import React, { useState } from 'react';
import './AgeVerificationModal.css';

const AgeVerificationModal = ({ show, onClose, onConfirm }) => {
    const [birthDate, setBirthDate] = useState('');
  
    const handleConfirm = () => {
      const birthDateObj = new Date(birthDate);
      let age = new Date().getFullYear() - birthDateObj.getFullYear();
      const monthDiff = new Date().getMonth() - birthDateObj.getMonth();
      const dayDiff = new Date().getDate() - birthDateObj.getDate();
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
  
      if (age >= 18) {
        onConfirm(true);
      } else {
        onConfirm(false);
      }
    };
  
    if (!show) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Age Verification</h2>
          <p>This is a +18 product. Please enter your birth date:</p>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    );
  };
  
export default AgeVerificationModal;