import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Here you might want to decode the token and set the user information
      setUser({ token });
    }
  }, []);

  const handleLogin = (data) => {
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              SocialHub
            </Typography>
            {user ? (
                <>
                  <Button color="inherit" href="/posts" onClick={() => setUser(user)}>
                    Create Post
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
            ) : (
                <>
                  <Button color="inherit" href="/login">
                    Login
                  </Button>
                  <Button color="inherit" href="/register">
                    Register
                  </Button>
                </>
            )}
          </Toolbar>
        </AppBar>
        <Box mt={2}>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Posts />} />
          </Routes>
        </Box>
      </Router>
  );
};

export default App;
