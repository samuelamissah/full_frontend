import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {


  return (
    <div className="App">
      <Router>
      <div className="navbar fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-10">
        <div className="container mx-auto flex justify-between">
            <a href="/home" className="text-blue-500 hover:text-blue-700">Home</a>
            <a href="/Createpost" className="text-blue-500 hover:text-blue-700">Create A Post</a>
        </div>
    </div>
        <Routes>
          <Route path='/' element={< Login />} />
          <Route path='/home'  element={< Home />} />
          <Route path='/createpost' element={< CreatePost />} />
          <Route path='/post/:id' element={< Post />} />
          <Route path='/registration' element={< Registration />} />
      
        </Routes>
      </Router>
      
    </div>

  );
}

export default App;
