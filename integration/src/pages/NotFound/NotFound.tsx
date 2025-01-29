import React from "react";
import "./NotFound.css";
import { NotFoundProps, useNotFound } from "./useNotFound";
import { Link } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { FaHome } from "react-icons/fa";

const NotFound: React.FC = (props: NotFoundProps) => {
  const { path } = useNotFound(props);

  return (
    <div className="not-found">
      <div className="not-found__content">
        <BiError className="not-found__icon" />
        <h1 className="not-found__title">404</h1>
        <h2 className="not-found__subtitle">Page Not Found</h2>
        <p className="not-found__text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        {path && (
          <p className="not-found__path">
            Path: <span>{path}</span>
          </p>
        )}
        <Link to="/" className="not-found__button">
          <FaHome />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
