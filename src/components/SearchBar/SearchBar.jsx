import React from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.scss";

const SearchBar = ({ getSearchValue }) => {
  return (
    <form className={styles.form}>
      <label className={styles.label} htmlFor="default-search">
        Search
      </label>
      <div className={styles.search_bar}>
        <div className={styles.search_icon}>
          <BsSearch color="black" size={20} />
        </div>
        <input
          className={styles.search_input}
          type="search"
          id="search"
          placeholder="Search Films"
          onChange={(event) => getSearchValue(event.target.value)}
          required
        ></input>
        <button className={styles.search_button} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
