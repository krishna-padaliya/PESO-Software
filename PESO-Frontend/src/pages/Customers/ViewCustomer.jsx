import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Breadcrumbs,
  Link,
  Button,
  TextField,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderIcon from "@mui/icons-material/Folder";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

// TEMP DATA
const customerData = {
  name: "Amit Kumar",
  phone: "9876543210",
  mobile: "9998887770",
  addressPrimary: "Ahmedabad",
  addressSecondary: "Mumbai",
  gst: "24ABCDE1234F1Z5",
  pan: "ABCDE1234F",
  tan: "TAN445566",
  tankerKg: "5000 KG",
  tankerMt: "5 MT",
  storageProduct: "LPG",
  installationType: "Above Ground",
  projectGivenBy: "Company XYZ",
};

/* ------------------------- REUSABLE FOLDER TREE ------------------------- */
const FolderTree = ({ folder, addSubfolder, uploadFiles, handleViewFile }) => {
  const [subName, setSubName] = useState("");

  return (
    <Accordion sx={{ mb: 2, borderRadius: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <FolderIcon sx={{ color: "#e65f09", mr: 1 }} />
        <Typography fontWeight={600}>{folder.name}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        {/* Upload Files */}
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadFileIcon />}
          sx={{ textTransform: "none", mb: 2 }}
        >
          Upload Files
          <input
            type="file"
            hidden
            multiple
            onChange={(e) => uploadFiles(folder.id, e)}
          />
        </Button>

        {/* FILE LIST */}
        <List>
          {folder.files.map((fileObj, index) => (
            <ListItem key={index} sx={{ pl: 0 }}>
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>

              <ListItemText primary={fileObj.name} />

              {/* VIEW BUTTON */}
              <Button
                variant="text"
                color="primary"
                onClick={() => handleViewFile(fileObj)}
                sx={{ textTransform: "none" }}
              >
                View
              </Button>
            </ListItem>
          ))}

          {folder.files.length === 0 && (
            <Typography sx={{ color: "gray" }}>No files uploaded.</Typography>
          )}
        </List>

        {/* CREATE SUBFOLDER */}
        <Box display="flex" gap={1} mt={2}>
          <TextField
            size="small"
            placeholder="Create Subfolder"
            value={subName}
            onChange={(e) => setSubName(e.target.value)}
          />
          <Button
            variant="contained"
            color="warning"
            startIcon={<CreateNewFolderIcon />}
            onClick={() => {
              addSubfolder(folder.id, subName);
              setSubName("");
            }}
          >
            Add
          </Button>
        </Box>

        {/* RENDER NESTED SUBFOLDERS */}
        <Box mt={2} ml={3}>
          {folder.subfolders.map((sub) => (
            <FolderTree
              key={sub.id}
              folder={sub}
              addSubfolder={addSubfolder}
              uploadFiles={uploadFiles}
              handleViewFile={handleViewFile}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

/* ---------------------------- MAIN PAGE ---------------------------- */
export default function ViewCustomer() {
  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");

  /* ---------------------- ADD MAIN FOLDER ---------------------- */
  const handleAddMainFolder = () => {
    if (!folderName.trim()) return;

    setFolders([
      ...folders,
      {
        id: Date.now(),
        name: folderName,
        files: [],
        subfolders: [],
      },
    ]);

    setFolderName("");
  };

  /* ---------------------- ADD SUBFOLDER ---------------------- */
  const addSubfolder = (parentId, subName) => {
    if (!subName.trim()) return;

    const updateTree = (items) =>
      items.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            subfolders: [
              ...item.subfolders,
              {
                id: Date.now(),
                name: subName,
                files: [],
                subfolders: [],
              },
            ],
          };
        }
        return { ...item, subfolders: updateTree(item.subfolders) };
      });

    setFolders(updateTree(folders));
  };

  /* ---------------------- UPLOAD FILES ---------------------- */
  const uploadFiles = (folderId, event) => {
    const filesArr = Array.from(event.target.files);

    const updateTree = (items) =>
      items.map((item) => {
        if (item.id === folderId) {
          return { ...item, files: [...item.files, ...filesArr] };
        }
        return { ...item, subfolders: updateTree(item.subfolders) };
      });

    setFolders(updateTree(folders));
  };

  const handleUploadFiles = (folderId, event) => {
    const uploadedFiles = Array.from(event.target.files);

    const addFiles = (items) =>
      items.map((item) => {
        if (item.id === folderId) {
          return {
            ...item,
            files: [
              ...item.files,
              ...uploadedFiles.map((file) => ({
                name: file.name,
                type: file.type,
                url: URL.createObjectURL(file), // ✔ preview URL
                file: file,
              })),
            ],
          };
        }

        return { ...item, subfolders: addFiles(item.subfolders) };
      });

    setFolders((prev) => addFiles(prev));
  };

  const handleViewFile = (fileObj) => {
    const url = fileObj.url;

    // For PDF + Images → direct browser view
    if (
      fileObj.type === "application/pdf" ||
      fileObj.type.startsWith("image/")
    ) {
      window.open(url, "_blank");
      return;
    }

    // For DOC, DOCX, XLS, XLSX → Google Viewer
    const googleViewer = `https://docs.google.com/viewer?url=${encodeURIComponent(
      url
    )}&embedded=true`;

    window.open(googleViewer, "_blank");
  };

  return (
    <Box p={1}>
      {/* Heading & Breadcrumb */}
      <Box mb={4} display="flex" flexDirection="column" gap={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            size="small"
            onClick={() => navigate(-1)}
            sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>

          <Typography variant="h5" fontWeight={600}>
            Customer Profile
          </Typography>
        </Box>

        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ ml: 5 }}
        >
          <Link underline="hover" color="inherit" href="/customer">
            Customers
          </Link>
          <Typography sx={{ color: "#e65f09" }}>Customer Profile</Typography>
        </Breadcrumbs>
      </Box>

      {/* ---------------- CUSTOMER DETAILS ---------------- */}
      <Card sx={{ borderRadius: 3, p: 2, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Customer Details
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap={3}
          sx={{ mt: 2 }}
        >
          {[
            { label: "Customer Name", value: customerData?.name },
            { label: "Phone Number", value: customerData?.phone },
            { label: "Mobile Number", value: customerData?.mobile },
            { label: "Primary Address", value: customerData?.addressPrimary },
            {
              label: "Secondary Address",
              value: customerData?.addressSecondary,
            },
            { label: "GST Number", value: customerData?.gst },
            { label: "PAN Number", value: customerData?.pan },
            { label: "TAN Number", value: customerData?.tan },
            { label: "Tanker Size (KG)", value: customerData?.tankerKg },
            { label: "Total Tanker Size (MT)", value: customerData?.tankerMt },
            { label: "Storage Product", value: customerData?.storageProduct },
            {
              label: "Installation Type",
              value: customerData?.installationType,
            },
            { label: "Project Given By", value: customerData?.projectGivenBy },
          ].map((item, idx) => (
            <Box key={idx}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#444" }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#1a1a1a",
                  mt: 0.5,
                  p: 1,
                  background: "#fafafa",
                  borderRadius: "8px",
                }}
              >
                {item.value || "—"}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>

      {/* ---------------- DOCUMENT MANAGER ---------------- */}
      <Card sx={{ borderRadius: 3, p: 2 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Document Manager
        </Typography>

        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Create New Folder"
            size="small"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <Button
            variant="contained"
            color="warning"
            startIcon={<CreateNewFolderIcon />}
            onClick={handleAddMainFolder}
          >
            Add Folder
          </Button>
        </Box>

        {folders.map((f) => (
          <FolderTree
            key={f.id}
            folder={f}
            addSubfolder={addSubfolder}
            uploadFiles={handleUploadFiles}
            handleViewFile={handleViewFile}
          />
        ))}

        {folders.length === 0 && (
          <Typography sx={{ color: "gray" }}>
            No folders created yet.
          </Typography>
        )}
      </Card>
    </Box>
  );
}
