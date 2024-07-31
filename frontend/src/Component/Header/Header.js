import React from 'react';
import './Header.css';
import logo from '../Assets/Frame2.png';
import callicon from '../Assets/call icon.svg';
import { BiUser } from 'react-icons/bi';
import { BsHeart, BsCart2 } from 'react-icons/bs';
import Search from '../Search/Search';

const Header = () => {
    return (
        <div className="header-container">
            <div className="logo-search-cont">
                <img src={logo} alt="Logo" />
                <div className="search-cont">
                    <Search />
                </div>
            </div>
            <div className="contact-social-cont">
                <div className="contact">
                    <img src={callicon} alt="Call Icon" />
                    <p>Call Us <br /> <span>+34 453 435 768</span></p>
                </div>
                <div className="social-icon-cont">
                    <div className="headerIcon">
                        <BiUser className="headerIcon-size" />
                    </div>
                    <div className="headerIcon">
                        <BsHeart className="headerIcon-size" />
                    </div>
                    <div className="headerIcon">
                        <BsCart2 className="headerIcon-size" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
