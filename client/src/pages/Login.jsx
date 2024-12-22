import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container, Box, Snackbar } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useDispatch } from "react-redux"
import { authActions } from '../redux/store'


const Login = () => {
    const dispatch = useDispatch()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
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
            const { data } = await axios.post('http://localhost:5000/api/v1/users/login', { email: inputs.email, password: inputs.password })
            if (data) {
                localStorage.setItem("userId", data?.user._id)
                dispatch(authActions.login())
                enqueueSnackbar("User Logged In Sucessfully", { variant: 'success' })
                navigate('/');

            }

        } catch (error) {
            console.log(error)
            enqueueSnackbar("Invalid Credentials", { variant: "error" })
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
                        Login
                    </Typography>

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
                        onClick={() => navigate('/register')}
                    >
                        Don't have an account? Register
                    </Button>
                </Box>
            </Container>
        </form>
    )
}

export default Login

