import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/black.png";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "dummy-token");
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#fbfaf8ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // px: 2,
      }}
    >
      <Box
        sx={{
          height: "550px",
          width: "100%",
          maxWidth: "950px",
          display: "flex",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
        }}
      >
        <Box
          sx={{
            height: "600px",
            width: "55%",
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #021322, #062035, #092b45)",
          }}
        >
          {/* ✨ Soft Background Glow */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 40% 50%, rgba(255,150,60,0.25), transparent 60%),\
         radial-gradient(circle at 80% 30%, rgba(0,255,200,0.25), transparent 60%)",
              filter: "blur(55px)",
              opacity: 0.8,
              zIndex: 1,
            }}
          />

          {/* Top Left */}
          <Box
            sx={{
              position: "absolute",
              top: -120,
              left: -120,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, #ffaa5a, #d46a00)",
              filter: "blur(2px)",
              opacity: 0.9,
              boxShadow: "0 40px 70px rgba(255,140,0,0.25)",
              zIndex: 2,
            }}
          />

          {/* Bottom Left */}
          <Box
            sx={{
              position: "absolute",
              bottom: -150,
              left: -150,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, #54ffe0, #007a66)",
              filter: "blur(2px)",
              opacity: 0.85,
              boxShadow: "0 40px 70px rgba(0,255,200,0.25)",
              zIndex: 2,
            }}
          />

          {/* Bottom Right */}
          <Box
            sx={{
              position: "absolute",
              bottom: -130,
              right: -130,
              width: 260,
              height: 260,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, #48a8ff, #004a77)",
              filter: "blur(2px)",
              opacity: 0.85,
              boxShadow: "0 40px 70px rgba(70,150,255,0.2)",
              zIndex: 2,
            }}
          />

          {/* ✨ Medium Side Cut Balls */}

          <Box
            sx={{
              position: "absolute",
              left: -60,
              top: "35%",
              width: 150,
              height: 150,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, #ffc66a, #c97a00)",
              opacity: 0.85,
              boxShadow: "0 25px 40px rgba(255,200,0,0.25)",
              zIndex: 3,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              right: -70,
              top: "50%",
              width: 150,
              height: 150,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, #4effe2, #007c69)",
              opacity: 0.85,
              boxShadow: "0 25px 40px rgba(0,255,200,0.25)",
              zIndex: 3,
            }}
          />

          {/* <Box
            sx={{
              position: "absolute",
              left: 120,
              top: 100,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "radial-gradient(circle, #ffd76a, #c97a00)",
              opacity: 0.9,
              boxShadow: "0 20px 30px rgba(255,200,0,0.25)",
              zIndex: 4,
            }}
          /> */}
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              p: 5,
              height: "auto",
              borderRadius: "25px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(15px)",
              color: "#fff",
              zIndex: 3,
            }}
          >
            {" "}
            <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
              PESO
            </Typography>
            <Typography variant="h5" mt={3} fontWeight={700}>
              Simplifying Government Approvals
            </Typography>
            <Typography mt={2} sx={{ opacity: 0.85 }}>
              Helping businesses and individuals get <br /> certificates and
              approvals from authorities efficiently.
            </Typography>
            <Typography mt={8} sx={{ opacity: 0.9 }}>
              Already have an account?
            </Typography>
            <Typography
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                mt: 0.5,
                fontWeight: 600,
              }}
            >
              Sign in
            </Typography>
          </Paper>
        </Box>

        {/* RIGHT SIDE FORM */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <img src={logo} alt="Logo" style={{ width: 180 }} />
          </Box>
          {/* <Typography variant="h6" fontWeight={700} color="#000">
            Sign In
          </Typography> */}

          <Box component="form" onSubmit={handleLogin}>
            {/* Email Input */}
            <TextField
              label="Email address"
              fullWidth
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />

            {/* Password Input */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />

            {/* Show Password */}
            <FormControlLabel
              sx={{
                ml: 0,
                "& .MuiFormControlLabel-label": {
                  fontSize: "14px",
                  color: "#4c4c4cff",
                },
              }}
              control={
                <Checkbox
                  size="small"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
              }
              label="Show password"
            />

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                py: 1.4,
                background: "#e65f09",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(255,108,12,0.4)",
                transition: "0.3s",
                "&:hover": {
                  background: "#FF6C0C",
                  boxShadow: "0 3px 10px rgba(255,108,12,0.55)",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
