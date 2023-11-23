import axios from "axios";
import { URL } from "../url";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
//import { UserContext } from "../context/UserContext";
import { useUser } from "../context/UserContext";

const Comment = ({ c, postUpdateComment, postDeleteComment }) => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(c.comment);

  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, { withCredentials: true });
      postDeleteComment(id);
    } catch (err) {
      console.log(err);
    }
  };

  const editComment = async (id) => {
    try {
      const response = await axios.put(
        URL + "/api/comments/" + id,
        { comment: editedComment },
        { withCredentials: true }
      );

      if (response.status === 200) {
        postUpdateComment(id, editedComment);
        setIsEditing(false);
        setEditedComment("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-4 py-3 bg-gray-100 rounded-lg my-3 border border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c.author}</h3>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <p>{new Date(c.updatedAt).toDateString()}</p>
          {user?._id === c?.userId && (
            isEditing ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  className="border-b border-gray-400 focus:outline-none"
                />
                <button
                  onClick={() => editComment(c._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 focus:outline-none"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-red-500 hover:text-red-600 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <p
                  className="cursor-pointer text-gray-400 hover:text-blue-500"
                  onClick={() => setIsEditing(true)}
                >
                  <BiEdit />
                </p>
                <p
                  className="cursor-pointer text-gray-400 hover:text-red-500"
                  onClick={() => deleteComment(c._id)}
                >
                  <MdDelete />
                </p>
              </div>
            )
          )}
        </div>
      </div>
      <p className="mt-2">
        {isEditing ? (
          "Editing..."
        ) : (
          <span className="text-gray-700">{c.comment}</span>
        )}
      </p>
    </div>
  );
};

export default Comment;