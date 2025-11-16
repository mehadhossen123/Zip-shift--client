import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";


import { Carousel } from "react-responsive-carousel";
import img1 from '../../../assets/banner/banner1.png'
import img2 from '../../../assets/banner/banner2.png'
import img3 from '../../../assets/banner/banner3.png'
import { MdArrowOutward } from 'react-icons/md';


const Banner = () => {
    return (
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        transitionTime={1000}
        interval={2000}
        showThumbs={false}
        className='mt-5'
      >
        <div>
          <img src={img1} />

          {/* inside image text  */}
          <div className=" absolute top-[400px] w-[500px]">
            <p className="text-ter text-sm my-3">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we .
            </p>
            <div className="flex items-center gap-3">
              <button className="bg-primary p-1 px-2 rounded-sm font-bold">
                Track Your parcel
              </button>
              <div className="w-8 h-8 bg-black rounded-full  flex justify-center items-center ">
                <MdArrowOutward className="text-primary" />
              </div>
              <button className="bg-white p-1 border font-bold ">
                {" "}
                Be a rider{" "}
              </button>
            </div>
          </div>
        </div>

        <div>
          <img src={img2} />
          {/* inside image text  */}

          <div className=" absolute top-[400px] w-[500px]">
            <p className="text-ter text-sm my-3">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we .
            </p>
            <div className="flex items-center gap-3">
              <button className="bg-primary p-1 px-2 rounded-sm font-bold">
                Track Your parcel
              </button>
              <div className="w-8 h-8 bg-black rounded-full  flex justify-center items-center ">
                <MdArrowOutward className="text-primary" />
              </div>
              <button className="bg-white p-1 border font-bold ">
                {" "}
                Be a rider{" "}
              </button>
            </div>
          </div>
        </div>

        <div>
          <img src={img3} />

          {/* inside image text  */}

          <div className=" absolute top-[400px] w-[500px]">
            <p className="text-base-100 text-sm my-3">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we .
            </p>
            <div className="flex items-center gap-3">
              <button className="bg-primary p-1 px-2 rounded-sm font-bold">
                Track Your parcel
              </button>
              <div className="w-8 h-8 bg-black rounded-full  flex justify-center items-center ">
                <MdArrowOutward className="text-primary" />
              </div>
              <button className="bg-white p-1 border font-bold ">
                {" "}
                Be a rider{" "}
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    );
};

export default Banner;