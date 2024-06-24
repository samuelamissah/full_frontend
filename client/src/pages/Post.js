import React, { useState } from 'react'
import {  useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Post() {
    let {id} = useParams();
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

    } , [id]);

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
    <div className='postPage'>
    <div className='leftSide'>
    <div className='post'  id='individual'>
    <div className='title'>{postObject.title}</div>
    <div className='body'>{postObject.postText}</div>
    <div className='footer'>{postObject.userName}</div>
    </div>
    </div>
    <div className='rightSide'> 
        <div className='addCommentContainer'>
            <input type='text' placeholder='Comment...' autoComplete='off'
            value={newComment}
            onChange={(event) => {
                setNewComment(event.target.value);
              }}
            />
            <button 
             type='submit'
                onClick={addComment}    
            > Add Comment</button>
        </div>
        <div className='listOfComments'>
            {comments.map((comment, key)=>{
            return <div key={key} className='comment'> 
        {comment.commentBody}
            </div>
            })}
        </div>
    </div>
    </div>
  )
}

export default Post
