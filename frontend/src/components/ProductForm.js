import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  Switch,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";

const ProductForm = ({ initialProduct, onSave }) => {
  const [product, setProduct] = useState(
    initialProduct || {
      name: "",
      description: "",
      price: '',
      isRecommended: false,
      isBestseller: false,
      status: "",
    }
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name==='price'? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, price } = product;
    if (!name || !description || !price) {
      setSnackbarOpen(true);
      return;
    }
    onSave({ ...product, id: product.id || Date.now().toString() });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          fullWidth
          type="number"
        />
        <div style={{ display: "flex" }}>
          <FormControlLabel
            control={
              <Switch
                checked={product.isRecommended}
                onChange={handleChange}
                name="isRecommended"
              />
            }
            label="Recommended"
          />
          <FormControlLabel
            control={
              <Switch
                checked={product.isBestseller}
                onChange={handleChange}
                name="isBestseller"
              />
            }
            label="Bestseller"
          />
        </div>

        <FormControl required variant="outlined">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={product.status}
            onChange={handleChange}
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Some fields are missing
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductForm;
