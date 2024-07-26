import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [fullName, setFullName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== passwordConfirmation) {
            alert('Passwords do not match');
            return;
        }
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: { email, password, full_name: fullName } }),
        });
        const data = await response.json();
        console.log(data);
        if (data.id) {
            // Navigate to login or home page
        } else {
            alert('Registration failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box mt={8} display="flex" flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} mt={1}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Full Name"
                        autoComplete="name"
                        autoFocus
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
