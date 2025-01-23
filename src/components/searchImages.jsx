import React, { useState } from "react";

const SearchImage = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="searchBox">
      <form onSubmit={searchHandler}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search Images..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
export default SearchImage;
