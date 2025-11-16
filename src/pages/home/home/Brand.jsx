import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import img1 from "../../../assets/brands/amazon.png"
import img2 from "../../../assets/brands/amazon_vector.png"
import img3 from "../../../assets/brands/casio.png"
import img4 from "../../../assets/brands/moonstar.png"
import img5 from "../../../assets/brands/randstad.png"
import img6 from "../../../assets/brands/star.png"
import img7 from "../../../assets/brands/start_people.png"
import { Autoplay } from 'swiper/modules';

const Brand = () => {
    const brands=[img1,img2,img3,img4,img5,img6,img7];
    return (
      <>
        <h1 className='font-black text-2xl text-center mt-4'>We've helped thousands of sales teams</h1>
        <Swiper
          className="mt-5"
          slidesPerView={4}
          loop={true}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {brands.map((logo) => (
            <SwiperSlide>
              <img src={logo} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
        
    
};

export default Brand;