import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useUser } from "../context/UserContext"

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const {setUser}=useUser();
  const navigate=useNavigate()
  const { updateUser } = useUser();

  const handleLogin = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true });
      // Assuming res.data contains user information
      updateUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-20 py-8 bg-blue-800">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          <Link to="/" className="text-white">
            TRENDIFY
          </Link>
        </h1>
        <h3>
          <Link to="/register" className="text-white font-semibold hover:underline">
            Register
          </Link>
        </h3>
      </div>
      <div className="flex justify-center items-center h-[80vh] bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-[80%] md:w-[25%]">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Log in to your account</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-800"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-800"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-500 focus:outline-none"
          >
            Log in
          </button>
          <Link to="/forgotPassword">
          <button className="w-full my-4 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-500 focus:outline-none">
            Forgot Password
          </button>
          </Link>
          {error && <p className="text-red-500 text-sm mt-4">Something went wrong</p>}
          <div className="flex justify-center items-center space-x-1 mt-4 text-gray-600">
            <p>New here?</p>
            <p>
              <Link to="/register" className="text-blue-800 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;