import React, { useState } from 'react';
import './ProductHeader.css';

const ProductHeader = () => {
    const [selectedOption, setSelectedOption] = useState("Suggested");
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const options = ["Suggested", "Name", "Price"];

    const handleOptionClick = (option) => {
        setSelectedOption(option);
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
                        {selectedOption}
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
