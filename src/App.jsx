import { useEffect, useState } from "react";

import ContentfulClient from "./contentful/client/index.js";

import { ProductList } from "./components/Products/index";

import "./App.css";

const CONTENT_TYPE_CATEGORY_ID = "category";
const CONTENT_TYPE_PRODUCT_ID = "product";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function fetchContentfulProducts() {
      ContentfulClient.getEntries().then(({ items }) => {
        const hasItems = items.length > 0;

        if (hasItems) {
          setProducts(filterItemsByContentType(items, CONTENT_TYPE_PRODUCT_ID));
          setCategories(
            filterItemsByContentType(items, CONTENT_TYPE_CATEGORY_ID)
          );
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

function filterItemsByContentType(list, entityId) {
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
