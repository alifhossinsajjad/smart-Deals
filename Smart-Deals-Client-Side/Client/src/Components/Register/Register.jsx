import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const { createUser, setProfile, signInWithGoole } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {
      toast.error(
        "Password must include uppercase, lowercase, number, and special character."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("Account created successfully!");
        console.log("it is user", user);

        setProfile({ displayName: name, photoURL: photo })
          .then(() => {
            // setUser({ ...user, displayName: name, photoURL: photo });

            const newUser = { name, email, image: photo };
            console.log("new user 2", newUser);

            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
              });

            form.reset();
            navigate("/");
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("User already exists!");
        } else {
          toast.error(error.message);
        }
      });
  };

  const handlegoogleSignIn = () => {
    signInWithGoole()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Register Now!</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Already have an account?{" "}
          <Link
            to={"/auth/login"}
            className="text-purple-600 font-semibold hover:underline"
          >
            Login Now
          </Link>
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="text"
            name="photo"
            placeholder="Image-URL"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaRegEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-xl text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90 transition-all"
          >
            Register
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-gray-500 text-sm">OR</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handlegoogleSignIn}
          className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Sign Up With Google</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
