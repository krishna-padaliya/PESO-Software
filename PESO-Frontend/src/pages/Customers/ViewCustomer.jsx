// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Breadcrumbs,
//   Link,
//   Button,
//   TextField,
//   Card,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Tooltip,
// } from "@mui/material";

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import AddIcon from "@mui/icons-material/Add";
// import FolderIcon from "@mui/icons-material/Folder";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import ChevronRight from "@mui/icons-material/ChevronRight";
// import ExpandMore from "@mui/icons-material/ExpandMore";

// import { useNavigate } from "react-router-dom";

// // TEMP CUSTOMER DATA
// const customerData = {
//   name: "Amit Kumar",
//   phone: "9876543210",
//   mobile: "9998887770",
//   addressPrimary: "Ahmedabad",
//   addressSecondary: "Mumbai",
//   gst: "24ABCDE1234F1Z5",
//   pan: "ABCDE1234F",
//   tan: "TAN445566",
//   tankerKg: "5000 KG",
//   tankerMt: "5 MT",
//   storageProduct: "LPG",
//   installationType: "Above Ground",
//   projectGivenBy: "Company XYZ",
// };

// // -------------------- REUSABLE ADD FOLDER UI --------------------
// const AddFolder = ({ placeholder, onAdd }) => {
//   const [showInput, setShowInput] = useState(false);
//   const [name, setName] = useState("");

//   return (
//     <Box mt={1}>
//       {!showInput ? (
//         <IconButton
//           size="small"
//           onClick={() => setShowInput(true)}
//           sx={{
//             bgcolor: "#FFE5D6",
//             "&:hover": { bgcolor: "#FFDBBF" },
//             borderRadius: 1,
//           }}
//         >
//           <AddIcon sx={{ color: "#FF6C0C" }} />
//         </IconButton>
//       ) : (
//         <Box display="flex" gap={1}>
//           <TextField
//             size="small"
//             autoFocus
//             placeholder={placeholder}
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             sx={{ flex: 1 }}
//           />
//           <Button
//             size="small"
//             variant="contained"
//             color="warning"
//             onClick={() => {
//               if (!name.trim()) return;
//               onAdd(name);
//               setName("");
//               setShowInput(false);
//             }}
//           >
//             Add
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// // -------------------- FOLDER TREE --------------------
// const FolderTree = ({ folders, selectedFolderId, setSelectedFolderId }) => {
//   const [openMap, setOpenMap] = useState({});

//   const toggleOpen = (id) => {
//     setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const renderTree = (folder, level = 0) => (
//     <Box key={folder.id}>
//       {/* Folder Row */}
//       <Box
//         sx={{
//           pl: level * 2,
//           py: 0.7,
//           borderRadius: 1,
//           display: "flex",
//           alignItems: "center",
//           cursor: "pointer",
//           bgcolor: selectedFolderId === folder.id ? "#FFE5D6" : "transparent",
//           "&:hover": { bgcolor: "#FFE5D6" },
//         }}
//       >
//         {/* Expand / Collapse Icon */}
//         <IconButton
//           size="small"
//           onClick={() => toggleOpen(folder.id)}
//           sx={{ mr: 1 }}
//         >
//           {openMap[folder.id] ? <ExpandMore /> : <ChevronRight />}
//         </IconButton>

//         {/* Folder Icon + Name */}
//         <Box
//           onClick={() => setSelectedFolderId(folder.id)}
//           sx={{ display: "flex", alignItems: "center" }}
//         >
//           <FolderIcon sx={{ color: "#FF6C0C", mr: 1 }} />
//           <Typography fontSize={14}>{folder.name}</Typography>
//         </Box>
//       </Box>

//       {/* Render Children (Recursive) */}
//       {openMap[folder.id] &&
//         folder.subfolders &&
//         folder.subfolders.map((sub) => renderTree(sub, level + 1))}
//     </Box>
//   );

//   return <Box>{folders.map((f) => renderTree(f))}</Box>;
// };

// const addSubfolder = (parentId, name) => {
//   const addRecursive = (items) =>
//     items.map((item) => {
//       if (item.id === parentId) {
//         return {
//           ...item,
//           subfolders: [
//             ...item.subfolders,
//             {
//               id: Date.now(),
//               name,
//               files: [],
//               subfolders: [],
//             },
//           ],
//         };
//       }
//       return { ...item, subfolders: addRecursive(item.subfolders) };
//     });

//   setFolders((prev) => addRecursive(prev));
// };

// // -------------------- DOCUMENT PANEL --------------------
// const DocumentPanel = ({
//   folder,
//   addSubfolder,
//   uploadFiles,
//   handleViewFile,
// }) => {
//   if (!folder) {
//     return (
//       <Typography sx={{ color: "gray", mt: 3 }}>
//         Select a folder from the left panel
//       </Typography>
//     );
//   }

//   return (
//     <Box>
//       {/* Upload Files */}
//       <Button
//         variant="outlined"
//         component="label"
//         startIcon={<UploadFileIcon />}
//         sx={{ textTransform: "none", mb: 2, borderRadius: 2 }}
//       >
//         Upload Files
//         <input
//           type="file"
//           hidden
//           multiple
//           onChange={(e) => uploadFiles(folder.id, e)}
//         />
//       </Button>

//       {/* File List */}
//       <List sx={{ mb: 2, bgcolor: "#fafafa", borderRadius: 1, p: 1 }}>
//         {folder.files.length > 0 ? (
//           folder.files.map((file, idx) => (
//             <ListItem
//               key={idx}
//               sx={{
//                 borderRadius: 1,
//                 mb: 0.5,
//                 bgcolor: "#fff",
//                 boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
//               }}
//               secondaryAction={
//                 <Tooltip title="View File">
//                   <Button
//                     variant="text"
//                     color="primary"
//                     onClick={() => handleViewFile(file)}
//                     sx={{ textTransform: "none" }}
//                   >
//                     View
//                   </Button>
//                 </Tooltip>
//               }
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon sx={{ color: "#1976D2" }} />
//               </ListItemIcon>
//               <ListItemText
//                 primary={file.name}
//                 primaryTypographyProps={{ fontSize: 14 }}
//               />
//             </ListItem>
//           ))
//         ) : (
//           <Typography sx={{ color: "gray", px: 1 }}>
//             No files uploaded.
//           </Typography>
//         )}
//       </List>

//       {/* Add Subfolder (RIGHT PANEL) */}
//       <AddFolder
//         placeholder="New Sub-Folder"
//         onAdd={(name) => addSubfolder(folder.id, name)}
//       />
//     </Box>
//   );
// };

// // -------------------- MAIN PAGE --------------------
// export default function ViewCustomer() {
//   const navigate = useNavigate();

//   const [folders, setFolders] = useState([
//     {
//       id: 1,
//       name: "Main Folder",
//       files: [],
//       isOpen: true,
//       subfolders: [],
//     },
//   ]);

//   const [selectedFolderId, setSelectedFolderId] = useState(null);

//   // ADD MAIN FOLDER
//   const handleAddMainFolder = (name) => {
//     setFolders([
//       ...folders,
//       {
//         id: Date.now(),
//         name,
//         files: [],
//         subfolders: [],
//       },
//     ]);
//   };

//   // ADD SUBFOLDER
//   const addSubfolder = (parentId, subName) => {
//     if (!subName.trim()) return;

//     const updateTree = (items) =>
//       items.map((item) => {
//         if (item.id === parentId) {
//           return {
//             ...item,
//             subfolders: [
//               ...item.subfolders,
//               {
//                 id: Date.now(),
//                 name: subName,
//                 files: [],
//                 subfolders: [],
//               },
//             ],
//           };
//         }
//         return { ...item, subfolders: updateTree(item.subfolders) };
//       });

//     setFolders(updateTree(folders));
//   };

//   const getSelectedFolder = (id, list) => {
//   for (let f of list) {
//     if (f.id === id) return f;
//     const deep = getSelectedFolder(id, f.subfolders);
//     if (deep) return deep;
//   }
//   return null;
// };

// const selectedFolder = getSelectedFolder(selectedFolderId, folders);

//   // UPLOAD FILES
//  const uploadFiles = (folderId, e) => {
//   const files = Array.from(e.target.files);

//   const updateRecursive = (items) =>
//     items.map((item) => {
//       if (item.id === folderId) {
//         return {
//           ...item,
//           files: [...item.files, ...files],
//         };
//       }
//       return { ...item, subfolders: updateRecursive(item.subfolders) };
//     });

//   setFolders((prev) => updateRecursive(prev));
// };


//   // VIEW FILE HANDLER
//   const handleViewFile = (fileObj) => {
//     const url = fileObj.url;

//     if (
//       fileObj.type === "application/pdf" ||
//       fileObj.type.startsWith("image/")
//     ) {
//       window.open(url, "_blank");
//       return;
//     }

//     const googleViewer = `https://docs.google.com/viewer?url=${encodeURIComponent(
//       url
//     )}&embedded=true`;
//     window.open(googleViewer, "_blank");
//   };

//   // FIND SELECTED FOLDER
//   const findFolder = (id, items) => {
//     for (let f of items) {
//       if (f.id === id) return f;
//       if (f.subfolders.length) {
//         const found = findFolder(id, f.subfolders);
//         if (found) return found;
//       }
//     }
//     return null;
//   };

//   // const selectedFolder = findFolder(selectedFolderId, folders);

//   return (
//     <Box p={1}>
//       {/* Heading */}
//       <Box mb={4} display="flex" flexDirection="column" gap={1}>
//         <Box display="flex" alignItems="center" gap={1}>
//           <IconButton
//             size="small"
//             onClick={() => navigate(-1)}
//             sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
//           >
//             <ArrowBackIcon fontSize="small" />
//           </IconButton>

//           <Typography variant="h5" fontWeight={600}>
//             Customer Profile
//           </Typography>
//         </Box>

//         <Breadcrumbs
//           separator={<NavigateNextIcon fontSize="small" />}
//           sx={{ ml: 5 }}
//         >
//           <Link underline="hover" color="inherit" href="/customer">
//             Customers
//           </Link>
//           <Typography sx={{ color: "#e65f09" }}>Customer Profile</Typography>
//         </Breadcrumbs>
//       </Box>

//       {/* Customer Details */}
//       <Card sx={{ borderRadius: 3, p: 2, mb: 4 }}>
//         <Typography variant="h6" fontWeight={600} mb={2}>
//           Customer Details
//         </Typography>

//         <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
//           {Object.entries(customerData).map(([label, value], idx) => (
//             <Box key={idx}>
//               <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                 {label}
//               </Typography>
//               <Typography
//                 sx={{ mt: 0.5, p: 1, bgcolor: "#fafafa", borderRadius: "8px" }}
//               >
//                 {value || "—"}
//               </Typography>
//             </Box>
//           ))}
//         </Box>
//       </Card>

//       {/* DOCUMENT MANAGER */}
//       <Card sx={{ borderRadius: 3, p: 3, display: "flex", gap: 3 }}>
//         {/* LEFT PANEL */}
//         <Box sx={{ width: 250, borderRight: "1px solid #ddd", pr: 2 }}>
//           <Typography fontWeight={600}>Folders</Typography>

//           <AddFolder placeholder="New Folder" onAdd={handleAddMainFolder} />

//           <FolderTree
//             folders={folders}
//             selectedFolderId={selectedFolderId}
//             setSelectedFolderId={setSelectedFolderId}
//           />
//         </Box>

//         {/* RIGHT PANEL */}
//         <Box sx={{ flex: 1 }}>
//           <Typography fontWeight={600}>
//             {selectedFolder?.name || "Select a folder"}
//           </Typography>

//           {selectedFolder && (
//             <AddFolder
//               placeholder="New Sub-Folder"
//               onAdd={(name) => addSubfolder(selectedFolder.id, name)}
//             />
//           )}

//           <DocumentPanel
//             folder={selectedFolder}
//             addSubfolder={addSubfolder}
//             uploadFiles={uploadFiles}
//             handleViewFile={handleViewFile}
//           />
//         </Box>
//       </Card>
//     </Box>
//   );
// }



// ViewCustomer.jsx
import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Breadcrumbs,
  Link,
  Button,
  TextField,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Paper,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import FolderIcon from "@mui/icons-material/Folder";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import { useNavigate } from "react-router-dom";

/* ---------- TEMP CUSTOMER DATA ---------- */
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

/* ---------- HELPERS ---------- */
const createId = () => Date.now() + Math.floor(Math.random() * 1000);

/* remove folder with id from tree, return [newTree, removedNode or null] */
function removeFolderById(items, id) {
  let removed = null;
  const recurse = (list) =>
    list
      .map((item) => {
        if (item.id === id) {
          removed = item;
          return null;
        }
        if (item.subfolders && item.subfolders.length) {
          const [newSubs, r] = removeFolderById(item.subfolders, id);
          if (r) removed = r;
          return { ...item, subfolders: newSubs };
        }
        return item;
      })
      .filter(Boolean);
  const newItems = recurse(items);
  return [newItems, removed];
}

/* insert node into parentId's subfolders */
function insertFolderInto(items, parentId, node) {
  return items.map((item) => {
    if (item.id === parentId) {
      return { ...item, subfolders: [...item.subfolders, node] };
    }
    if (item.subfolders && item.subfolders.length) {
      return { ...item, subfolders: insertFolderInto(item.subfolders, parentId, node) };
    }
    return item;
  });
}

/* find folder by id */
function findFolderById(list, id) {
  for (const f of list) {
    if (f.id === id) return f;
    if (f.subfolders?.length) {
      const found = findFolderById(f.subfolders, id);
      if (found) return found;
    }
  }
  return null;
}

/* update folder name by id */
function renameFolderById(items, id, newName) {
  return items.map((it) => {
    if (it.id === id) return { ...it, name: newName };
    return { ...it, subfolders: renameFolderById(it.subfolders || [], id, newName) };
  });
}

/* delete folder by id */
function deleteFolderById(items, id) {
  return removeFolderById(items, id)[0];
}

/* insert files into folder */
function addFilesToFolder(items, folderId, filesToAdd) {
  return items.map((it) => {
    if (it.id === folderId) {
      return { ...it, files: [...it.files, ...filesToAdd] };
    }
    return { ...it, subfolders: addFilesToFolder(it.subfolders || [], folderId, filesToAdd) };
  });
}

/* ---------- Reusable add inline component (plus -> input) ---------- */
const AddInline = ({ placeholder = "New Folder", onAdd, sx }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", ...sx }}>
      {!open ? (
        <IconButton
          size="small"
          onClick={() => setOpen(true)}
          sx={{ bgcolor: "#FFE5D6", "&:hover": { bgcolor: "#FFDBBF" } }}
        >
          <AddIcon sx={{ color: "#FF6C0C" }} />
        </IconButton>
      ) : (
        <>
          <TextField
            size="small"
            placeholder={placeholder}
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (!name.trim()) return;
                onAdd(name.trim());
                setName("");
                setOpen(false);
              } else if (e.key === "Escape") {
                setOpen(false);
                setName("");
              }
            }}
            sx={{ flex: 1 }}
          />
          <Button
            size="small"
            variant="contained"
            color="warning"
            onClick={() => {
              if (!name.trim()) return;
              onAdd(name.trim());
              setName("");
              setOpen(false);
            }}
          >
            Add
          </Button>
        </>
      )}
    </Box>
  );
};

/* ---------- Recursive folder tree with drag/drop, rename, delete ---------- */
const FolderTree = ({
  folders,
  selectedFolderId,
  setSelectedFolderId,
  onAddSubfolder,
  onDeleteFolder,
  onRenameFolder,
  onMoveFolder,
}) => {
  const [openMap, setOpenMap] = useState({});
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuFolderId, setMenuFolderId] = useState(null);

  const toggleOpen = (id) => setOpenMap((p) => ({ ...p, [id]: !p[id] }));

  // Drag handlers
  const handleDragStart = (e, id) => {
    e.stopPropagation();
    e.dataTransfer.setData("text/plain", String(id));
    // optionally allow move effect
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();
    const draggedId = Number(e.dataTransfer.getData("text/plain"));
    if (!draggedId || draggedId === targetId) return;

    // prevent dropping into its own descendant
    if (isDescendant(folders, draggedId, targetId)) return;

    onMoveFolder(draggedId, targetId);
  };

  const isDescendant = (list, draggedId, targetId) => {
    const node = findFolderById(list, draggedId);
    if (!node) return false;
    const search = (n) => {
      if (!n.subfolders) return false;
      for (const s of n.subfolders) {
        if (s.id === targetId) return true;
        if (search(s)) return true;
      }
      return false;
    };
    return search(node);
  };

  const openMenu = (e, folderId) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
    setMenuFolderId(folderId);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setMenuFolderId(null);
  };

  const renderNode = (folder, level = 0) => {
    const isOpen = openMap[folder.id];
    return (
      <Box key={folder.id} sx={{ userSelect: "none" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: level * 2,
            py: 0.6,
            borderRadius: 1,
            bgcolor: selectedFolderId === folder.id ? "#FFE5D6" : "transparent",
            "&:hover": { bgcolor: "#FFE5D6" },
          }}
          onDoubleClick={() => toggleOpen(folder.id)}
          draggable
          onDragStart={(e) => handleDragStart(e, folder.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, folder.id)}
        >
          <IconButton
            size="small"
            onClick={(ev) => {
              ev.stopPropagation();
              toggleOpen(folder.id);
            }}
            sx={{ mr: 0.5 }}
          >
            {isOpen ? <ExpandMore fontSize="small" /> : <ChevronRight fontSize="small" />}
          </IconButton>

          <Box
            sx={{ display: "flex", alignItems: "center", flex: 1, cursor: "pointer" }}
            onClick={() => setSelectedFolderId(folder.id)}
          >
            <FolderIcon sx={{ color: "#FF6C0C", mr: 1 }} fontSize="small" />
            <Typography fontSize={13} noWrap>
              {folder.name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Tooltip title="Drag">
              <DragIndicatorIcon fontSize="small" sx={{ opacity: 0.45 }} />
            </Tooltip>
            <IconButton size="small" onClick={(e) => openMenu(e, folder.id)}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* menu for rename / delete */}
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor) && menuFolderId === folder.id} onClose={closeMenu}>
          <MenuItem
            onClick={() => {
              closeMenu();
              const newName = window.prompt("Rename folder", folder.name);
              if (!newName || !newName.trim()) return;
              onRenameFolder(folder.id, newName.trim());
            }}
          >
            <DriveFileRenameOutlineIcon fontSize="small" sx={{ mr: 1 }} />
            Rename
          </MenuItem>
          <MenuItem
            onClick={() => {
              closeMenu();
              const ok = window.confirm(`Delete folder "${folder.name}" and all its contents?`);
              if (!ok) return;
              onDeleteFolder(folder.id);
            }}
          >
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>

        {/* inline add subfolder below this node when open */}
        {isOpen && (
          <Box sx={{ pl: (level + 1) * 2 }}>
            <AddInline placeholder="New Subfolder" onAdd={(name) => onAddSubfolder(folder.id, name)} />
          </Box>
        )}

        {/* children */}
        {isOpen &&
          folder.subfolders.map((s) => (
            <Box key={s.id}>{renderNode(s, level + 1)}</Box>
          ))}
      </Box>
    );
  };

  return (
    <Box>
      {/* top-level inline add */}
      {/* render each top-level folder */}
      {folders.map((f) => (
        <Box key={f.id}>
          {renderNode(f, 0)}
        </Box>
      ))}
    </Box>
  );
};

/* ---------- Document (right panel) ---------- */
const DocumentPanel = ({ folder, onUpload, onView, previewFile, setPreviewFile }) => {
  if (!folder) {
    return <Typography sx={{ color: "gray", mt: 3 }}>Select a folder from the left panel</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
          Upload Files
          <input
            type="file"
            hidden
            multiple
            onChange={(e) => onUpload(folder.id, e)}
          />
        </Button>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {folder.files.length} files
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 1, mb: 2 }}>
        <List dense>
          {folder.files.length ? (
            folder.files.map((f, idx) => (
              <ListItem key={idx} secondaryAction={
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button size="small" onClick={() => { setPreviewFile(f); }}>
                    Preview
                  </Button>
                  <Button size="small" onClick={() => onView(f)}>View</Button>
                </Box>
              }>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary={f.name} secondary={f.type} />
              </ListItem>
            ))
          ) : (
            <Typography sx={{ color: "gray", p: 1 }}>No files uploaded.</Typography>
          )}
        </List>
      </Paper>

      {/* Preview area */}
      <Box>
        {previewFile ? (
          <FilePreview file={previewFile} />
        ) : (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Select a file and click Preview to see it here.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

/* ---------- File preview component ---------- */
const FilePreview = ({ file }) => {
  if (!file) return null;
  const { type, url, name } = file;

  // images
  if (type.startsWith("image/")) {
    return <Box component="img" src={url} alt={name} sx={{ maxWidth: "100%", maxHeight: 500 }} />;
  }

  // pdf
  if (type === "application/pdf") {
    return (
      <iframe
        title={name}
        src={url}
        style={{ width: "100%", height: "600px", border: "none" }}
      />
    );
  }

  // other office docs -> show note and open in new tab for google viewer
  return (
    <Box>
      <Typography>Preview not available for this file type.</Typography>
      <Button
        sx={{ mt: 1 }}
        size="small"
        variant="contained"
        onClick={() => {
          const googleViewer = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
          window.open(googleViewer, "_blank");
        }}
      >
        Open in Google Viewer
      </Button>
    </Box>
  );
};

/* ---------- MAIN PAGE COMPONENT ---------- */
export default function ViewCustomer() {
  const navigate = useNavigate();

  /* initial demo tree */
  const [folders, setFolders] = useState([

  ]);

  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  /* ---------- add main folder ---------- */
  const handleAddMainFolder = (name) => {
    if (!name) return;
    setFolders((prev) => [...prev, { id: createId(), name, files: [], subfolders: [] }]);
  };

  /* ---------- add subfolder ---------- */
  const addSubfolder = (parentId, name) => {
    if (!name) return;
    const addRecursive = (items) =>
      items.map((it) => {
        if (it.id === parentId) {
          return { ...it, subfolders: [...it.subfolders, { id: createId(), name, files: [], subfolders: [] }] };
        }
        return { ...it, subfolders: addRecursive(it.subfolders || []) };
      });
    setFolders((prev) => addRecursive(prev));
  };

  /* ---------- delete folder ---------- */
  const deleteFolder = (folderId) => {
    const [newTree] = removeFolderById(folders, folderId);
    setFolders(newTree);
    if (selectedFolderId === folderId) setSelectedFolderId(null);
  };

  /* ---------- rename folder ---------- */
  const renameFolder = (folderId, newName) => {
    setFolders((prev) => renameFolderById(prev, folderId, newName));
  };

  /* ---------- move folder (drag & drop) ---------- */
  const moveFolder = (draggedId, targetId) => {
    // remove dragged
    const [removedTree, node] = removeFolderById(folders, draggedId);
    if (!node) return;
    // insert into target
    const newTree = insertFolderInto(removedTree, targetId, node);
    setFolders(newTree);
  };

  /* ---------- upload files to folder ---------- */
  const uploadFiles = (folderId, e) => {
    const uploaded = Array.from(e.target.files).map((file) => ({
      name: file.name,
      type: file.type || "application/octet-stream",
      url: URL.createObjectURL(file),
      raw: file,
    }));
    setFolders((prev) => addFilesToFolder(prev, folderId, uploaded));
  };

  /* ---------- view handler (open in new tab / google viewer) ---------- */
  const handleViewFile = (file) => {
    const { url, type } = file;
    if (type === "application/pdf" || type.startsWith("image/")) {
      window.open(url, "_blank");
      return;
    }
    const googleViewer = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
    window.open(googleViewer, "_blank");
  };

  /* ---------- find selected folder (deep) ---------- */
  const selectedFolder = findFolderById(folders, selectedFolderId);

  /* ---------- move root-level: allow dropping onto special root drop area? (not included) ---------- */

  /* ---------- UI ---------- */
  return (
    <Box p={1}>
      {/* Heading & breadcrumbs */}
      <Box mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton size="small" onClick={() => navigate(-1)}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5" fontWeight={600}>
            Customer Profile
          </Typography>
        </Box>

        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mt: 1 }}>
          <Link underline="hover" color="inherit" href="/customer">Customers</Link>
          <Typography sx={{ color: "#e65f09" }}>Customer Profile</Typography>
        </Breadcrumbs>
      </Box>

      {/* Customer details card (short) */}
      <Card sx={{ borderRadius: 2, p: 2, mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>Customer Details</Typography>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} mt={2}>
          {Object.entries(customerData).map(([k, v]) => (
            <Box key={k}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{k}</Typography>
              <Typography sx={{ mt: 0.5, bgcolor: "#fafafa", p: 1, borderRadius: 1 }}>{v}</Typography>
            </Box>
          ))}
        </Box>
      </Card>

      {/* Main Document Manager */}
      <Card sx={{ borderRadius: 2, p: 2 }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* LEFT PANEL */}
          <Box sx={{ width: 300, borderRight: "1px solid #eee", pr: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Typography fontWeight={700}>EXPLORER</Typography>
              <Box><AddInline placeholder="New folder" onAdd={handleAddMainFolder} /></Box>
            </Box>

            <Divider sx={{ mb: 1 }} />

            <Box sx={{ maxHeight: 520, overflowY: "auto" }}>
              <FolderTree
                folders={folders}
                selectedFolderId={selectedFolderId}
                setSelectedFolderId={setSelectedFolderId}
                onAddSubfolder={addSubfolder}
                onDeleteFolder={deleteFolder}
                onRenameFolder={renameFolder}
                onMoveFolder={moveFolder}
              />
            </Box>
          </Box>

          {/* RIGHT PANEL */}
          <Box sx={{ flex: 1, pl: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Typography fontWeight={700}>{selectedFolder?.name || "Select a folder"}</Typography>
              {/* Right panel used to have add inline - we keep it but it's optional; your requirement moves add inline to left tree */}
              {selectedFolder && <AddInline placeholder="New subfolder" onAdd={(name) => addSubfolder(selectedFolder.id, name)} />}
            </Box>

            <Divider sx={{ mb: 2 }} />

            <DocumentPanel
              folder={selectedFolder || { files: [] }}
              onUpload={uploadFiles}
              onView={handleViewFile}
              previewFile={previewFile}
              setPreviewFile={setPreviewFile}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
