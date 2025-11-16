import React from 'react';
import img from '../../assets/service.png'

const Services = () => {
    return (
      <div className="bg-accent mt-5  py-20 rounded-3xl ">
        <div className="w-full flex justify-center items-center">
          <div className="w-[500px] ">
            <h1 className="text-white text-2xl font-bold text-center">
              Our Services
            </h1>
            <p className="text-sm font-bold text-white text-center">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>
        </div>

        <section className="grid mx-3 grid-cols-1 lg:grid-cols-3 gap-4 md:grid-cols-2">
          <div className="bg-white shadow-2xl rounded-2xl mt-5  px-4 py-5">
            <div className="flex justify-center items-center">
              <img src={img} alt="" />
            </div>
            <h2 className="font-bold text-2xl text-black my-3 text-center">
              Express & Standard Delivery
            </h2>
            <p className="text-accent-content text-sm text-center">
              We deliver parcels within 24–72 hours in Dhaka, Chittagong,
              Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka
              within 4–6 hours from pick-up to drop-off.
            </p>
          </div>
          {/* card -2 */}
          <div className="bg-cyan-500 shadow-2xl rounded-2xl mt-5  px-4 py-5">
            <div className="flex justify-center items-center">
              <img src={img} alt="" />
            </div>
            <h2 className="font-bold text-2xl text-black my-3 text-center">
              Nationwide Delivery
            </h2>
            <p className="text-accent-content text-sm text-center">
              We deliver parcels nationwide with home delivery in every
              district, ensuring your products reach customers within 48–72
              hours.
            </p>
          </div>
          {/* card -3 */}
          <div className="bg-white shadow-2xl rounded-2xl mt-5  px-4 py-5">
            <div className="flex justify-center items-center">
              <img src={img} alt="" />
            </div>
            <h2 className="font-bold text-2xl text-black my-3 text-center">
              Fulfillment Solution
            </h2>
            <p className="text-accent-content text-sm text-center">
              We also offer customized service with inventory management
              support, online order processing, packaging, and after sales
              support.
            </p>
          </div>
          {/* card-4 */}
          <div className="bg-white shadow-2xl rounded-2xl mt-5  px-4 py-5">
            <div className="flex justify-center items-center">
              <img src={img} alt="" />
            </div>
            <h2 className="font-bold text-2xl text-black my-3 text-center">
              Cash on Home Delivery
            </h2>
            <p className="text-accent-content text-sm text-center">
              100% cash on delivery anywhere in Bangladesh with guaranteed
              safety of your product.
            </p>
          </div>
          {/* card-5 */}
          <div className="bg-white shadow-2xl rounded-2xl mt-5  px-4 py-5">
            <div className="flex justify-center items-center">
              <img src={img} alt="" />
            </div>
            <h2 className="font-bold text-2xl text-black my-3 text-center">
              Corporate Service / Contract In Logistics
            </h2>
            <p className="text-accent-content text-sm text-center">
              Customized corporate services which includes warehouse and
              inventory management support.
            </p>
          </div>
          {/* card-6 */}
          <div className="bg-white shadow-2xl rounded-2xl mt-5  px-4 py-5">
            <div className="flex justify-center items-center">
              <img src={img} alt="" />
            </div>
            <h2 className="font-bold text-2xl text-black my-3 text-center">
              Parcel Return
            </h2>
            <p className="text-accent-content text-sm text-center">
              Customized corporate services which includes warehouse and
              inventory management support.
            </p>
          </div>
        </section>
      </div>
    );
};

export default Services;