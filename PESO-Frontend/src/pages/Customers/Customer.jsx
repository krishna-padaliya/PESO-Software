import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Paper,
  IconButton,
  TablePagination,
  Breadcrumbs,
  Link,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const customersData = [
  {
    id: 1,
    name: "Krishna Padaliya",
    phone: "9191919191",
    email: "krishna@example.com",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@example.com",
  },
  {
    id: 3,
    name: "Sneha Patel",
    phone: "9123456789",
    email: "sneha@example.com",
  },
  { id: 4, name: "Amit Verma", phone: "7878787878", email: "amit@example.com" },
  { id: 5, name: "Riya Mehta", phone: "9090909090", email: "riya@example.com" },
  { id: 6, name: "Jay Patel", phone: "9898989898", email: "jay@example.com" },
  // Add more data here...
];

export default function Customer() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredCustomers = customersData.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Box p={1}>
      {/* Heading & Breadcrumb */}
      <Box mb={4} display="flex" flexDirection="column" gap={1}>
        {/* Heading with Arrow */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            size="small"
            onClick={() => navigate(-1)}
            sx={{
              // border: "1px solid #ccc",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>

          <Typography variant="h5" fontWeight={600}>
            Customers
          </Typography>
        </Box>

        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ ml: 5 }}
        >
          <Link underline="hover" color="inherit" href="/">
            Dashboard
          </Link>
          {/* <Link underline="hover" color="inherit" href="/customers">
          Customers
        </Link> */}
          <Typography sx={{ color: "#e65f09" }}>Customers</Typography>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Search Bar */}
        <TextField
          size="small"
          placeholder="Search customer..."
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: { xs: "100%", sm: "280px" },
            background: "#fff",
            borderRadius: "10px",
            "& fieldset": { borderRadius: "10px" },
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#555" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Add New Customer Button */}
        <Button
          variant="contained"
          onClick={() => navigate("/addNewCustomer")}
          startIcon={<AddIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            px: 2.5,
            py: 1,
            backgroundColor: "#e65f09",
            "&:hover": { backgroundColor: "#FF6C0C" },
          }}
        >
          Add New Customer
        </Button>
      </Box>

      {/* Customer Table */}
      <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    bgcolor: "#e65f09",
                    color: "#fff",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Sr No
                </TableCell>

                <TableCell
                  sx={{
                    bgcolor: "#e65f09",
                    color: "#fff",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Customer Name
                </TableCell>

                <TableCell
                  sx={{
                    bgcolor: "#e65f09",
                    color: "#fff",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Phone
                </TableCell>

                <TableCell
                  sx={{
                    bgcolor: "#e65f09",
                    color: "#fff",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: "#e65f09",
                    color: "#fff",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer, index) => (
                  <TableRow
                    key={customer.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255, 123, 0, 0.06)",
                      },
                    }}
                  >
                    <TableCell align="center">
                      {page * rowsPerPage + index + 1}.
                    </TableCell>

                    <TableCell align="center">{customer.name}</TableCell>

                    <TableCell align="center">{customer.phone}</TableCell>
                    <TableCell align="center">{customer.email}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={1}>
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: "#e0f7fa",
                            "&:hover": { bgcolor: "#b2ebf2" },
                          }}
                          // onClick={() => handleView(customer.id)}
                          onClick={() => navigate("/viewCustomer")}
                        >
                          <VisibilityIcon
                            sx={{ fontSize: 20, color: "#007b9e" }}
                          />
                        </IconButton>

                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: "#fff3e0",
                            "&:hover": { bgcolor: "#ffe0b2" },
                          }}
                           onClick={() => navigate("/editCustomer")}
                        >
                          <EditIcon sx={{ fontSize: 20, color: "#e65f09" }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={customersData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
}
