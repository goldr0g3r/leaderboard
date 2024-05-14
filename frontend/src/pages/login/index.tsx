import { useState } from "react";
import LoadingScreen from "../../components/loading";
import "./style.css";
import api from "../../api";
import IApiResponse from "../../interface/IApiResponse";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login() {
    try {
      if (!username || !password) {
        setError("Please fill in all fields");
        return;
      }
      setError("");
      setLoading(true);
      const response = await api.post<IApiResponse<string | undefined>>(
        "/public/login",
        {
          username,
          password,
        }
      );

      if (!response || !response.data) {
        setError("Unable to login, please try again");
        setLoading(false);
        return;
      }
      if (!response.data.status || !response.data.data) {
        setError(response.data.message);
        setLoading(false);
        return;
      }

      sessionStorage.setItem("token", response.data.data);
      window.location.href = "/admin";
    } catch (error) {
      setError("Unable to login, please try again");
      setLoading(false);
    }
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          {error && (
            <h3
              className="error"
              style={{
                color: "red",
                fontSize: "1.5rem",
                textAlign: "center",
                width: "90vw",
              }}
            >
              {error}
            </h3>
          )}
          <input type="checkbox" className="toggle" />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form
                className="flip-card__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                <input
                  className="flip-card__input"
                  name="ntid"
                  placeholder="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button className="flip-card__btn" type="submit">
                  Let`s go!
                </button>
              </form>
            </div>
            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <h2>Hmm.....</h2>
              <h1>Not Allowed 😒</h1>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default LoginPage;
