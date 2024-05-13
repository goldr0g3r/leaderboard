import "style.css";

import React, { useState } from "react";
// takes in the search query and returns the api response and if not found returns a create user form
const CreateUser = () => {
  async function SearchUserCall() {
    const [qurey, setQuery] = useState("");
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
    <div className="search-container">
      <form role="search" id="search-form">
        <label htmlFor="search-input">Search User</label>
        <input type="text" name="player" id="search-input" />
        <button id="search-button">Search</button>
      </form>
      <div className="edit-user">
        <h2>Edit User</h2>
        <form id="create-form">
          <label htmlFor="create-input">Edit User</label>
          <input
            type="text"
            name="player"
            id="create-input"
            placeholder="Score"
          />
          <button id="create-button">Edit</button>

        </form>
      </div>{" "}
    </div>
  );
};
