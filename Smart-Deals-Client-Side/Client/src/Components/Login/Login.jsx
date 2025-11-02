import React, { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/Firebsae.config";
import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

const Login = () => {
  const { signInUser, signInWithGoole } = use(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();

  const [error, setError] = useState("");

  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  const hanleLogIn = (event) => {
    event.preventDefault();

    const email = event.target.email?.value;
    const password = event.target.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("LogIn successful");
        // navigate (`${location.state ? location.state : '/'}`);
        navigate(location?.state || "/");

        event.target.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error);
        // toast.error('invalid yor email or password')

        setError(errorCode);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please provide your email address to reset password");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("password reset");
        toast.success("Password reset email sent. Please check your email.");
      })
      .catch((error) => {
        console.log(error);
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

  const handleShowPassord = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Login Now!</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Already have an account?{" "}
          <Link
            to={"/auth/register"}
            className="text-purple-600 font-semibold hover:underline"
          >
            Login Now
          </Link>
        </p>

        <form onSubmit={hanleLogIn} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
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
              onClick={() => handleShowPassord(!showPassword)}
              className="absolute right-4 top-3.5 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaRegEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-xl text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90 transition-all"
          >
            Log In
          </button>
        </form>

        <div className="mt-3">
          <button
            type="button"
            onClick={handleForgetPassword}
            className="text-green-600 hover:underline text-sm font-medium"
          >
            Forgot Password?
          </button>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-gray-500 text-sm">OR</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handlegoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <FcGoogle size={35} />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
