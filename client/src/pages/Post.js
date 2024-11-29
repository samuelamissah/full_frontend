import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  let { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://127.0.0.1:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });

    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [id]);

  const addComment = () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      alert("You must be logged in to post a comment");
      return;
    }

    axios.post("http://localhost:3001/comments", {
      commentBody: newComment,
      PostId: id,
    },
    { 
        headers: 
        { accessToken: token

         } 
        }
    )
      .then((response) => {
        const commentToAdd = { commentBody: newComment, userName: response.data.userName, createdAt: new Date()};
        setComments([...comments, commentToAdd]);
        // add comment username

        setNewComment("");
      });
  };

  return (
    <div 
        style={{
            backgroundImage:  `url('/kss.jpg')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}
        className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-screen-lg p-4">
        <h1 className="text-3xl font-bold  text-center text-blue-500">Post Details</h1>
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center">
          <div className="md:w-2/3">
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-2xl font-bold mb-4">{postObject.title}</h2>
              <p className="mb-2">{postObject.postText}</p>
              <p className="text-gray-500">Posted by {postObject.userName}</p>
              <p className="text-gray-500">Created at {new Date(postObject.createdAt).toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded shadow-md mt-4 max-h-80 overflow-y-auto">
  <h3 className="text-xl font-bold mb-4">Comments</h3>
  <table className="w-full">
    <tbody>
      {comments.map((comment, key) => (
        <tr key={key}>
          <td className="border px-4 py-2">
            <div className="flex justify-between items-center gap-3">
              <span>{comment.commentBody}</span>
              <span className="text-gray-500 text-sm italic">
                Created by: <span className="text-red-700 mx-2">{comment.userName}</span>
              </span>
              <span className="text-gray-500 text-sm italic">
                Created at: <span className='text-red-800 text-md'> {new Date(comment.createdAt).toLocaleString()}</span>
              </span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </div>
          <div className="md:w-1/3 mt-4 md:mt-0">
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-bold mb-4">Add a Comment</h3>
              {isLoggedIn ? (
                <>
                  <input
                    type="text"
                    placeholder="Comment..."
                    autoComplete="off"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <button
                    type="submit"
                    onClick={addComment}
                    className="w-full bg-blue-500 text-white py-2 rounded"
                  >
                    Add Comment
                  </button>
                </>
              ) : (
                <p className="text-red-500">You must be logged in to add a comment</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
