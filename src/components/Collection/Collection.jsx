import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { fetchMovies } from "../../redux/slices/movies.js";
import CardSkeleton from "../CardSkeleton/CardSkeleton.jsx";
import styles from "./Collection.module.scss";

export default function Collection() {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);
  const userData = useSelector((state) => state.auth.data);
  const [searchData, setSearchData] = useState("");

  const filtered = movies.items.filter((movie) => {
    return movie.user === userData?._id;
  });

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  console.log(movies.items);
  const filteredData = filtered.filter((movie) => {
    return movie.movie.toLowerCase().includes(searchData.toLowerCase());
  });

  const isMoviesLoading = movies.status === "loading";

  return (
    <>
      <main className={styles.section}>
        <SearchBar getSearchValue={(input) => setSearchData(input)} />
        <section className={styles.card_wrapper}>
          <div className={styles.layout}>
            {(isMoviesLoading ? [...Array(5)] : filteredData).map(
              (obj, index) =>
                isMoviesLoading ? (
                  <CardSkeleton key={index} />
                ) : (
                  <MovieCard
                    key={index}
                    id={obj._id}
                    film={obj.movie}
                    score={obj.score}
                  />
                )
            )}
          </div>
        </section>
      </main>
    </>
  );
}
