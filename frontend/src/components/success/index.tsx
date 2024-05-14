import React from "react";

type SuccessMessageProps = {
  message: string;
};

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className="success-container">
      <div className="xd-message msg-success">
        <div className="xd-message-icon">
          <img src="success-svgrepo-com.svg" alt="success" />
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

export default SuccessMessage;
