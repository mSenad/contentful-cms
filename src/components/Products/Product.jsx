import React from "react";

function Product({ data }) {
  const {
    fields: { productName, productPrice, productDescription, productImage },
  } = data;
  return (
    <div className="product-item">
      <div className="product-item__image">
        <img
          src={productImage.fields.file.url}
          alt={productImage.fields.description}
        />
      </div>
      <h4>
        {productName} - ${productPrice}
      </h4>
      <p>{productDescription}</p>
    </div>
  );
}

export default Product;
