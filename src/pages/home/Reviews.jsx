import React, { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import img from "../../assets/customer-top.png";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json") // or your API URL
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="mt-10 ">
      <div className="flex justify-center items-center mt-5 space-y-4">
        <div className="w-[500px]">
          <div className="flex justify-center">
            <img src={img} alt="" />
          </div>

          <div className="mt-5 space-y-3">
            <h1 className="font-bold text-2xl text-center">
              What our customers are saying
            </h1>
            <p className="text-center">
              Enhance posture, mobility, and well-being effortlessly with
              Posture Pro. Achieve proper alignment, reduce pain, and strengthen
              your body with ease!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 200,
            stretch: "50%",
            depth: 100,
            scale: 0.75,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
