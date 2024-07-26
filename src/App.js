import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Box, CssBaseline, Container, Divider, styled} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import getLPTheme, { brand } from './styles/getTheme';
const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
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
        <ThemeProvider theme={getLPTheme('light')}>
            <CssBaseline />
            <Router>
                <AppBar position="static" sx={{ backgroundColor: brand[200] }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            SocialHub
                        </Typography>
                        {user ? (
                            <>
                                <Button variant="contained" color="primary" href="/" onClick={() => setUser(user)}>
                                    Home
                                </Button>
                                <Divider />
                                <Button color="primary" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="contained" color="primary" href="/login">
                                    Login
                                </Button>
                                <Divider />
                                <Button color="primary" href="/register">
                                    Register
                                </Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
                <Container>
                    <Box mt={2}>
                        <Routes>
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/" element={<Posts />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Box>
                </Container>
            </Router>
        </ThemeProvider>
    );
};

export default App;
