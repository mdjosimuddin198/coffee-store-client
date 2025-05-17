import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "./AuthProvider";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const handleCreateUser = (e) => {
    e.preventDefault();
    const form = e.target;
    // const email = form.email.value;
    // const password = form.password.value;
    // console.log({ email, password });

    const formData = new FormData(form);
    const { email, password, ...user } = Object.fromEntries(formData.entries());
    // console.log(user);

    // const userProfile = {
    //   email,
    //   ...user,
    // };

    //  store  data to db

    createUser(email, password)
      .then((result) => {
        // console.log(result.user);
        const userProfile = {
          email,
          ...user,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };
        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="card bg-base-100 mx-auto my-5 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <form onSubmit={handleCreateUser} className="fieldset">
            <label className="label">Name</label>
            <input
              type="Name"
              name="name"
              className="input"
              placeholder="Name"
            />
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Number</label>
            <input
              type="number"
              name="number"
              className="input"
              placeholder="Number"
            />
            <label className="label">Photo</label>
            <input
              type="text"
              name="photo"
              className="input"
              placeholder="Photo Url"
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />
            <div>
              <p className="text-sm">
                Allready Have an Accoutn
                <Link to="/auth/login" className="text-blue-500 ">
                  {" "}
                  Login Now{" "}
                </Link>
              </p>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
