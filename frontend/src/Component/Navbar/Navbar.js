import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        if (window.innerWidth >= 768) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='navbar-container'>
            <div className='navbar-sub-container'>
                {isMobile && (
                    <div className='burger-menu' onClick={toggleMenu}>
                        <FaBars size={28} />
                    </div>
                )}

                {isMobile && isMenuOpen ? (
                    <div className="mobile-menu">
                        <ul className='anim-nav'>
                            <li><a href="#!">Home</a></li>
                            <li><a href="#!">Shop <MdKeyboardArrowDown /></a></li>
                            <li><a href="#!">Page <MdKeyboardArrowDown /></a></li>
                            <li><a href="#!">Blog</a></li>
                            <li><a href="#!">Contact</a></li>
                        </ul>
                    </div>
                ) : (
                    <div className={`navbar ${isMenuOpen ? 'active' : ''}`}>
                        <ul className='anim-nav'>
                            <li><a href="#!">Home</a></li>
                            <li><a href="#!"> <span className='flex items-center'>Shop <MdKeyboardArrowDown className='text-[25px]' /></span> </a></li>
                            <li><a href="#!"> <span className='flex items-center'>Page <MdKeyboardArrowDown className='text-[25px]' /></span> </a></li>
                            <li><a href="#!">Blog</a></li>
                            <li><a href="#!">Contact</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
