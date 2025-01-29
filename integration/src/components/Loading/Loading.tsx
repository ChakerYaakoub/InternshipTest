import React from "react";
import "./Loading.css";
import { LoadingProps } from "./useLoading";

const Loading: React.FC<LoadingProps> = ({ size = "md" }) => {
  return (
    <div className="loading-container">
      <div className={`loading loading--${size}`}>
        <div className="loading__spinner"></div>
        {/* <span className="loading__text">Loading...</span> */}
      </div>
    </div>
  );
};

export default Loading;
