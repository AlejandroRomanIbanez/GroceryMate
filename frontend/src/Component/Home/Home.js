import React from 'react';
import Advertisement from '../Advertisement/Advertisement';
import Blog from '../Blog/Blog';
import Brands from '../Brands/Brands';
import DisplaySection from '../DisplaySection/DisplaySection';
import "./Home.css";

const Home = () => {

    return (
        <div>
            <DisplaySection />
            <Advertisement />
            <Brands />
        </div>
    );
};

export default Home;