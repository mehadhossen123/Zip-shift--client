import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({review}) => {
    const { user_photoURL, review:testimonial ,userName} = review;

    return (
      <div>
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm mx-auto relative">
          {/* Quote Icon */}
          <FaQuoteLeft className="text-4xl text-blue-200 mb-4" />

          {/* Testimonial Text */}
          <p className="text-gray-700 mb-6">{testimonial}</p>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-300 mb-4"></div>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-900">
              <img src={user_photoURL} alt="" />
            </div>
            <div>
              <h3 className="font-bold text-teal-900">{userName}</h3>
              <p className="text-gray-500 text-sm">Senior Product Designer</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ReviewCard;