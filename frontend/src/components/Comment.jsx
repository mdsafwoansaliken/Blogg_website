import axios from "axios";
import { URL } from "../url";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c, post, postUpdateComment, postDeleteComment }) => {
  const { user } = useContext(UserContext);
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

      // Check if the update was successful
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
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text gray-600">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
          {user?._id === c?.userId ? (
            isEditing ? (
              <div className="flex items-center justify-center space-x-2">
                <input
                  type="text"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <button onClick={() => editComment(c._id)}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <p onClick={() => setIsEditing(true)}><BiEdit /></p>
                <p className="cursor-pointer" onClick={() => deleteComment(c._id)}>
                  <MdDelete />
                </p>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{isEditing ? "Editing..." : c.comment}</p>
    </div>
  );
};

export default Comment;
