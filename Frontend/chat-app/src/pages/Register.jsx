import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { loginRoute } from "../utils/APIRoutes";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Link as MuiLink,
  } from "@mui/material";

  export default function Register() {
    const navigate = useNavigate();
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    const [values, setValues] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
//   useEffect(() => {
//     if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
//       navigate("/");
//     }
//   }, []);

const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
    //   const { email, username, password } = values;
    //   const { data } = await axios.post(registerRoute, {
    //     username,
    //     email,
    //     password,
    //   });

    //   if (data.status === false) {
    //     toast.error(data.msg, toastOptions);
    //   }
      if (data.status === true) {
        localStorage.setItem(
        //   process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
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
          style={{ width: "100%" }} 
        >         
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            placeholder="Username"
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
            id="email"
            label="Email"
            name="email"
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
            id="password"
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
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
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
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
              transition: "0.5s ease-in-out",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#4e0eff",
              },
            }}
          >
            Create User
          </Button>

          
          <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
            <Grid item>
              <Typography variant="h6" sx={{ color: "white" }}>
                Already have an account?{" "}
                <MuiLink
                  component={Link}
                  to="/login"
                  variant="h5"
                  sx={{ color: "#4e0eff", fontWeight: "bold" }}
                >
                  Login
                </MuiLink>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>

      
      <ToastContainer />
    </>
  );
}
