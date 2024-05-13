import "./style.css";

import React, { useState } from "react";

const AdminPage = () => {
  async function SearchUserCall() {
    const [qurey, setQuery] = useState("");
    const [user, setUser] = useState<any>(undefined);

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
      {/* */}
      <div className="edit-user">
        <h2>Edit User</h2>
        <form id="create-form">
          <label htmlFor="create-input">Edit User</label>
          <input
            type="text"
            name="player"
            id="create-input"
            placeholder="name"
          />
          <input
            type="text"
            name="player"
            id="create-input"
            placeholder="Department"
          />
          <input
            type="text"
            name="player"
            id="create-input"
            placeholder="Score"
          />

          <button id="create-button">Create</button>
        </form>
      </div>{" "}
    </div>
  );
};

export default AdminPage;
