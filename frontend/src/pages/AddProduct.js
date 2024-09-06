import React from "react";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import { addProduct } from "../api/productAPI";

const AddProduct = () => {
  const { dispatch } = useProductContext();
  const navigate = useNavigate();

  const handleSave = async(newProduct) => {
    try{
      const response = await addProduct('/api/products',newProduct)
      dispatch({ type: "ADD_PRODUCT", payload: response });
      navigate("/");
    }
    catch(err){
      console.log('err',err)
      alert("error occured")
    }
  };

  return (
    <div style={{ padding: "0 3rem" }}>
      <h3>Add Product</h3>
      <ProductForm onSave={handleSave} />
    </div>
  );
};

export default AddProduct;
