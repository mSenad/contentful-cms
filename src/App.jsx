import { useEffect, useState } from "react";

import ContentfulClient from "./contentful/client/index.js";

import { ProductList } from "./components/Products/index";

import "./App.css";

const CATEGORY_ID = "category";
const PRODUCT_ID = "product";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function fetchContentfulProducts() {
      ContentfulClient.getEntries().then(({ items }) => {
        const hasItems = items.length > 0;

        if (hasItems) {
          setProducts(filterProducts(items));
          setCategories(filterCategories(items));
        }
      });
    }
    fetchContentfulProducts();
  }, []);

  return (
    <div className="App">
      <h1>Contentful Products</h1>
      <ProductList {...{ products }} />
    </div>
  );
}

function filterProducts(list) {
  return list.filter(
    ({
      sys: {
        contentType: {
          sys: { id },
        },
      },
    }) => id === PRODUCT_ID
  );
}

function filterCategories(list) {
  return list.filter(
    ({
      sys: {
        contentType: {
          sys: { id },
        },
      },
    }) => id === CATEGORY_ID
  );
}

export default App;
