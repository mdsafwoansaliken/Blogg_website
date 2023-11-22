import Navbar from "../components/Navbar"
import ProfilePosts from "../components/ProfilePosts"
import Footer from "../components/Footer"
import { useContext, useEffect, useState } from "react"
import { IF, URL } from "../url"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"


const Profile = () => {
  const param = useParams().id
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const {user,setUser} = useContext(UserContext)
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const [updated, setUpdated] = useState(false)

  const fetchProfile = async () =>{
    try{
      const res = await axios.get(URL+"/api/users/"+user._id)
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleUserUpdate = async()=>{
    setUpdated(false)
    try{
      const res = await axios.put(URL+"/api/users/"+user._id, {username,email,password}, {withCredentials:true})
      setUpdated(true)

    }
    catch(err){
      console.log(err)
      setUpdated(false)
    }

  }

  const handleUserDelete = async ()=>{
    try{
      const res = await axios.delete(URL+"/api/users/"+user._id, {withCredentials:true})
      setUser(null)
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
  }

  const fetchUserPosts = async()=>{
    try{
      const res = await axios.get(URL+"/api/posts/user/"+user._id)
      setPosts(res.data)
    }catch(err){
      console.log(err)
    }
  }


  useEffect(()=>{
    fetchProfile()
  },[param])

  useEffect(()=>{
    fetchUserPosts()
  }, [param])

  return (
<div>
  <Navbar />
  <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
    <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
      <h1 className="text-xl font-bold mb-4">Your Posts: </h1>
      {posts?.map((p) => (
        <ProfilePosts key={p._id} p={p} />
      ))}
    </div>
    <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
      <div className="flex flex-col space-y-4 items-start">
        <h1 className="text-xl font-bold mb-4">Profile</h1>
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-gray-600">
            Your Name
          </label>
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="outline-none px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your name"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-gray-600">
            Your Email
          </label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="outline-none px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
            type="email"
          />
        </div>
        <div className="flex items-center space-x-4 mt-8">
          <button
            onClick={handleUserUpdate}
            className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Update
          </button>
          <button
            onClick={handleUserDelete}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Delete
          </button>
        </div>
        {updated && (
          <h3 className="text-green-500 text-sm text-center mt-4">
            User details updated successfully
          </h3>
        )}
      </div>
    </div>
  </div>
  <Footer />
</div>
  )
}

export default Profile
