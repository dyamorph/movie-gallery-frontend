import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth.js";

const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);
  console.log('userData: ', userData);

  const onClickLogout = () => {
    if (window.confirm("Are you want to logout?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };
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
      <>
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
      </>
    </header>
  );
};

export default Header;
