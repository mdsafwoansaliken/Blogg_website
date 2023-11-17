import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import Comment from "../components/Comment"

const PostDetails = () => {
  return (
    <div>
        <Navbar/>
        <div className="px-8 px-[200px] mt-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black md:text-3xl">10 Uses of Artifical Intelligence in Day to Day Life</h1>
                <div className="flex items-center justify-center space-x-2">
                    <p><BiEdit/></p>
                    <p><MdDelete/></p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@blogg_app</p>
            <div className="flex space-x-2">
              <p>11/16/2023</p>
              <p>16:45</p>
            </div>
            </div>
            <img src="https://source.unsplash.com/random/200x200?sig=1" className=" mx-auto mt-8" alt=""/>
            <p className="mx-auto mt-8">Artificial Intelligence (AI) has seamlessly integrated into our daily routines, revolutionizing the way we live, work, and 
            interact with technology. From subtle conveniences to significant advancements, AI's pervasive influence is evident across 
            various aspects of our day-to-day lives. Its adaptive algorithms and problem-solving capabilities have ushered in a new era,
            shaping experiences and optimizing efficiency in numerous domains, fundamentally altering how we navigatethe modern world.
            </p>
            <div className="flex items-center mt-8 space-x-4 font-semibold">
                <p>Categories:</p>
                <div className="flex justify-center items-center space-x-2">
                    <div className="bg-gray-300 rounded-lg px-3 py-1">
                        Tech
                    </div>
                    <div className="bg-gray-300 rounded-lg px-3 py-1">
                        Ai
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-4">
                <h3 className="mt-6 mb-4 font-semibold">Comments</h3>
                <Comment/>
                <Comment/>
            </div>
            {/* write a comment */}
            <div className="w-full flex flex-col mt-4 md:flex-row">
                <input type='text' placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"/>
                <button className="bg-black text-sm text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default PostDetails
