import React from "react";
import ProductForm from "../components/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import { editProduct } from "../api/productAPI";

const EditProduct = () => {
  const { state, dispatch } = useProductContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const productToEdit = state.products.find((product) => product._id === id);

  const handleSave = async(updatedProduct) => {
    try{
      const response = await editProduct(`/api/products/${updatedProduct._id}`,updatedProduct)
      dispatch({ type: "EDIT_PRODUCT", payload: response });
      navigate("/");
    }
    catch(err){
      console.log('err',err)
      alert("error occured")
    }
  };

  return (
    <div style={{ padding: "0 3rem" }}>
      <h3>Edit Product</h3>
      <ProductForm initialProduct={productToEdit} onSave={handleSave} />
    </div>
  );
};

export default EditProduct;
