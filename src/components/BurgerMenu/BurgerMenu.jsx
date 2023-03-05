import React from "react";
import styles from "./BurgerMenu.module.scss";

function BurgerMenu({ open, children }) {
  return (
    <div
      className={open ? styles.burger_menu_bar_active : styles.burger_menu_bar}
    >
      <div>{children}</div>
    </div>
  );
}

export default BurgerMenu;
