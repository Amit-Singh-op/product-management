import React from "react";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div>
      <div style={{ padding: "0 3rem" }}>
        <h3>Product List</h3>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
