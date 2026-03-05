import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/bottom-nav.css";

const BottomNav = () => {
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Bottom">
      <div className="bottom-nav__inner">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "is-active" : ""}`
          }
        >
          <span className="bottom-nav__icon" aria-hidden="true">
            {/* home icon */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <img src="" alt="" />
            </svg>
          </span>
          <span className="bottom-nav__label">Home</span>
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "is-active" : ""}`
          }
        >
          <span className="bottom-nav__icon" aria-hidden="true">
            {/* bookmark icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <img src="" alt="" />
            </svg>
          </span>
          <span className="bottom-nav__label">Saved</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
