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
    <div className="min-h-screen bg-gray-50 py-8 px-4 overflow-x-hidden">
    <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
      Random Texts Messages / Post
    </h1>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listOfPosts.map((value) => (
        <div
          key={value.id}
          onClick={() => navigate(`/post/${value.id}`)}
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300"
        >
          <div className="text-xl font-bold mb-2">{value.title}</div>
          <div className="text-gray-700 mb-4">{value.postText}</div>
          <div className="text-gray-500 text-sm">{value.userName}</div>
        </div>
      ))}
    </div>
  </div>
  

  )
}

export default Home
