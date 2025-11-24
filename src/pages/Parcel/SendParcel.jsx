import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

   const axiosSecure=useAxiosSecure();
   const {user}=useAuth()


  const services = useLoaderData();
  const senderRegion =useWatch({control,name:"senderRegion"})
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const duplicateRegion = services.map((re) => re.region);
  const regions = [...new Set(duplicateRegion)];
  
// find district by region
const districtByRegion=(region)=>{
    const districtOrigin=services.filter(r=>r.region===region)
     const district=districtOrigin.map(r=>r.district)
     return district;
}




  const handleParcelSubmit = (data) => {
    console.log("handle parcel is clicked", data);
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
      
        let cost =0;
        const isDocument = data.parcelType==="document"

        if(isDocument){
            cost=isSameDistrict? 60:80;

        }
        else{
            const weight = data.parcelWeight;
            if(weight <=3){
                cost =isSameDistrict? 110:150;
            }
            else{
                const minCharge=isSameDistrict?110:150;
                const extraWeight=data.parcelWeight-3;
                const extraCharge=isSameDistrict?extraWeight*40:extraWeight*40+40;
                cost=minCharge+extraCharge;
            }

        }

        console.log("total cost ",cost)
        data.cost=cost;

        Swal.fire({
          title: "Are you agree ?",
          text:`You have to pay ${cost} taka`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!",
        }).then((result) => {
          if (result.isConfirmed) {


          //post parcel info into database .
          axiosSecure.post("/parcels",data).then(res=>{
            console.log("after saving the data ",res.data)
          })
           
             

            Swal.fire({
              title: "Cancel",
              text: "Your parcel has been added.",
              icon: "success",
            });
          }
        });


    

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
            {/* sender name */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label">Sender Name</label>
                <input
                defaultValue={user?.displayName}
                  className="input w-full"
                  {...register("senderName")}
                  placeholder="Sender Name"
                />
              </div>
              {/* sender email */}

              <div>
                <label className="label">Sender email</label>
                <input
                defaultValue={user?.email}
                  type="email"
                  className="input w-full"
                  {...register("senderEmail")}
                  placeholder="Sender email"
                />
              </div>
              {/* sender contact number  */}

              <div className="">
                <label className="label">Sender Contact No</label>
                <input
                  type="number"
                  {...register("senderNumber")}
                  className="input w-full"
                  placeholder="Sender Contact No"
                />
              </div>
              {/* sender origin  */}

              <div className="">
                <label className="label">Sender Origin</label>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick your region"
                  className="select"
                >
                  <option disabled>Pick your region</option>
                  {regions.map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* sender address  */}
              <div className="col-span-2">
                <label className="label">Address</label>
                <input
                  {...register("senderAddress")}
                  className="input w-full "
                  placeholder="Address"
                />
              </div>
              {/* sender district */}
              <div className="">
                <label className="label">Sender District</label>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a region"
                  className="select"
                >
                  <option disabled={true}>Pick a browser</option>
                  {districtByRegion(senderRegion).map((r, i) => (
                    <option value={r} key={i.id}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* sender instruction */}

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
              {/* receiver name */}
              <div>
                <label className="label">Receiver Name</label>
                <input
                  className="input w-full"
                  {...register("receiverName")}
                  placeholder="Receiver Name"
                />
              </div>
              {/* receiver email */}

              <div>
                <label className="label">Receiver email</label>
                <input
                  type="email"
                  className="input w-full"
                  {...register("receiverEmail")}
                  placeholder="Receiver email"
                />
              </div>
              {/* receiver contact number */}
              <div className="">
                <label className="label">Receiver Contact No</label>
                <input
                  type="number"
                  {...register("receiverNumber")}
                  className="input w-full"
                  placeholder="Receiver Contact No"
                />
              </div>
              {/* Receiver origin */}

              <div className="">
                <label className="label"> Receiver origin</label>
                <select
                  {...register("receiverRegion")}
                  defaultValue="Pick your region"
                  className="select"
                >
                  <option disabled>Pick your region</option>
                  {regions.map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* receiver address */}

              <div className="col-span-2">
                <label className="label">Receiver Address</label>
                <input
                  type="text"
                  className="input w-full"
                  {...register("receiverAddress")}
                  placeholder="Address"
                />
              </div>
              {/* receiver district */}

              <div className="">
                <label className="label"> Receiver district</label>
                <select
                  {...register("receiverDistrict")}
                  defaultValue="Pick your region"
                  className="select"
                >
                  <option disabled>Pick your district</option>
                  {districtByRegion(receiverRegion).map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {/* receiver  instruction */}

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
