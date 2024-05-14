import React from "react";
import "./style.css";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
      <div className="xd-message msg-danger">
        <div className="xd-message-icon">
          <i className="ion-close-round"></i>
        </div>
        <div className="xd-message-content">
          <p>{message}</p>
        </div>
        <a href="#" className="xd-message-close">
          <i className="close-icon ion-close-round"></i>
        </a>
      </div>
  );
};

export default ErrorMessage;
