import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import {URL} from '../url'
import axios from 'axios'

const Register = () => {

    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const navigate=useNavigate()

    const handleRegister=async ()=>{
        try{
          const res=await axios.post(URL+"/api/auth/register",{username,email,password})
            setUsername(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)
            setError(false)
            navigate("/login")
        }
        catch(err){
          setError(true)
            console.log(err)
        }
    }

    return (
      <>
          <div className="flex items-center justify-between px-6 md:px-20 py-8 bg-blue-500">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white"><Link to="/" className="text-white">Blog Market</Link></h1>
              <h3><Link to="/login" className="text-white font-semibold hover:underline">Login</Link></h3>
          </div>
          <div className="flex justify-center items-center h-[80vh] bg-gray-100">
              <div className="bg-white shadow-lg rounded-lg p-8 w-[80%] md:w-[25%]">
                  <h1 className="text-3xl font-bold text-blue-500 mb-6">Create an Account</h1>
                  <input
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      type="text"
                      placeholder="Enter your username"
                  />
                  <input
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      type="email"
                      placeholder="Enter your email"
                  />
                  <input
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      type="password"
                      placeholder="Enter your password"
                  />
                  <button
                      onClick={handleRegister}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                  >
                      Register
                  </button>
                  {error && <p className="text-red-500 text-sm mt-4">Something went wrong</p>}
                  <div className="flex justify-center items-center space-x-1 mt-4 text-gray-600">
                      <p>Already have an account?</p>
                      <p><Link to="/login" className="text-blue-500 font-semibold hover:underline">Login</Link></p>
                  </div>
              </div>
          </div>
          <Footer />
      </>
  );
};

export default Register;