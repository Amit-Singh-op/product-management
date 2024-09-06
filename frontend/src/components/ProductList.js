import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Paper,
  Snackbar,
  Alert,
  Switch,
  Pagination,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import { useProductContext } from "../context/productContext";
import LoadingScreen from "./LoadingScreen";
import { deleteProduct, getProducts } from "../api/productAPI";

const ProductRow = ({ product }) => {
  const { dispatch } = useProductContext();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleDelete = async() => {
    try{
      await deleteProduct('/api/products',product._id)
      dispatch({ type: "DELETE_PRODUCT", payload: product._id });
    }
    catch(err){
      console.log('err',err)
      alert("error occured")
    }
    setConfirmOpen(false);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  console.log("prudtc is",product)

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {product.name}
        </TableCell>
        <TableCell>${product.price}</TableCell>
        <TableCell>
          <Switch checked={product.isRecommended} color="primary" />
        </TableCell>
        <TableCell>
          <Switch checked={product.isBestseller} color="primary" />
        </TableCell>
        <TableCell align="center">
          <IconButton
            component={Link}
            to={`/edit/${product._id}`}
            aria-label="edit"
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => setConfirmOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div>
                <strong>Description:</strong> {product.description}
              </div>
              <div>
                <strong>Status:</strong> {product.status}
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Product"
        content={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product "{product.name}" has been deleted successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

const ProductList = () => {
  const { state,dispatch } = useProductContext();
  const[loading,setLoading]=useState(false)
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(()=>{
    setLoading(true)
    const getProductList=async()=>{
      try{
        const response = await getProducts('/api/products')
        dispatch({ type: 'SET_PRODUCTS', payload: response });
      }
      catch(err){
        console.error("err",err)
      }
      setLoading(false)
    }
    getProductList()
  },[dispatch])


  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const productsToDisplay = state.products?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (state.products?.length === 0) {
    return <p>No products available. Please add some products.</p>;
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="product table" size="small">
              <TableHead sx={{ height: "50px" }}>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>TITLE</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    SELLING PRICE
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>RECOMMENDED</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>BEST SELLER</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    ACTIONS
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {productsToDisplay?.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={Math.ceil(state.products?.length / rowsPerPage)}
            page={page + 1}
            onChange={handleChangePage}
            color="primary"
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          />
        </>
      )}
    </>
  );
};

export default ProductList;
