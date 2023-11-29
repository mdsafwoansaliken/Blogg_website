import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {ImCross} from "react-icons/im"
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { useUser } from "../context/UserContext"


const EditPost = () => {
    const postId = useParams().id
    const {user} = useUser();
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const [cat,setCat]=useState('')
    const [cats,setCats]=useState([])

    const fetchPost = async() =>{
        try{
            const res = await axios.get(URL+"/api/posts/"+postId)
            setTitle(res.data.title)
            setFile(res.data.photo)
            setDesc(res.data.desc)
            setCats(res.data.categories)
        }
        catch(err){
            console.log(err)
        }
    }

    const handleUpdate = async (e)=>{
        e.preventDefault()
        const post = {
          title,
          desc,
          username: user.username,
          userId: user._id,
          categories: cats
        }
  
        if(file){
          const data = new FormData()
          const filename = Date.now() + file.name
          data.append("img", filename)
          data.append("file", file)
          post.photo = filename
  
          try{
            const imgUpload = await axios.post(URL+"/api/upload", data)
            
          }
          catch(err){
            console.log(err)
          }
        }
        try{
          const res = await axios.put(URL+"/api/posts/"+postId, post, {withCredentials:true})
          navigate("/posts/post/"+res.data._id)
        }
        catch(err){
          
        }
  
    }

    useEffect(()=>{
        fetchPost()
    },[postId])

    const deleteCategory=(i)=> {
        let updatedCats=[...cats]
        updatedCats.splice(i)
        setCats(updatedCats)
    }

    const addCategory = () => {
      if (cat.trim() !== "") {
          let updatedCats = [...cats];
          updatedCats.push(cat);
          setCat('');
          setCats(updatedCats);
      }
  }
  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-4xl text-2xl mt-8 text-purple-700">Update a post</h1>
        <form className="w-full flex flex-col space-y-6 md:space-y-8 mt-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type='text'
            placeholder="Enter post title"
            className="px-4 py-3 rounded-md outline-none bg-purple-50 text-purple-700 focus:ring-2 focus:ring-purple-400"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type='file'
            className="px-4 py-3 rounded-md outline-none bg-purple-50 text-purple-700 focus:ring-2 focus:ring-purple-400"
          />
          {/* Category input and display */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-3 rounded-md outline-none bg-purple-50 text-purple-700 focus:ring-2 focus:ring-purple-400"
                placeholder="Enter post category"
                type="text"
              />
              <div onClick={addCategory} className="bg-purple-700 text-white px-4 py-3 font-semibold cursor-pointer rounded-md shadow-md hover:bg-purple-800">
                ADD
              </div>
            </div>
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-purple-200 px-2 py-1 rounded-md">
                  <p className="text-purple-700">{c}</p>
                  <p onClick={() => deleteCategory(i)} className="text-white bg-purple-700 rounded-full cursor-pointer p-1 text-sm"><ImCross /></p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows={15}
            cols={30}
            className="px-4 py-3 rounded-md outline-none bg-purple-50 text-purple-700 focus:ring-2 focus:ring-purple-400"
            placeholder="Enter post description"
          />
          <button
            onClick={handleUpdate}
            className="bg-purple-700 hover:bg-purple-800 w-full md:w-[20%] mx-auto text-white font-semibold px-6 py-3 md:text-xl text-lg rounded-md shadow-md"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default EditPost