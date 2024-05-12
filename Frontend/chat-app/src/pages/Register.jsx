import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { loginRoute } from "../utils/APIRoutes";
import {
  CircularProgress ,
    Typography,
    TextField,
    Box,
    Grid,
    Link as MuiLink,
    Input,
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      pic:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    });
    const [picLoading, setPicLoading] = useState(false);

  useEffect(() => {
    
    if (localStorage.getItem('userInfo')) {
      navigate("/");
    }
  }, []);

const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    
    const { password, confirmPassword, name, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      
      return false;
    } else if (name.length < 3) {
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
      setPicLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { email, name, password,pic } = values;
      try {
        console.log("handlesubmit try entered");
      const { data } = await axios.post("http://localhost:5030/api/user/register", {
        name,
        email,
        password,
        pic
      },
    config);

      console.log(data);
      toast.success("User created", toastOptions);
      
      if (!data) {
        toast.error("Failed to create user", toastOptions);
      }
      setTimeout(() => {
        if (data) {
          localStorage.setItem("userInfo", JSON.stringify(data));
          
          navigate("/");
          
        }
        
    }, 1200);
      
    }
    catch (error) {
      console.error("Error occurred:", error);
      toast.error(error.response.data.message, toastOptions);
    }
    setPicLoading(false);
    }
  };

  const handlePictureChange = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast.warning(
        "Please Select an Image!",
        toastOptions
      );
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chat-App");
      data.append("cloud_name", "do3xjl1xo");
      fetch("https://api.cloudinary.com/v1_1/do3xjl1xo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setValues({
            ...values, 
            pic: data.url.toString(), 
          });
          
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {

      toast.error("Please Select an Image!", toastOptions);
        
      setPicLoading(false);
      return;
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
            id="name"
            label="name"
            name="name"
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
          <div style={{width:'100%', display:"flex", justifyContent:'center',alignContent:'center', color:'white'}}>
            <Input
            style={{padding:5, color:"White", fontSize:'20px'}}
              type="file"
              id="pic"
              name="pic"
              onChange={(e)=> handlePictureChange(e.target.files[0])}
              />
          </div>
          
          <LoadingButton
            type="submit"
            loading={picLoading}
            loadingIndicator={<CircularProgress color="secondary" size={26} />}            
            fullWidth
            variant="contained"
            lo
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
          </LoadingButton>

          
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
