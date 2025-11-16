import React from 'react';
import img1 from '../../assets/safe-delivery.png'
import img2 from '../../assets/live-tracking.png'

const Live = () => {
    return (
      <section className="mt-20 max-w-6xl mx-auto flex flex-col gap-6 px-4">
        {/* card 1 */}
        <div className="flex flex-col lg:flex-row items-center bg-white shadow-2xl p-5 rounded-2xl gap-4 relative">
          {/* left image */}
          <div className="flex items-center gap-4">
            <img src={img2} alt="" className="w-24 h-24 object-contain" />
            {/* vertical line only on lg+ */}
            <div className="hidden lg:block w-[2px] h-36 border-l-2 border-dashed border-gray-300"></div>
          </div>

          {/* right side text */}
          <div className="mt-4 lg:mt-0 lg:ml-6">
            <h1 className="font-bold text-xl mb-2">Live Parcel Tracking</h1>
            <p className="text-gray-600">
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>

        {/* card 2 */}
        <div className="flex flex-col lg:flex-row items-center bg-white shadow-2xl p-5 rounded-2xl gap-4 relative">
          <div className="flex items-center gap-4">
            <img src={img1} alt="" className="w-24 h-24 object-contain" />
            <div className="hidden lg:block w-[2px] h-36 border-l-2 border-dashed border-gray-300"></div>
          </div>

          <div className="mt-4 lg:mt-0 lg:ml-6">
            <h1 className="font-bold text-xl mb-2">Live Parcel Tracking</h1>
            <p className="text-gray-600">
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>

        {/* card 3 */}
        <div className="flex flex-col lg:flex-row items-center bg-white shadow-2xl p-5 rounded-2xl gap-4 relative">
          <div className="flex items-center gap-4">
            <img src={img1} alt="" className="w-24 h-24 object-contain" />
            <div className="hidden lg:block w-[2px] h-36 border-l-2 border-dashed border-gray-300"></div>
          </div>

          <div className="mt-4 lg:mt-0 lg:ml-6">
            <h1 className="font-bold text-xl mb-2">Live Parcel Tracking</h1>
            <p className="text-gray-600">
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>
      </section>
    );
};

export default Live;