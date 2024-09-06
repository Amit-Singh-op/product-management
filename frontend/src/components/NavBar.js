import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Product Management
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ fontWeight: "bold" }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/add"
          sx={{ fontWeight: "bold" }}
        >
          Add Product
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
