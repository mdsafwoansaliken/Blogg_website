// CreatePost.jsx
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
  const [error, setError] = useState(null);

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
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

    if (selectedFile && !isImage(selectedFile.type)) {
      setError("Image file only");
    } else {
      setError(null);
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      setFile({
        file: selectedFile,
        preview: reader.result,
      });
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (file && !isImage(file.file.type)) {
      setError("Image file only");
      return;
    }

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
        await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
        setError("Error uploading image");
      }
    }

    try {
      const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      setError("Error creating post");
    }
  };

  const isImage = (fileType) => {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    return allowedImageTypes.includes(fileType);
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-4xl text-2xl mt-8 mb-6">Create a Post</h1>
        <form className="w-full flex flex-col space-y-6 md:space-y-8 mt-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-3 rounded-md outline-none bg-purple-50 text-purple-700 focus:ring-2 focus:ring-purple-400"
          />
          <input
            onChange={handleFileChange}
            type="file"
            className="px-4 py-3 rounded-md outline-none bg-purple-50 text-purple-700 focus:ring-2 focus:ring-purple-400"
          />
          {error && (
            <div className="text-red-500 font-bold mt-2">
              {error}
            </div>
          )}
          {/* Image Preview */}
          {file && (
            <img
              src={file.preview}
              alt="Selected Image Preview"
              className="max-w-[300px] max-h-[200px] mb-4"
            />
          )}
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
            rows={8}
            className="px-4 py-3 rounded-md outline-none bg-purple-50 text-purple-700 focus:ring-2 focus:ring-purple-400"
            placeholder="Enter post description"
          />
          <button
            onClick={handleCreate}
            className="bg-purple-700 hover:bg-purple-800 w-full md:w-[20%] mx-auto text-white font-semibold px-6 py-3 md:text-xl text-lg rounded-md shadow-md"
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
