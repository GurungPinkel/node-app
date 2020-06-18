import React, { useState } from "react";
import Link from "next/link";
import styles from "./user.module.scss";

const UserMenu = ({ currentUser }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const isLoggedIn = currentUser && currentUser !== null;

  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  const isLoggedInMenu = () => {
    return (
      <div className={styles.dropdownContainer}>
        <div
          className={`${styles.dropdown} ellipsis`}
          onMouseEnter={toggleMenuHandler}
        >
          {currentUser.name}
        </div>
        <ul className={`${styles.dropdownContent} ${styles.dropdown}`}>
          <li>
            <Link href="/signin">
              <a> Account </a>
            </Link>
          </li>
          <li>
            <Link href="/signin">
              <a> Orders </a>
            </Link>
          </li>
          <li>
            <Link href="/signin">
              <a> Cart </a>
            </Link>
          </li>
          <li>
            <Link href="/signin">
              <a> Sign Out </a>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const isNotLoggedInMenu = () => {
    return (
      <>
        <div> Sign In </div>
      </>
    );
  };

  return isLoggedIn ? isLoggedInMenu() : isNotLoggedInMenu();
};

export default UserMenu;
