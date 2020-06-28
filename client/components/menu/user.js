import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import AuthenticationApi from "../../api/authentication";
import styles from "./user.module.scss";

const UserMenu = ({ currentUser }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const isLoggedIn = currentUser && currentUser !== null;

  const signOutHandler = async () => {
    console.log("signout");
    try {
      await AuthenticationApi(`/api/user/signout`);
      Router.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  const isLoggedInMenu = () => {
    return (
      <div className={styles.UserMenu}>
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
              <a onClick={signOutHandler}>Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const isNotLoggedInMenu = () => {
    return (
      <div className={styles.UserMenu}>
        <Link href="/signin">
          <a className=""> Sign In </a>
        </Link>
      </div>
    );
  };

  return isLoggedIn ? isLoggedInMenu() : isNotLoggedInMenu();
};

export default UserMenu;
