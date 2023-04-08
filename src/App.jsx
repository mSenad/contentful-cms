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
          setProducts(filterItemsByEntity(items, PRODUCT_ID));
          setCategories(filterItemsByEntity(items, CATEGORY_ID));
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

function filterItemsByEntity(list, entityId) {
  return list.filter(
    ({
      sys: {
        contentType: {
          sys: { id },
        },
      },
    }) => id === entityId
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
