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

export default App;
