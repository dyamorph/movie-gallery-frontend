import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth.js";
import BurgerMenu from "../BurgerMenu/BurgerMenu.jsx";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  const onClickLogout = () => {
    if (window.confirm("Are you want to logout?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const handleToggle = () => {
    setBurgerIsOpen(!burgerIsOpen);
  };
  burgerIsOpen === true
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <header className={styles.header}>
      <span className={styles.header_title}>My Movie Gallery</span>
      <ul className={styles.list}>
        <NavLink
          to="/addmovie"
          className={({ isActive }) =>
            isActive ? styles.active_link : styles.inactive_link
          }
        >
          Add Movie
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            isActive ? styles.active_link : styles.inactive_link
          }
        >
          Collection
        </NavLink>
      </ul>
      <section className={styles.login_block}>
        {isAuth ? (
          <div className={styles.user}>
            <span className={styles.user_name}>{userData.name}</span>
            <button onClick={onClickLogout} className={styles.logout_btn}>
              Log out
            </button>
          </div>
        ) : (
          <div className={styles.login_btns}>
            <Link to="/user/login" className={styles.login_btn}>
              Login
            </Link>
            <Link to="/user/register" className={styles.register_btn}>
              Register
            </Link>
          </div>
        )}
      </section>
      <button className={styles.burger_menu_icon} onClick={handleToggle}>
        <AiOutlineMenu size={24} />
      </button>
      <BurgerMenu open={burgerIsOpen} setOpen={setBurgerIsOpen}>
        {isAuth ? (
          <div
            className={styles.burger_user}
            onClick={() => setBurgerIsOpen(false)}
          >
            <span className={styles.user_name}>{userData.name}</span>
            <button onClick={onClickLogout} className={styles.logout_btn}>
              Log out
            </button>
          </div>
        ) : (
          <div
            className={styles.burger_login_btns}
            onClick={() => setBurgerIsOpen(false)}
          >
            <Link to="/user/login" className={styles.login_btn}>
              Login
            </Link>
            <Link to="/user/register" className={styles.register_btn}>
              Register
            </Link>
          </div>
        )}
      </BurgerMenu>
    </header>
  );
};

export default Header;
