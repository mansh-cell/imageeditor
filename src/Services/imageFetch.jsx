import axios from "axios";

const unsplash_api_url = "https://api.unsplash.com/search/photos";

export const fetchImages = async (query) => {
  try {
    const res = await axios.get(unsplash_api_url, {
      params: {
        query,
        client_id: "-Sd30JuNstEj3r0JUQbQs1MFsfryLnha3IsIhMiAEl4",
        per_page: 20,
      },
    });
    console.log("in api call", res.data.results);
    return res.data.results;
  } catch (err) {
    console.error("Error in fetching", err);
    return [];
  }
};
