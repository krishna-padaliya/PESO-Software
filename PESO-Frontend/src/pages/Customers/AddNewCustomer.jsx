import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Breadcrumbs,
  Link,
  Button,
  TextField,
  Grid,
  MenuItem,
  Divider,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

export default function AddNewCustomer() {
  const navigate = useNavigate();

  return (
    <Box p={1}>
      {/* HEADER */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => navigate(-1)} size="small">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight={700}>
            Add New Customer
          </Typography>
        </Box>

        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ ml: 5, mt: 1 }}
        >
          <Link underline="hover" color="inherit" href="/customer">
            Customers
          </Link>
          <Typography sx={{ color: "#e65f09" }}>Add New Customer</Typography>
        </Breadcrumbs>
      </Box>

      {/* MAIN CARD WRAPPER */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: "20px",
          border: "1px solid #e3e3e3",
          background: "#fff",
        }}
      >
        {/* SECTION 1 – CUSTOMER INFO */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 3, color: "#333", letterSpacing: 0.3 }}
        >
          Customer Information
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Customer Name"
              fullWidth
              size="small"
              InputProps={{
                sx: {
                  borderRadius: "12px",
                  background: "#fafafa",
                },
              }}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Country"
                  fullWidth
                  defaultValue="+91"
                  size="small"
                  InputProps={{
                    sx: {
                      background: "#fafafa",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <MenuItem value="+91">🇮🇳 +91</MenuItem>
                  <MenuItem value="+1">🇺🇸 +1</MenuItem>
                  <MenuItem value="+44">🇬🇧 +44</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  size="small"
                  InputProps={{
                    sx: {
                      background: "#fafafa",
                      borderRadius: "10px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Mobile */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Country"
                  fullWidth
                  defaultValue="+91"
                  size="small"
                  InputProps={{
                    sx: {
                      background: "#fafafa",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <MenuItem value="+91">🇮🇳 +91</MenuItem>
                  <MenuItem value="+1">🇺🇸 +1</MenuItem>
                  <MenuItem value="+44">🇬🇧 +44</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Mobile Number"
                  fullWidth
                  size="small"
                  InputProps={{
                    sx: {
                      background: "#fafafa",
                      borderRadius: "10px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="GST Number"
              fullWidth
              size="small"
              InputProps={{
                sx: { background: "#fafafa", borderRadius: "10px" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="PAN Number"
              fullWidth
              size="small"
              InputProps={{
                sx: { background: "#fafafa", borderRadius: "10px" },
              }}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              label="Primary Address"
              fullWidth
              multiline
              rows={3}
              size="small"
              InputProps={{
                sx: { borderRadius: "12px", backgroundColor: "#fafafa" },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Secondary Address"
              fullWidth
              multiline
              rows={3}
              size="small"
              InputProps={{
                sx: { borderRadius: "12px", backgroundColor: "#fafafa" },
              }}
            />
          </Grid>
        </Grid>

        {/* Divider Between Sections */}
        <Divider sx={{ my: 4 }} />

        {/* SECTION 2 – TANK INFO */}
        <Typography variant="h6" fontWeight={700} mb={3}>
          Tank Information
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="TAN Number"
              fullWidth
              size="small"
              InputProps={{
                sx: { background: "#fafafa", borderRadius: "10px" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Tanker Size (KG)"
              fullWidth
              size="small"
              InputProps={{
                sx: { background: "#fafafa", borderRadius: "10px" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Total Tanker Size (MT)"
              fullWidth
              size="small"
              InputProps={{
                sx: { background: "#fafafa", borderRadius: "10px" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Storage Product"
              fullWidth
              size="small"
              InputProps={{
                sx: { background: "#fafafa", borderRadius: "10px" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Installation Type"
              fullWidth
              size="small"
              InputProps={{
                sx: { background: "#fafafa", borderRadius: "10px" },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Project Given By"
              fullWidth
              size="small"
              InputProps={{
                sx: { background: "#fafafa", borderRadius: "10px" },
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* SAVE BUTTON */}
      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#e65f09",
            px: 6,
            py: 1.5,
            fontWeight: 600,
            borderRadius: "12px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#ff6c0c" },
          }}
        >
          Save Customer
        </Button>
      </Box>
    </Box>
  );
}
