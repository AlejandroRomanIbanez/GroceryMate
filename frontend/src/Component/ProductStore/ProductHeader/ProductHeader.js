import React from 'react';
import './ProductHeader.css';

const ProductHeader = () => {
    return (
        <header className="product-header">
            <strong className="d-block py-2">32 Items found</strong>
            <div className="ms-auto d-flex align-items-center">
                <select className="form-select d-inline-block w-auto border pt-1 me-2">
                    <option value="0">Best match</option>
                    <option value="1">Recommended</option>
                    <option value="2">High rated</option>
                    <option value="3">Randomly</option>
                </select>
            </div>
        </header>
    );
};

export default ProductHeader;
