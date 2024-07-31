import React, { useState } from 'react';
import './ProductHeader.css';

const ProductHeader = ({ sortOption, sortProducts }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const options = ["Suggested", "Name", "Price"];

  const handleOptionClick = (option) => {
    sortProducts(option);
    setIsSelectOpen(false);
  };

  const toggleSelectOpen = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  return (
    <header className="product-header">
      <strong className="d-block py-2">32 Items found</strong>
      <div className="ms-auto d-flex align-items-center">
        <div className={`custom-select-container ${isSelectOpen ? 'select-open' : ''}`}>
          <div className="custom-select" onClick={toggleSelectOpen}>
            {sortOption}
          </div>
          {isSelectOpen && (
            <div className="custom-options">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="custom-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
