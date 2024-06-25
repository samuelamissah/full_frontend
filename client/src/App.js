import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <Router>
        <div className="navbar fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-10">
          <div className="container mx-auto flex justify-between">
            {isAuthenticated ? (
              <>
                <a href="/home" className="text-blue-500 hover:text-blue-700">Home</a>
                <a href="/createpost" className="text-blue-500 hover:text-blue-700">Create A Post</a>
              </>
            ) : null}
          </div>
        </div>
        <Routes>
          <Route path='/' element={<Login onLogin={handleLogin} />} />
          <Route path='/home' element={isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />} />
          <Route path='/createpost' element={isAuthenticated ? <CreatePost /> : <Login onLogin={handleLogin} />} />
          <Route path='/post/:id' element={isAuthenticated ? <Post /> : <Login onLogin={handleLogin} />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
