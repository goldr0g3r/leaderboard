import { api } from "../../api";
import IApiResponse from "../../interface/IApiResponse";
import { IUser } from "../../interface/IUser";
import "./style.css";
import React, { useState } from "react";

const AdminPage = () => {
  const [search, setSearch] = useState<string>("");
  const [ntid, setNtid] = useState<string>("");
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [createUser, setCreateUser] = useState<IUser>({
    ntid: "",
    name: "",
    department: "",
    totalScore: 0,
    individualScore: {},
  });
  const [createStatus, setCreateStatus] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  async function searchHandler() {
    try {
      setSuccess("");
      setError("");
      const response = await api.get<IApiResponse<IUser>>(
        `/user/get/${search}`
      );

      if (!response.data) {
        setError("No Response From Server");
        return;
      }
      if (!response.data.status) {
        setCreateStatus(true);
        setCreateUser({
          ntid: search,
          name: "",
          department: "",
          totalScore: 0,
          individualScore: {},
        });
        return;
      }

      setUser(response.data.data);
      setNtid(response.data.data?.ntid || "");
    } catch (error) {
      setError("Unknown Error Occurred");
    }
  }

  async function createHandler() {
    try {
      setSuccess("");
      setError("");
      const user = await api.post<IApiResponse<IUser>>("/user/create", {
        ntid: createUser.ntid,
        name: createUser.name,
        department: createUser.department,
      });

      if (!user.data) {
        setError("No Response From Server");
        return;
      }

      if (!user.data.status) {
        setError(user.data.message);
        return;
      }

      setUser(user.data.data);
      setNtid(user.data.data?.ntid || "");
      setCreateStatus(false);
    } catch (error) {
      setError("Unknown Error Occurred");
    }
  }

  async function editHandler() {
    try {
      setSuccess("");
      setError("");
      const new_user = await api.patch<IApiResponse<IUser>>(
        `/user/edit/${ntid}`,
        user
      );

      if (!new_user.data) {
        setError("No Response From Server");
        return;
      }

      if (!new_user.data.status) {
        setError(new_user.data.message);
        return;
      }

      setUser(new_user.data.data);
      setNtid(new_user.data.data?.ntid || "");
      setSuccess(new_user.data.message);
    } catch (error) {
      setError("Unknown Error Occurred");
    }
  }

  return (
    <div className="search-container">
      <h1>Admin Page</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          setUser(undefined);
          setCreateStatus(false);
          setNtid("");
          searchHandler();
        }}
      >
        <label htmlFor="search-input" className="form-label">
          Search User
        </label>
        <input
          className="form-input"
          type="text"
          name="player"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="button" type="submit" id="search-button">
          Search
        </button>

        {(user || createStatus) && (
          <button
            className="button"
            onClick={() => {
              setUser(undefined);
              setCreateStatus(false);
              setSearch("");
              setNtid("");
            }}
          >
            Clear Selection
          </button>
        )}
      </form>
      {user && (
        <div className="edit-user">
          <form
            id="create-form"
            onSubmit={(e) => {
              e.preventDefault();
              editHandler();
            }}
          >
            <label className="form-label" htmlFor="create-input">
              Edit User
            </label>
            <input
              className="form-input"
              type="text"
              name="player"
              id="create-input"
              placeholder="NT ID"
              value={user.ntid}
              onChange={(e) => {
                setUser({ ...user, ntid: e.target.value });
              }}
            />
            <input
              className="form-input"
              type="text"
              name="player"
              id="create-input"
              placeholder="Name"
              value={user.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
            <input
              type="text"
              className="form-input"
              name="player"
              id="create-input"
              placeholder="Department"
              value={user.department}
              onChange={(e) => {
                setUser({ ...user, department: e.target.value });
              }}
            />
            <div className="gamescore-grid">
              <div className="game-form">
                <h2>M-Parivahan</h2>
                <input
                  type="number"
                  name="player"
                  className="form-input"
                  id="create-input"
                  placeholder="Game 1 Score"
                  value={
                    user.individualScore && user.individualScore[0]
                      ? user.individualScore[0]
                      : ""
                  }
                  onChange={(e) => {
                    setUser({
                      ...user,
                      individualScore: {
                        ...user.individualScore,
                        0: Number(e.target.value),
                      },
                    });
                  }}
                />
              </div>
              <div className="game-form">
                <h2>ROhan, Soja</h2>

                <input
                  type="number"
                  name="player"
                  className="form-input"
                  id="create-input"
                  placeholder="Game 2 Score"
                  value={
                    user.individualScore && user.individualScore[1]
                      ? user.individualScore[1]
                      : ""
                  }
                  onChange={(e) => {
                    setUser({
                      ...user,
                      individualScore: {
                        ...user.individualScore,
                        1: Number(e.target.value),
                      },
                    });
                  }}
                />
              </div>
              <div className="game-form">
                <h2> Car Part Challenge</h2>
                <input
                  type="number"
                  name="player"
                  className="form-input"
                  id="create-input"
                  placeholder="Game 3 Score"
                  value={
                    user.individualScore && user.individualScore[2]
                      ? user.individualScore[2]
                      : ""
                  }
                  onChange={(e) => {
                    setUser({
                      ...user,
                      individualScore: {
                        ...user.individualScore,
                        2: Number(e.target.value),
                      },
                    });
                  }}
                />
              </div>
              <div className="game-form">
                <h2>Can you ID that Car</h2>
                <input
                  type="number"
                  name="player"
                  className="form-input"
                  id="create-input"
                  placeholder="Game 4 Score"
                  value={
                    user.individualScore && user.individualScore[3]
                      ? user.individualScore[3]
                      : ""
                  }
                  onChange={(e) => {
                    setUser({
                      ...user,
                      individualScore: {
                        ...user.individualScore,
                        3: Number(e.target.value),
                      },
                    });
                  }}
                />
              </div>
              <div className="game-form">
                <h2>PictoGuess</h2>
                <input
                  type="number"
                  name="player"
                  className="form-input"
                  id="create-input"
                  placeholder="Game 5 Score"
                  value={
                    user.individualScore && user.individualScore[4]
                      ? user.individualScore[4]
                      : ""
                  }
                  onChange={(e) => {
                    setUser({
                      ...user,
                      individualScore: {
                        ...user.individualScore,
                        4: Number(e.target.value),
                      },
                    });
                  }}
                />
              </div>
              <div className="game-form">
                <h2>Two Truths and a lie</h2>
                <input
                  type="number"
                  name="player"
                  className="form-input"
                  id="create-input"
                  placeholder="Game 6 Score"
                  value={
                    user.individualScore && user.individualScore[5]
                      ? user.individualScore[5]
                      : ""
                  }
                  onChange={(e) => {
                    setUser({
                      ...user,
                      individualScore: {
                        ...user.individualScore,
                        5: Number(e.target.value),
                      },
                    });
                  }}
                />
              </div>
            </div>
            <button className="button" id="create-button">
              Edit
            </button>
          </form>
        </div>
      )}
      {createStatus && (
        <div className="edit-user">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              createHandler();
            }}
          >
            <label className="form-label" htmlFor="create-input">
              Create User
            </label>
            <input
              className="form-input"
              type="text"
              name="player"
              id="create-input"
              placeholder="name"
              value={createUser.name}
              onChange={(e) =>
                setCreateUser({ ...createUser, name: e.target.value })
              }
            />
            <input
              type="text"
              className="form-input"
              name="player"
              id="create-input"
              placeholder="Department"
              value={createUser.department}
              onChange={(e) =>
                setCreateUser({ ...createUser, department: e.target.value })
              }
            />
            <button className="button" type="submit" id="create-button">
              Create
            </button>
          </form>
        </div>
      )}
      <div className="message-container">
        <div className="success-message-container">
          {success && <h2 className="success-message">{success}</h2>}
        </div>

        <div className="error-message-container">
          {error && <h2 className="error-message">{error}</h2>}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
