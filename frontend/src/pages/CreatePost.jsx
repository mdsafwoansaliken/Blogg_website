import { useContext, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import { useUser } from "../context/UserContext";
import { URL } from "../url";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useUser();
  const [cat, setCat] = useState('');
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat('');
    setCats(updatedCats);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Create a FileReader
    const reader = new FileReader();

    // Set a callback for when the file is loaded
    reader.onloadend = () => {
      // Set the file and preview
      setFile({
        file: selectedFile,
        preview: reader.result,
      });
    };

    // Read the file as a data URL, triggering the callback
    reader.readAsDataURL(selectedFile);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.file.name;
      data.append("img", filename);
      data.append("file", file.file);
      post.photo = filename;

      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-4xl text-2xl mt-8 mb-6">Create a Post</h1>
        <form className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-md p-8">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          <input
            onChange={handleFileChange}
            type="file"
            className="w-full mb-4"
          />
          {/* Image Preview */}
          {file && (
            <img
              src={file.preview}
              alt="Selected Image Preview"
              className="max-w-[300px] max-h-[200px] mb-4"
            />
          )}
          <div className="flex items-center mb-4">
            <input
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Enter post category"
              type="text"
            />
            <div
              onClick={addCategory}
              className="ml-4 bg-black text-white px-4 py-2 font-semibold rounded cursor-pointer"
            >
              ADD
            </div>
          </div>
          <div className="flex flex-wrap mb-4">
            {cats?.map((c, i) => (
              <div
                key={i}
                className="flex justify-center items-center space-x-2 bg-gray-200 px-2 py-1 rounded-md mr-4 mb-2"
              >
                <p>{c}</p>
                <p
                  onClick={() => deleteCategory(i)}
                  className="text-white bg-red-500 rounded-full cursor-pointer p-1 text-sm"
                >
                  <ImCross />
                </p>
              </div>
            ))}
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={8}
            className="w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="Enter post description"
          />
          <button
            onClick={handleCreate}
            className="w-full bg-indigo-500 text-white font-semibold py-2 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
