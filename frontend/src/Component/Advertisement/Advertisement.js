import React from 'react';
import "./Advertisement.css";
import img1 from "../Assets/ad1.png";
import img2 from "../Assets/ad2.png";
import img3 from "../Assets/ad3.png";
import img4 from "../Assets/ad4.png";
import img5 from "../Assets/ad5.png";
import { MdDoubleArrow } from 'react-icons/md';

const Advertisement = () => {
    return (
        <div className='advertisement-container'>

            <div className='advertisement-sub-container'>

                <div className='cont-img'>
                    <div className='hoverImg'>
                        <div className='hoverImg-content'>
                            <div className='shop-now-btn flex items-center justify-center'>
                                <button>Shop Now</button>
                                <MdDoubleArrow className='ml-1 ' />
                            </div>
                            <h1>Lorem Ipsum</h1>
                            <p>Why do we use it?</p>
                        </div>
                        <img src={img1} alt="" />
                    </div>
                </div>

                <div className='flex flex-col gap-8'>
                    <div className='relative'>
                        <div className='center-img-content'>
                            <h1>Lorem Ipsum</h1>
                            <p>Why do we use it?</p>
                            <div className='shop-now-btn flex items-center justify-center'>
                                <button>Shop Now</button>
                                <MdDoubleArrow className='ml-1 ' />
                            </div>
                        </div>

                        <div className="hover02 column-top">
                            <div>
                                <div className='center-top-img'>
                                    <img src={img2} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-8 flex-col md:flex-row'>

                        <div className='relative'>
                            <div className='bottom-img1-content'>
                                <h1>Lorem Ipsum</h1>
                                <p>Why do we use it?</p>
                                <div className='shop-now-btn flex items-center justify-center'>
                                    <button>Shop Now</button>
                                    <MdDoubleArrow className='ml-1 ' />
                                </div>
                                <div className='bg-black h-[1px] w-[40%] mt-2' />
                            </div>

                            <div className="hover03 column">
                                <div>
                                    <div className='bottomTwoImg'>
                                        <img src={img3} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='relative'>
                            <div className='absolute z-10 left-2 top-2'>
                                <h1 className='text-2xl md:text-4xl font-black text-red-700 leading-tight'>Lorem Ipsum</h1>
                                <p className='text-base text-red-600a6 text-center'>Why do we use it?</p>

                                <div className='font-medium text-gray-800 flex items-center justify-center'>
                                    <button>Shop Now</button>
                                    <MdDoubleArrow className='ml-1 ' />
                                </div>
                                <div className='bg-black h-[1px] w-[40%] mt-2' />
                            </div>
                            <div className="hover03 column border">
                                <div>
                                    <div className='bottomTwoImg'>
                                        <img src={img4} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='cont-img'>
                    <div className='hoverImg relative'>
                        <div className='right-img-content'>
                            <h1>Lorem Ipsum</h1>
                            <p>Why do we use it?</p>
                        </div>
                        <img src={img5} alt="" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Advertisement;
