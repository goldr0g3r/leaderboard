import "./style.css";

import React, { useState } from "react";

const AdminPage = () => {
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
