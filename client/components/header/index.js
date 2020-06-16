import React from "react";
import styles from "./header.module.scss";

const HeaderComponent = ({ currentUser }) => {
  return (
    <header className={styles.headerComponent}>
      <div> Header Logo </div>
      <div> Menus </div>
    </header>
  );
};
export default HeaderComponent;
