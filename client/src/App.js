// App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';

function Navbar({ isAuthenticated, onLogout }) {
  const location = useLocation();

  // Check if the current path is either login or registration
  const isAuthPage = location.pathname === '/' || location.pathname === '/registration';

  return (
    <div className="navbar fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          {!isAuthPage && isAuthenticated && (
            <>
              <Link to="/home" className="text-blue-500 hover:text-blue-700 mx-2">Home</Link>
              <Link to="/createpost" className="text-blue-500 hover:text-blue-700 mx-2">Create A Post</Link>
            </>
          )}
        </div>
        <div>
          {isAuthenticated && (
            <button onClick={onLogout} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded bg-yellow-400 rounded">Logout</button>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  // Initialize state based on localStorage

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  // Function to handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Persist state in localStorage
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false'); // Clear authentication state in localStorage
  };

  // Effect to clear authentication state on logout

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'false');
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
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
