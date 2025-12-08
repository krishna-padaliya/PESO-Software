import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  InputBase,
  Paper,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

import { useThemeContext } from "../theme/ThemeProvider";

// Search box styling
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "30px",
  backgroundColor: "#F0F0F0",
  padding: "6px 16px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid #dcdcdc",
  transition: "all 0.2s ease",
  "&:focus-within": {
    borderColor: theme.palette.primary.main,
    backgroundColor: "#fff",
    boxShadow: "0px 0px 8px rgba(0,0,0,0.06)",
  },
}));

const StyledInputBase = styled(InputBase)(() => ({
  flex: 1,
  fontSize: 15,
}));

// Icon wrapper for consistent styling
const IconButtonWrapper = styled(IconButton)(() => ({
  padding: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  transition: "0.2s",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.06)",
  },
}));

export default function ModernHeader() {
  const { toggleColorMode, mode } = useThemeContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const toggleMenu = (event) => {
    if (open) setAnchorEl(null);
    else setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(255, 255, 255, 0.75) !important",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "4px 0 20px rgba(0,0,0,0.04)",
        color: "inherit",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Search Bar */}
        <Search>
          <SearchIcon sx={{ opacity: 0.6, color: "#8a8a8aff" }} />
          <StyledInputBase placeholder="Search anything..." />
        </Search>

        {/* Right side icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Dark/Light Mode */}
          <Tooltip
            title={
              mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: "#e65f09",
                  color: "#fff",
                  fontSize: "12px",
                  padding: "6px 10px",
                  borderRadius: "6px",
                },
              },
              arrow: {
                sx: {
                  color: "#e65f09",
                },
              },
            }}
            arrow
          >
            <IconButtonWrapper
              onClick={toggleColorMode}
              sx={{ border: "1px solid rgba(0,0,0,0.08)" }}
            >
              {mode === "dark" ? (
                <LightModeRoundedIcon />
              ) : (
                <BedtimeRoundedIcon />
              )}
            </IconButtonWrapper>
          </Tooltip>

          {/* Notifications */}
          <Tooltip
            title="Notifications"
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: "#e65f09",
                  color: "#fff",
                  fontSize: "12px",
                  padding: "6px 10px",
                  borderRadius: "6px",
                },
              },
              arrow: {
                sx: {
                  color: "#e65f09",
                },
              },
            }}
            arrow
          >
            <IconButtonWrapper sx={{ border: "1px solid rgba(0,0,0,0.08)" }}>
              <NotificationsRoundedIcon />
            </IconButtonWrapper>
          </Tooltip>

          {/* User Profile */}
          <Box
            onClick={toggleMenu}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: alpha("#000", 0.03),
              borderRadius: "30px",
              padding: "4px 12px",
              cursor: "pointer",
              border: "1px solid rgba(0,0,0,0.08)",
              transition: "0.2s",
              "&:hover": {
                backgroundColor: alpha("#000", 0.06),
              },
            }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                backgroundColor: "#e65f09",
              }}
            />

            <Box sx={{ ml: 1 }}>
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, color: "#646464ff" }}
              >
                Robert Robertson
              </Typography>
              <Typography sx={{ fontSize: 12, color: "gray" }}>
                Admin
              </Typography>
            </Box>

            <IconButton size="small" sx={{ ml: 0.5 }}>
              {open ? (
                <KeyboardArrowUpRoundedIcon />
              ) : (
                <KeyboardArrowDownRoundedIcon />
              )}
            </IconButton>
          </Box>

          {/* DROPDOWN MENU */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            PaperProps={{
              elevation: 4,
              sx: {
                mt: 1,
                width: anchorEl ? anchorEl.offsetWidth : 200, // ★ FULL WIDTH OF USER BOX
                borderRadius: "14px",
                overflow: "hidden",
                animation: "fadeIn 0.2s ease-out",
                boxShadow:
                  "0px 8px 24px rgba(0,0,0,0.08), 0px 2px 4px rgba(0,0,0,0.06)",
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <Typography>My Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography>Account Settings</Typography>
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleClose}>
              <Typography color="error">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
