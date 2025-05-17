import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";

const UpdateCoffee = () => {
  const { _id, name, price, Supplier, taste, Category, Details, photo } =
    useLoaderData();

  // console.log(name);
  const handleUpdateCoffee = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const UpdateCoffee = Object.fromEntries(formData.entries());
    // console.log(UpdateCoffee);

    fetch(`http://localhost:5000/coffees/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(UpdateCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="w-11/12 mx-auto ">
      <h3 className="text-5xl text-center my-5">Update Coffee</h3>
      <form
        onSubmit={handleUpdateCoffee}
        className="bg-[#F4F3F0] py-6 px-4 rounded-2xl"
      >
        <div className="grid grid-cols-2 gap-5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-xl">Name</legend>
            <input
              type="text"
              name="name"
              defaultValue={name}
              className="input w-full"
              placeholder="Enter Coffee Name "
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-xl">Price</legend>
            <input
              type="text"
              name="price"
              defaultValue={price}
              className="input w-full"
              placeholder="Enter Price"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-xl">Supplier</legend>
            <input
              type="text"
              name="Supplier"
              defaultValue={Supplier}
              className="input w-full"
              placeholder="Enter Supplier Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-xl">Taste</legend>
            <input
              type="text"
              name="taste"
              defaultValue={taste}
              className="input w-full"
              placeholder="Taste"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-xl">Category</legend>
            <input
              type="text"
              name="Category"
              defaultValue={Category}
              className="input w-full"
              placeholder="Enter Category"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-xl">Details</legend>
            <input
              type="text"
              name="Details"
              defaultValue={Details}
              className="input w-full"
              placeholder="Enter Details"
            />
          </fieldset>
        </div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-xl">Photo</legend>
          <input
            type="text"
            name="photo"
            defaultValue={photo}
            className="input w-full"
            placeholder="photo"
          />
        </fieldset>
        <input
          type="submit"
          className="btn w-full mt-2"
          value="Update Coffee"
        />
      </form>
    </div>
  );
};

export default UpdateCoffee;
