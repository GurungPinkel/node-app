import React, { useEffect } from "react";
import UserMenu from "../menu/user";
import styles from "./header.module.scss";

const HeaderComponent = ({ currentUser }) => {
  return (
    <header className={styles.headerComponent}>
      <div> Header Logo </div>
      <UserMenu currentUser={currentUser} />
    </header>
  );
};
export default HeaderComponent;
