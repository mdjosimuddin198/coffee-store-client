import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { data, Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";

const hero = () => {
  const initialCoffees = useLoaderData();
  console.log(initialCoffees);
  const [coffees, setCoffees] = useState(initialCoffees);

  const handleDelete = (id) => {
    console.log("item delete", id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coffees/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }

            const reamainingCoffee = coffees.filter((cof) => cof._id !== id);
            setCoffees(reamainingCoffee);
          });
      }
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4   mt-4">
      {coffees.map((coffee) => (
        <div
          key={coffee._id}
          className="card card-side   items-center bg-base-100 shadow-sm"
        >
          <figure>
            <img className="" src={coffee.photo} alt="Movie" />
          </figure>
          <div className="flex justify-around mt-4 w-full ">
            <div>
              <h2 className="card-title"> Name : {coffee.name}</h2>
              <h2 className=""> Price : ${coffee.price}</h2>
              <p>Supplier : {coffee.Supplier} </p>
            </div>
            <div className="card-actions justify-end">
              <div className="join join-vertical text-xl  space-y-2">
                <button className="btn join-item">
                  <MdOutlineRemoveRedEye />
                </button>
                <Link to={`/coffee/${coffee._id}`} className="btn join-item">
                  <CiEdit />
                </Link>
                <button
                  onClick={() => handleDelete(coffee._id)}
                  className="btn join-item"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default hero;
