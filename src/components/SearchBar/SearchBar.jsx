import React from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './SearchBar.module.scss';

const SearchBar = ({ getSearch }) => {
  return (
    <form className={styles.form}>
      <label className={styles.srLabel} htmlFor="default-search">
        Search
      </label>
      <div className="relative ">
        <div className={styles.searchIcon}>
          <BsSearch color="black" size={20} />
        </div>
        <input
          className={styles.searchInput}
          type="search"
          id="default-search"
          placeholder="Search Films"
          onChange={(event) => getSearch(event.target.value)}
          required
        ></input>
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
