import React from "react";
import img from "../assets/agent-pending.png";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const Rider = () => {
    const data=useLoaderData()
    console.log(data)
const {register,handleSubmit,control,formState:{errors}}=useForm()
 const riderRegion = useWatch({
   control,
   name: "riderRegion",  //watch rider region
 });


 const handleRiderApplication=(data)=>{
    console.log(data)
 }
 const regions=data.map(r=>r.region)
 const region=[...new Set(regions)]

//  Find district by region 
const findDistrictByRegion=(region)=>{
    const districts=data.filter(r=>r.region===region)
    const district = districts.map((d) => d.district);
   return district;
}
 
 

  return (
    <div>
      <div>
        <h1 className="text-4xl text-amber-400">Be a Rider </h1>
        <p className="text-sm">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="w-full grid grid-cols-1 md:grid-cols-2  gap-6 items-center"
      >
        {/* Left Side Form */}

        <div className="space-y-4 order-2 md:order-1">
          <h2 className="text-2xl font-semibold">Tell us about yourself</h2>

          {/* all row  */}

          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>Your Name</label>
              <input
                {...register("riderName", { required: true })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              {errors.riderName?.type === "required" && (
                <p className="text-red-500 text-sm">Name field is required</p>
              )}
            </div>
            <div>
              <label>Your age</label>
              <input
                {...register("riderAge", {
                  required: true,
                  valueAsNumber: true,
                })}
                type="text"
                placeholder="Your age"
                className="input input-bordered w-full"
              />
              {errors.riderAge?.type === "required" && (
                <p className="text-red-500 text-sm">Age field is required</p>
              )}
              {errors.riderName?.type === "valueAsNumber" && (
                <p className="text-red-500 text-sm">
                  Character must be the number{" "}
                </p>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>Your Email</label>
              <input
                {...register("riderEmail", { required: true })}
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
              {errors.riderEmail?.type === "required" && (
                <p className="text-red-500 text-sm">Email field is required</p>
              )}
            </div>
            <div>
              <label>Your Region</label>
              <select
                defaultValue={"Select your region"}
                {...register("riderRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value={""}>Select your region</option>
                {region.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.riderRegion?.type === "required" && (
                <p className="text-red-500 text-sm">
                  Please select your region{" "}
                </p>
              )}
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label>NID No</label>
              <input
                {...register("riderNid", { minLength: 10, required: true })}
                type="text"
                placeholder="NID"
                className="input input-bordered w-full"
              />
              {errors.riderNid?.type === "required" && (
                <p className="text-red-500 text-sm">NID field is required </p>
              )}

              {errors.riderNid?.type === "minLength" && (
                <p className="text-red-500 text-sm">
                  NID must be 10 character{" "}
                </p>
              )}
            </div>
            <div>
              <label>Contact</label>
              <input
                {...register("riderContact", { minLength: 12, required: true })}
                type="text"
                placeholder="Contact"
                className="input input-bordered w-full"
              />
              {errors.riderContact?.type === "required" && (
                <p className="text-red-500 text-sm">
                  Contact field is required{" "}
                </p>
              )}
              {errors.riderContact?.type === "minLength" && (
                <p className="text-red-500 text-sm">
                  NID must be 11 character{" "}
                </p>
              )}
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-3 ">
            {/* Your address  */}
            <div className=" gap-3">
              <label>Your present address</label>
              <input
                {...register("riderAddress", { required: true })}
                type="text"
                placeholder="Present address"
                className="input input-bordered w-full"
              />
              {errors.riderAddress?.type === "required" && (
                <p className="text-red-500 text-sm">Address field is required</p>
              )}
            </div>
            {/* Rider er district */}
            <div>
              <div>
                <label>Your District</label>
                <select
                  {...register("riderDistrict", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value={""}>Select your district</option>
                  {findDistrictByRegion(riderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.riderDistrict?.type === "required" && (
                  <p className="text-red-500 text-sm">
                    This field is required{" "}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn w-full bg-lime-300">
            Apply as a rider
          </button>
        </div>

        {/* Right Side Image */}
        <div className="flex   order-1 md:order-2 justify-center">
          <img
            src={img}
            alt="delivery rider"
            className="max-w-xs md:max-w-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default Rider;
