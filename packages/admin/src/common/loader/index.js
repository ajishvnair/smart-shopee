import React from "react";

import "./loader.scss";

export default function () {
  return (
    <div className="pre-uloader">
      <div className="uloader-material">
        <svg
          className="spinner"
          width="65px"
          height="65px"
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="path"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            cx="33"
            cy="33"
            r="30"
          />
        </svg>
      </div>
    </div>
  );
}
