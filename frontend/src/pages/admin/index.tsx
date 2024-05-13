import { IUser } from "../../interface/IUser";
import "./style.css";
import React, { useState } from "react";

const AdminPage = () => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [createUser, setCreateUser] = useState<IUser>({
    ntid: "",
    name: "",
    department: "",
    totalScore: 0,
    individualScore: {},
  });
  const [createStatus, setCreateStatus] = useState<boolean>(false);

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

        {(user || createStatus) && (
          <button
            className="button"
            onClick={() => {
              setUser(undefined);
              setCreateStatus(false);
            }}
          >
            Clear Selection
          </button>
        )}
      </form>
      {user && (
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
              placeholder="NT ID"
            />
            <input
              className="form-input"
              type="text"
              name="player"
              id="create-input"
              placeholder="Name"
            />
            <input
              type="text"
              className="form-input"
              name="player"
              id="create-input"
              placeholder="Department"
            />
            <div className="gamescore-grid">
              <input
                type="text"
                name="player"
                className="form-input"
                id="create-input"
                placeholder="Game 1 Score"
              />
              <input
                type="text"
                name="player"
                className="form-input"
                id="create-input"
                placeholder="Game 2 Score"
              />
              <input
                type="text"
                name="player"
                className="form-input"
                id="create-input"
                placeholder="Game 3 Score"
              />
              <input
                type="text"
                name="player"
                className="form-input"
                id="create-input"
                placeholder="Game 4 Score"
              />
              <input
                type="text"
                name="player"
                className="form-input"
                id="create-input"
                placeholder="Game 5 Score"
              />
              <input
                type="text"
                name="player"
                className="form-input"
                id="create-input"
                placeholder="Game 6 Score"
              />
            </div>
            <button className="button" id="create-button">
              Edit
            </button>
          </form>
        </div>
      )}
      {createStatus && (
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
            <button className="button" id="create-button">
              Create
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
