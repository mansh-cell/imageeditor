import "./styles.css";
import SearchImage from "./components/searchImages";
import ImageResults from "./components/imageResults";
import { useEffect, useState } from "react";
import { fetchImages } from "./Services/imageFetch";
import CanvassEditor from "./components/canvassEditor";

export default function App() {
  const [imageRes, setImageRes] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingimage, seteditingimage] = useState(null);

  const setEditing = () => {
    setIsEditing(true);
  };

  const getImages = async (term) => {
    setIsLoading(true);
    try {
      const fetchedimages = await fetchImages(term);
      setImageRes(fetchedimages);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleeditImage = (image) => {
    seteditingimage(image.urls.full);
    console.log("editingimage");
  };

  return (
    <div className="App">
      {editingimage == null && (
        <div className="search-container">
          {" "}
          <SearchImage onSearch={getImages} />
          <br />
          {imageRes.length == 0 && <p>Search for an Image Above</p>}
          {isloading ? (
            <p>Loading... </p>
          ) : (
            <ImageResults images={imageRes} onEditImage={handleeditImage} />
          )}
        </div>
      )}
      {editingimage != null && (
        <div className="canvass-editor">
          {" "}
          <CanvassEditor imageSrc={editingimage} />{" "}
        </div>
      )}
    </div>
  );
}
