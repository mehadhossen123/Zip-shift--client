import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleParcelSubmit = (data) => {
    console.log("handle parcel is clicked", data);
  };

  return (
    <div className="my-10 w-full">
      <h1 className="text-5xl">Add a parcel</h1>

      <form
        onSubmit={handleSubmit(handleParcelSubmit)}
        className="my-14 p-4 w-full"
      >
        <h1 className="mb-10 font-bold text-3xl">Enter Your Parcel Details</h1>

        {/* document type */}
        <div className="flex gap-5">
          <label className="label cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              value="document"
              {...register("parcelType")}
              className="radio radio-xs"
              defaultChecked
            />
            <span>Document</span>
          </label>

          <label className="label cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              value="non-document"
              {...register("parcelType")}
              className="radio radio-xs"
            />
            <span>Non-Document</span>
          </label>
        </div>

        {/* parcel info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8 items-center">
          <div>
            <label className="label">Parcel name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel name"
            />
          </div>

          <div>
            <label className="label">Parcel weight</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel weight (kg)"
            />
          </div>
        </div>

        {/* sender and receiver details */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
          {/* Sender Details */}
          <div>
            <h2 className="text-xl font-bold mb-5 text-[#0B7373]">
              Sender Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label">Sender Name</label>
                <input
                  className="input w-full"
                  {...register("senderName")}
                  placeholder="Sender Name"
                />
              </div>

              <div>
                <label className="label">Sender Contact No</label>
                <input
                type="number"
                  {...register("senderNumber")}
                  className="input w-full"
                  placeholder="Sender Contact No"
                />
              </div>
              <div className="col-span-2">
                <label className="label">Address</label>
                <input
                  {...register("senderAddress")}
                  className="input w-full "
                  placeholder="Address"
                />
              </div>

              <div className="col-span-2">
                <label className="label">Sender District</label>
                <input
                  {...register("senderDistrict")}
                  className="input w-full "
                  placeholder="Address"
                />
              </div>

              <div className="col-span-2">
                <label className="label">Pickup Instruction</label>
                <textarea
                  {...register("senderInstruction")}
                  className="textarea w-full"
                  placeholder="Pickup Instruction"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Receiver Details */}
          <div>
            <h2 className="text-xl font-bold mb-5 text-[#0B7373]">
              Receiver Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label">Receiver Name</label>
                <input
                  className="input w-full"
                  {...register("receiverName")}
                  placeholder="Receiver Name"
                />
              </div>
              <div>
                <label className="label">Receiver Contact No</label>
                <input
                type="number"
                  {...register("receiverNumber")}
                  className="input w-full"
                  placeholder="Receiver Contact No"
                />
              </div>

              <div className="col-span-2">
                <label className="label">Receiver Address</label>
                <input
                  className="input w-full"
                  {...register("receiverAddress")}
                  placeholder="Address"
                />
              </div>

              <div className="col-span-2">
                <label className="label">Receiver District</label>
                <input
                  {...register("receiverDistrict")}
                  className="input w-full "
                  placeholder="Address"
                />
              </div>

              <div className="col-span-2">
                <label className="label">Delivery Instruction</label>
                <textarea
                  {...register("receiverInstruction")}
                  className="textarea w-full"
                  placeholder="Delivery Instruction"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* submit button */}
        <div className="mt-10">
          <button className="btn btn-success" type="submit">
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
