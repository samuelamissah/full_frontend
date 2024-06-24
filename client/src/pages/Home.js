import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
  
  
  axios.get("http://127.0.0.1:3001/posts").then((response)=>{
  
   setListOfPosts(response.data);
  });
  }, []);

  return (
    <div className='App'>
      <h1 style={{
        textAlign: 'center'
      
      }}>Random Texts Messages / Post </h1>
      <div className='posts-container'>
      {listOfPosts.map((value) => {
        return (
          <div className='post' onClick={()=> {navigate(`/post/${value.id}`)}}> 
            <div className='title'>{value.title}</div>
            <div className='body'>{value.postText}</div>
            <div className='footer'>{value.userName}</div>
          </div>
        );
      })}
    </div>
    </div>
  )
}

export default Home
