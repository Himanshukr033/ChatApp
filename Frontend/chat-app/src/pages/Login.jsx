import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    Typography,
    TextField,
    Button,
    Box,
    Grid,
  } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    
    if (localStorage.getItem('userInfo')) {
      navigate("/");
    }
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { email, password } = values;
    if (email === "" || password === "") {
      toast.error("Email and password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;
      try {
        console.log("handlesubmit try entered");
        const { data } = await axios.post(`${apiUrl}api/user/login`, { email, password });
        console.log(data);
        if (!data) {
          toast.error(data.message, toastOptions);
        } else {setTimeout(() => {
          
          localStorage.setItem("userInfo", JSON.stringify(data));
            
            navigate("/");
            
          
          
      }, 1200);
        }
      } catch (error) {
        console.error("Error occurred:", error);
        toast.error(error.response.data.message, toastOptions);
      }
    }
  };

  return (
    <>
      <Box
        width={"50vw"}
        minWidth={400}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          backgroundColor: "#00000076",
          borderRadius: "2rem",
          padding: "5rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "white", textTransform: "uppercase" }}
        >
          Chat Application
        </Typography>
        <form
          onSubmit={(event) => handleSubmit(event)}
          style={{ width: "100%", fontSize: "1rem" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-required"
            label="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              style: {
                color: "white",
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            id="outlined-password-input"
            onChange={(e) => handleChange(e)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              style: {
                color: "white",
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginTop: "1rem",
              backgroundColor: "#997af0",
              color: "white",
              fontWeight: "bold",
              borderRadius: "0.4rem",
              textTransform: "uppercase",
              transition: " 0.5s ease-in-out",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#4e0eff",
              },
            }}
          >
            Log In
          </Button>
          <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
            <Grid item>
              <Typography variant="h6" sx={{ color: "white" }}>
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  // onClick={()=>{navigate("/register")}}
                  style={{ color: "#4e0eff", fontWeight: "bold", fontSize:20 }}
                >
                  Create One
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
      <ToastContainer />
    </>
  );
}
