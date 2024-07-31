import React from 'react';
import "./Blog.css";
import img1 from "../Assets/blog1.png";
import img2 from "../Assets/blog2.png";
import icon1 from "../Assets/milk.png";
import icon2 from "../Assets/mutton.png";
import icon3 from "../Assets/carrot.png";
import icon4 from "../Assets/shalgom.png";
import icon5 from "../Assets/greenflower.png";
import icon6 from "../Assets/mushro.png";
import icon7 from "../Assets/fish.png";
import { Fade } from 'react-reveal';

const Blog = () => {

    return (
        <>
            <hr className='mt-[70px]' />
            <div className='blog-container relative mx-auto mt-20'>

                <img src={icon1} className="icon absolute left-1/2 transform -translate-x-1/2 top-[-70px]" alt="" />
                <img src={icon2} className="icon absolute left-[88%]" alt="" />
                <img src={icon3} className="icon absolute left-[-10px] top-1/2 transform -translate-y-1/2" alt="" />
                <img src={icon4} className="icon absolute left-1/2 transform -translate-x-1/2 top-1/2" alt="" />
                <img src={icon5} className="icon absolute left-[94%] top-1/3" alt="" />
                <img src={icon6} className="icon absolute left-[-20px] bottom-5" alt="" />
                <img src={icon7} className="icon absolute left-1/2 transform -translate-x-1/2 bottom-10" alt="" />

                <div className='blog-content flex flex-wrap md:flex-col lg:flex-nowrap'>

                    <Fade left delay={100} >
                        <div className='blog-image-container md:w-full lg:w-1/2 w-full p-4'>
                            <div className='blog-cont-img'>
                                <div className='blogImg'>
                                    <img src={img1} className="w-full h-auto" alt="" />
                                </div>
                            </div>
                        </div>
                    </Fade>

                    <Fade left delay={1500}>
                        <div className='blog-text-container md:w-full lg:w-1/2 w-full p-8'>
                            <h1 className='text-2xl md:text-4xl font-bold'>Lorem Ipsum is simply dummy text of the dards</h1>
                            <p className='text-sm md:text-base text-gray-600 mt-4'>
                                be distracted by the readable content of a page when looking at its layout.
                                The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                                of letters, as opposed to using 'Content here, content here', making
                                it look like readable English. Many desktop publishing packages
                                and web page editors now use Lorem Ipsum as their default model text,
                                and a search for 'lorem ipsum'
                            </p>
                        </div>
                    </Fade>
                </div>

                <div className='blog-content flex flex-wrap md:flex-col lg:flex-nowrap mt-10'>

                    <Fade right delay={2500}>
                        <div className='blog-text-container md:w-full lg:w-1/2 w-full p-8'>
                            <h1 className='text-2xl md:text-4xl font-bold'>Why Customer Love Us</h1>
                            <p className='text-sm md:text-base text-gray-600 mt-4'>
                                It is a long established fact that a reader will be
                                distracted by the readable content of a page when looking at its layout.
                                The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                                of letters, as opposed to using 'Content here, content here',
                            </p>
                            <div className='mt-4'>
                                <h3 className='text-lg md:text-xl font-semibold'>Customer Name</h3>
                                <div className='flex gap-4 mt-2'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-gray-300'></div>
                                    <div className='w-1.5 h-1.5 rounded-full bg-gray-300'></div>
                                    <div className='w-4.5 h-1.5 rounded-full bg-green-500'></div>
                                </div>
                            </div>
                        </div>
                    </Fade>

                    <Fade top delay={2000}>
                        <div className='blog-image-container md:w-full lg:w-1/2 w-full p-4'>
                            <div className='blog-cont-img'>
                                <div className='blogImg'>
                                    <img src={img2} className="w-full h-auto" alt="" />
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>

                <hr className='mt-16' />
            </div>
        </>
    );
};

export default Blog;
