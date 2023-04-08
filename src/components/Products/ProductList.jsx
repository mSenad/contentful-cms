import React from "react";
import { Product } from "./index";

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="no-products-data">
        Products not found. Check your Contentful dashboard for more
        information.
      </div>
    );
  }
  const renderProduct = (product) => {
    if (!product) {
      return null;
    }
    return <Product key={product.sys.id} data={product} />;
  };
  return <div className="products-list">{products.map(renderProduct)}</div>;
}

export default ProductList;
