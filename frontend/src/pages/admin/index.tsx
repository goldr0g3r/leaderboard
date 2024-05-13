import "./style.css";

import React, { useState } from "react";

const AdminPage = () => {
  async function SearchUserCall() {
      const [qurey, setQuery] = useState('');
          const [filteredItems, setFilteredItems] = useState([]);      

    const searchInput = document.getElementById(
      "search-input"
    ) as HTMLInputElement;
    const searchButton = document.getElementById(
      "search-button"
    ) as HTMLButtonElement;

    const searchInputValue = searchInput.value;
    searchInput.value = "";
    searchInput.focus();

    if (searchInputValue === "") {
      return;
    }

    const response = await fetch(`/api/search?player=${searchInputValue}`);
    const data = await response.json();

    console.log(data);
  }

  const handleClickEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    SearchUserCall();
  };

  return (
    <div className="container">
      <form role="search" id="search-form">
        <label htmlFor="search-input">Search User</label>
        <input type="text" name="player" id="search-input" />
        <button id="search-button">Search</button>
      </form>
    </div>
  );
};

export default AdminPage;
