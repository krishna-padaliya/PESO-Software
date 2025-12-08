import React from "react";
import { Button } from "@mui/material";

export default function PrimaryButton({
  children,
  loading,
  disabled,
  ...rest
}) {
  return (
    <Button
      variant="contained"
      disableElevation
      disabled={disabled || loading}
      sx={{
        textTransform: "none",
        fontSize: "1rem",
        borderRadius: "10px",
        padding: "10px 16px",
        backgroundColor: "var(--primary-color, #1976d2)",
        ":hover": {
          backgroundColor: "var(--primary-hover-color, #115293)",
        },
      }}
      {...rest}
    >
      {loading ? "Please wait..." : children}
    </Button>
  );
}
