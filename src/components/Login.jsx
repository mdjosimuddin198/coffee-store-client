import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const { signUser } = useContext(AuthContext);
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({ email, password });

    signUser(email, password)
      .then((result) => {
        // console.log(result);
        console.log("log in successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="card bg-base-100 mx-auto my-5 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <form onSubmit={handleSignIn} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
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
                Don't Have an Accoutn
                <Link to="/auth/register" className="text-blue-500 ">
                  {" "}
                  Register Now{" "}
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

export default Login;
