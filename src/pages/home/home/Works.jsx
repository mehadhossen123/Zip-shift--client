
import React from 'react';
import { FaCaravan } from 'react-icons/fa';

const Works = () => {
   return (
     <>
       <h1 className="font-bold text-3xl mt-5">How It Works </h1>
       <section className="grid grid-cols-1 gap-5 lg:grid-cols-4 md:grid-cols-2 mt-10">
         {/* card -1 */}
         <div className=" bg-white rounded-2xl shadow-2xl py-5 px-2 space-y-1.5  ">
           <FaCaravan className="text-5xl ml-5" />
           <h2 className="font-bold text-2xl">Booking Pick & Drop</h2>
           <p className="text-ter">
             From personal packages to business shipments — we deliver on time,
             every time.
           </p>
         </div>
         {/* card -2 */}
         <div className=" bg-white rounded-2xl shadow-2xl py-5 px-2 space-y-1.5  ">
           <FaCaravan className="text-5xl ml-5" />
           <h2 className="font-bold text-2xl">Cash On Delivery</h2>
           <p className="text-ter">
             From personal packages to business shipments — we deliver on time,
             every time.
           </p>
         </div>
         {/* card -3 */}
         <div className=" bg-white rounded-2xl shadow-2xl py-5 px-2 space-y-1.5  ">
           <FaCaravan className="text-5xl ml-5" />
           <h2 className="font-bold text-2xl">Delivery Hub</h2>
           <p className="text-ter">
             From personal packages to business shipments — we deliver on time,
             every time.
           </p>
         </div>
         {/* card -4 */}
         <div className=" bg-white rounded-2xl shadow-2xl py-5 px-2 space-y-1.5  ">
           <FaCaravan className="text-5xl ml-5" />
           <h2 className="font-bold text-2xl">Booking SME & Corporate</h2>
           <p className="text-ter">
             From personal packages to business shipments — we deliver on time,
             every time.
           </p>
         </div>
       </section>
     </>
   );
};

export default Works;