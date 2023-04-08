import { createClient } from "contentful";

const ContentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_DELIVERY_ACCESS_TOKEN,
});

export default ContentfulClient;
