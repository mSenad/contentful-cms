import React from "react";
import { Product } from "./index";

function ProductList({ products }) {
  const renderProduct = (product) => (
    <Product key={product.sys.id} data={product} />
  );
  return <div className="products-list">{products.map(renderProduct)}</div>;
}

export default ProductList;
