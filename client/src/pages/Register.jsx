import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container, Box, Snackbar } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';


const Register = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });



    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value

        }))
    }




    const handleSubmit = async (e) => {
        // Handle form submission logic here
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/v1/users/register', { userName: inputs.name, email: inputs.email, password: inputs.password })
            if (data) {
                enqueueSnackbar("User Registered Sucessfully", { variant: 'success' })
                navigate('/login');

            }

        } catch (error) {
            console.log(error)
            enqueueSnackbar("Registration failed. Please try again", { variant: "error" })
        }
    };

    return (
        <form  >
            <Container maxWidth="xs" sx={{ mt: 5 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: 6,
                        padding: 3,
                        borderRadius: 3,
                        backgroundColor: '#fff'
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Register
                    </Typography>
                    <TextField
                        variant="outlined"
                        value={inputs.name}
                        margin="normal"
                        fullWidth
                        label="Name"
                        placeholder="Enter your name"
                        name='name'
                        onChange={handleChange}
                        required={true}
                    />
                    <TextField
                        value={inputs.email}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        required={true}
                    />
                    <TextField
                        value={inputs.password}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        name='password'
                        onChange={handleChange}
                        required={true}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="text"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => navigate('/login')}
                    >
                        Already have an account? Login
                    </Button>
                </Box>
            </Container>
        </form>
    );
};

export default Register;