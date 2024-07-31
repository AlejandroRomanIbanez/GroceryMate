import React from 'react';
import './Sidebar.css';
import filterIcon from '../../Assets/filter_price.png';
import categoryIcon from '../../Assets/category.png'; 

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="shop-sidebar mt-65">
        <div className="widget widget-menu">
          <h4 className="widget-title">
            <img src={categoryIcon} alt="Category Icon" className="widget-icon" />
            Category
          </h4>
          <ul>
            <li><a href="#">Organic Fruits</a> <span>(8)</span></li>
            <li><a href="#">Fresh Vegetables</a> <span>(5)</span></li>
            <li><a href="#">Crisp Bread & Cake</a> <span>(3)</span></li>
            <li><a href="#">Sea Foods</a> <span>(9)</span></li>
            <li><a href="#">Chicken Eggs</a> <span>(4)</span></li>
            <li><a href="#">Milk & Meat</a> <span>(6)</span></li>
          </ul>
        </div>

        <div className="widget widget-menu">
          <h4 className="widget-title">
            <img src={filterIcon} alt="Filter Icon" className="widget-icon" />
            Filter By Pricing
          </h4>
          <ul>
            <li><a href="#">$05 - $10</a> <span>(159)</span></li>
            <li><a href="#">$12 - $25</a> <span>(240)</span></li>
            <li><a href="#">$50 - $100</a> <span>(183)</span></li>
            <li><a href="#">$120 - $300</a> <span>(324)</span></li>
            <li><a href="#">$500 - $1000</a> <span>(95)</span></li>
            <li><a href="#">$1050 - $1500</a> <span>(289)</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
