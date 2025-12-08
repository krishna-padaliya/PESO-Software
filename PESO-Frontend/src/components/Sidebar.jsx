import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Collapse,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";

import logo from "../assets/logo/black.png";
import smallLogo from "../assets/logo/Small-Logo.png";

const drawerWidth = 230;

export default function Sidebar() {
  const location = useLocation();
  const [hovered, setHovered] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);

  const toggleSubmenu = () => setOpenSubmenu(!openSubmenu);

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        width: hovered ? drawerWidth : 70,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: hovered ? drawerWidth : 70,
          transition: "width 0.3s ease",
          background: "#fff",
          borderRight: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "4px 0 20px rgba(0,0,0,0.04)",
          overflowX: "hidden",
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: hovered ? "center" : "center",
          py: 2,
        }}
      >
        <img
          src={hovered ? logo : smallLogo}
          alt="Logo"
          style={{
            height: hovered ? "52px" : "38px",
            width: hovered ? "140px" : "30px",
            transition: "0.3s",
          }}
        />
      </Box>

      {/* Main Menu */}
      <List sx={{ px: 1, mt: 1 }}>
        {/* Reusable icon style */}
        {[
          {
            label: "Dashboard",
            path: "/dashboard",
            icon: <DashboardRoundedIcon />,
          },
          {
            label: "Customers",
            path: "/",
            icon: <Person2RoundedIcon />,
          },
        ].map((item, i) => (
          <ListItemButton
            key={i}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: "12px",
              mb: 0.8,
              height: 46,
              position: "relative",
              overflow: "hidden",
              pl: hovered ? 2 : 1.2,

              "&:hover": {
                backgroundColor: "rgba(255,123,0,0.12) !important",
              },
              "&.Mui-selected": {
                background: "rgba(255,123,0,0.18)",
                "& .MuiListItemIcon-root": {
                  color: "#ff7b00",
                },
              },
            }}
          >
            {location.pathname === item.path && (
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  width: 4,
                  height: "70%",
                  background: "#ff7b00",
                  borderRadius: "0 6px 6px 0",
                  top: "15%",
                  boxShadow: "0 0 6px rgba(255,123,0,0.5)",
                }}
              />
            )}

            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? "#ff7b00" : "#777",
                minWidth: hovered ? 40 : "auto",
                width: hovered ? "auto" : "100%",
                justifyContent: hovered ? "flex-start" : "center",
                transition: "0.3s",
                fontSize: 22,
              }}
            >
              {item.icon}
            </ListItemIcon>

            {hovered && (
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: location.pathname === item.path ? "#ff7b00" : "#333",
                }}
              />
            )}
          </ListItemButton>
        ))}

        {/* ---------------- HOME DROPDOWN ---------------- */}

        <Tooltip title={!hovered ? "Home" : ""} placement="right">
          <ListItemButton
            onClick={toggleSubmenu}
            sx={{
              borderRadius: "12px",
              mb: 0.8,
              height: 46,
              position: "relative",
              overflow: "hidden",
              pl: hovered ? 2 : 1.2,
              "&:hover": {
                backgroundColor: "rgba(255,123,0,0.12) !important",
              },
            }}
          >
            {openSubmenu && (
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  width: 4,
                  height: "70%",
                  background: "#ff7b00",
                  borderRadius: "0 6px 6px 0",
                  top: "15%",
                  boxShadow: "0 0 6px rgba(255,123,0,0.5)",
                }}
              />
            )}

            <ListItemIcon
              sx={{
                color: openSubmenu ? "#ff7b00" : "#777",
                minWidth: hovered ? 40 : "auto",
                width: hovered ? "auto" : "100%",
                justifyContent: hovered ? "flex-start" : "center",
                transition: "0.3s",
              }}
            >
              <DashboardIcon />
            </ListItemIcon>

            {hovered && (
              <>
                <ListItemText
                  primary="Home"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: openSubmenu ? "#ff7b00" : "#333",
                  }}
                />
                {openSubmenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </>
            )}
          </ListItemButton>
        </Tooltip>

        {/* SUBMENU ITEMS */}
        <Collapse in={openSubmenu && hovered} timeout={200}>
          <List sx={{ pl: 7 }}>
            {["Overview", "Live Network", "To-Do's"].map((text, i) => (
              <ListItemButton
                key={i}
                sx={{
                  py: 0.6,
                  mb: 0.5,
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(255,123,0,0.08) !important",
                  },
                }}
              >
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    fontSize: 14,
                    color: "#444",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>

      {/* Bottom Actions */}
      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 1, pb: 2 }}>
        {/* Settings */}
        {/* <Tooltip title={!hovered ? "Settings" : ""} placement="right">
          <ListItemButton
            sx={{
              borderRadius: "10px",
              mb: 0.8,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SettingsRoundedIcon />
            </ListItemIcon>

            {hovered && <ListItemText primary="Settings" />}
          </ListItemButton>
        </Tooltip> */}

        {/* Logout */}
        <Tooltip title={!hovered ? "Logout" : ""} placement="right">
          <ListItemButton
            sx={{
              borderRadius: "10px",
              backgroundColor: "rgba(255, 77, 77, 0.08)",
              "&:hover": { backgroundColor: "rgba(255, 77, 77, 0.18)" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "#d32f2f" }}>
              <LogoutRoundedIcon />
            </ListItemIcon>

            {hovered && (
              <ListItemText
                primary="Logout"
                sx={{ color: "#d32f2f", fontWeight: 800 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
}
