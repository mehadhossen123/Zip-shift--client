import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  //handle submit function is here
  const handleParcelSubmit = (data) => {
    console.log("handle parcel is clicked",data);
  };

  return (
    <div className="my-10">
      <h1 className="text-5xl">Add a parcel</h1>

      <form onSubmit={handleSubmit(handleParcelSubmit)} className="my-14 p-4 ">
        <h1 className="mb-10 font-bold text-3xl">Enter Your Parcel Details</h1>
        {/* document type */}
        <div className="gap-5">
          <label className="label mr-4">
            <input
              type="radio"
              value="document"
              {...register("parcelType")}
              className="radio radio-xs"
              defaultChecked
            />
            Document
          </label>

          <label className="label">
            <input
              type="radio"
              value="non-document"
              {...register("parcelType")}
              className="radio radio-xs"
            />
            Non-Document
          </label>
        </div>
        {/* parcel info: name and weight */}

        <div>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" />
            
          </fieldset>
        </div>

        {/* submit button */}
        <div>
          <button className="btn btn-success" type="submit">
            Success
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
