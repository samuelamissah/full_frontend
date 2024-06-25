import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  let { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://127.0.0.1:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios.post("http://localhost:3001/comments", {
      commentBody: newComment,
      PostId: id,
    })
      .then((response) => {
        const commentToAdd = { commentBody: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment("");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen-lg p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Post Details</h1>
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center">
          <div className="md:w-2/3">
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-2xl font-bold mb-4">{postObject.title}</h2>
              <p className="mb-2">{postObject.postText}</p>
              <p className="text-gray-500">Posted by {postObject.userName}</p>
            </div>
            <div className="bg-white p-4 rounded shadow-md mt-4 max-h-80 overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Comments</h3>
              <table className="w-full">
                <tbody>
                  {comments.map((comment, key) => (
                    <tr key={key}>
                      <td className="border px-4 py-2">{comment.commentBody}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/3 mt-4 md:mt-0">
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-bold mb-4">Add a Comment</h3>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
