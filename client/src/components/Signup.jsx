import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  Alert,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaUserCircle,
} from "react-icons/fa";

// Styled background container
const BackgroundContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundImage:
    "url(https://plus.unsplash.com/premium_photo-1671751033659-7f229092e20f?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: "70%",
  margin: "2rem auto",
  padding: theme.spacing(3),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
}));

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    if (validateForm()) {
      try {
        console.log("Form submitted:", formData);
      } catch (error) {
        setSubmitError("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <BackgroundContainer>
      <Container>
        <StyledCard>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flexBasis: "50%" }}>
              <img
                src="https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flexBasis: "50%" }}>
              <CardContent>
                <Box textAlign="center" mb={4}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Create your account to get started
                  </Typography>
                </Box>

                {submitError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {submitError}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaEnvelope />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaUser />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaUserCircle />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        sx={{ mt: 2 }}
                      >
                        Sign Up
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </div>
          </div>
        </StyledCard>
      </Container>
    </BackgroundContainer>
  );
};

export default SignupPage;
