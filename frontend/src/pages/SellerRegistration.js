import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography } from "@mui/material";
import { registerSeller } from "../services/authService";


const SellerRegistration = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerSeller(data);
      alert("Registration Successful");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <>
    
    <Container maxWidth="sm">
       
      <Typography variant="h4" gutterBottom>
        Seller Registration
      </Typography>
     
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register("name", { required: true })}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          {...register("email", { required: true })}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          {...register("password", { required: true })}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
    </>
  );
};

export default SellerRegistration;
