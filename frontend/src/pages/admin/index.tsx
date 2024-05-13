import "./style.css";

import React, { useState } from "react";

const AdminPage = () => {
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
      <form className="form" role="search" id="search-form">
        <label htmlFor="search-input" className="form-label">
          Search User
        </label>
        <input
          className="form-input"
          type="text"
          name="player"
          id="search-input"
        />
        <button className="button" id="search-button">
          Search
        </button>
      </form>
      <div className="edit-user">
        <form id="create-form">
          <label className="form-label" htmlFor="create-input">
            Edit User
          </label>
          <input
            className="form-input"
            type="text"
            name="player"
            id="create-input"
            placeholder="Score"
          />
          <button className="button" id="create-button">
            Edit
          </button>
        </form>
      </div>{" "}
      {/* */}
      <div className="edit-user">
        <form className="form" id="create-form">
          <label className="form-label" htmlFor="create-input">
            Create User
          </label>
          <input
            className="form-input"
            type="text"
            name="player"
            id="create-input"
            placeholder="name"
          />
          <input
            type="text"
            className="form-input"
            name="player"
            id="create-input"
            placeholder="Department"
          />
          <input
            type="text"
            name="player"
            className="form-input"
            id="create-input"
            placeholder="Score"
          />

          <button className="button" id="create-button">
            Create
          </button>
        </form>
      </div>{" "}
    </div>
  );
};

export default AdminPage;
