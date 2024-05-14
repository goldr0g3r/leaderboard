import React from "react";
import "./style.css";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-container">
      <div className="xd-message msg-danger">
        <div className="xd-message-icon">
          <img
            className="ion-close-round"
            src="error-svgrepo-com.svg"
            alt="error"
          />
        </div>
        <div className="xd-message-content">
          <p>{message}</p>
        </div>
        <a href="\#" className="xd-message-close">
          <i className="close-icon ion-close-round"></i>
        </a>
      </div>
    </div>
  );
};

export default ErrorMessage;
