import api from "../../api";
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
        `/auth/user/get/${search}`
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
      const user = await api.post<IApiResponse<IUser>>("/auth/user/create", {
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
        `/auth/user/edit/${ntid}`,
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

            <label className="input-label">NTID</label>
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
            <label className="input-label">Name</label>

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
            <label className="input-label">Dept.</label>

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
                    user.individualScore && user.individualScore[0].score
                      ? user.individualScore[0].score
                      : ""
                  }
                  onChange={(e) => {
                    setUser({
                      ...user,
                      individualScore: {
                        ...user.individualScore,
                        0: { score: Number(e.target.value), games: {} },
                      },
                    });
                  }}
                />
              </div>
              <div className="game-form">
                <h2>Rohan, Soja</h2>
                <div className="with-label">
                  <label className="input-label">Rubiks Cube</label>
                  <input
                    className="form-input"
                    type="number"
                    name="rubiks-cube"
                    placeholder="Rubiks Cube"
                    value={
                      user.individualScore &&
                      user.individualScore[1].games.rubiksCube
                        ? user.individualScore[1].games.rubiksCube
                        : ""
                    }
                    onChange={(e) => {
                      setUser({
                        ...user,
                        individualScore: {
                          ...user.individualScore,
                          1: {
                            score: 0,
                            games: {
                              ...user.individualScore[1].games,
                              rubiksCube: Number(e.target.value),
                            },
                          },
                        },
                      });
                    }}
                  />
                </div>
                <div className="with-label">
                  <label className="input-label">Carroms</label>
                  <input
                    className="form-input"
                    type="number"
                    name="carroms"
                    placeholder="Carroms"
                    value={
                      user.individualScore &&
                      user.individualScore[1].games.carroms
                        ? user.individualScore[1].games.carroms
                        : ""
                    }
                    onChange={(e) => {
                      setUser({
                        ...user,
                        individualScore: {
                          ...user.individualScore,
                          1: {
                            score: 0,
                            games: {
                              ...user.individualScore[1].games,
                              carroms: Number(e.target.value),
                            },
                          },
                        },
                      });
                    }}
                  />
                </div>
                <div className="with-label">
                  <label className="input-label">Untangled Score</label>
                  <input
                    className="form-input"
                    type="number"
                    name="untangled-score"
                    placeholder="Untangled Score"
                    value={
                      user.individualScore &&
                      user.individualScore[1].games.untangle
                        ? user.individualScore[1].games.untangle
                        : ""
                    }
                    onChange={(e) => {
                      setUser({
                        ...user,
                        individualScore: {
                          ...user.individualScore,
                          1: {
                            score: 0,
                            games: {
                              ...user.individualScore[1].games,
                              untangle: Number(e.target.value),
                            },
                          },
                        },
                      });
                    }}
                  />
                </div>
                <div className="with-label">
                  <label className="input-label">Foosball</label>
                  <input
                    type="number"
                    name="foosball"
                    className="form-input"
                    placeholder="foosball"
                    value={
                      user.individualScore &&
                      user.individualScore[1].games.foosball
                        ? user.individualScore[1].games.foosball
                        : ""
                    }
                    onChange={(e) => {
                      setUser({
                        ...user,
                        individualScore: {
                          ...user.individualScore,
                          1: {
                            score: 0,
                            games: {
                              ...user.individualScore[1].games,
                              foosball: Number(e.target.value),
                            },
                          },
                        },
                      });
                    }}
                  />
                </div>
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
                    user.individualScore && user.individualScore[2].score
                      ? user.individualScore[2].score
                      : ""
                  }
                  onChange={(e) => {
                    setUser({
                      ...user,
                      individualScore: {
                        ...user.individualScore,
                        2: { score: Number(e.target.value), games: {} },
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
                    user.individualScore && user.individualScore[3].score
                      ? user.individualScore[3].score
                      : ""
                  }
                  onChange={(e) => {
                    setUser({
                      ...user,
                      individualScore: {
                        ...user.individualScore,
                        3: {
                          score: Number(e.target.value),
                          games: {},
                        },
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
                    user.individualScore && user.individualScore[4].score
                      ? user.individualScore[4].score
                      : ""
                  }
                  onChange={(e) => {
                    setUser({
                      ...user,
                      individualScore: {
                        ...user.individualScore,
                        4: { score: Number(e.target.value), games: {} },
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
                    user.individualScore && user.individualScore[5].score
                      ? user.individualScore[5].score
                      : ""
                  }
                  onChange={(e) => {
                    setUser({
                      ...user,
                      individualScore: {
                        ...user.individualScore,
                        5: { score: Number(e.target.value), games: {} },
                      },
                    });
                  }}
                />
              </div>
            </div>
            <button className="button" id="create-button">
              Update User
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
            <div className="with-label">
              <label className="input-label">Name</label>
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
            </div>
            <div className="with-label">
              <label className="input-label">Dept.</label>
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
            </div>
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
