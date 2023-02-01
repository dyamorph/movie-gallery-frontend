import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import styles from "./Collection.module.scss";
import { fetchMovies } from "../../redux/slices/movies.js";
import CardSkeleton from "../CardSkeleton/CardSkeleton.jsx";
import "react-loading-skeleton/dist/skeleton.css";

export default function Collection() {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);
  const userData = useSelector((state) => state.auth.data);

  const filtered = movies.items.filter((movie) => {
    return movie.user === userData?._id;
  });

  console.log(filtered.length);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  console.log(movies.items);

  const isMoviesLoading = movies.status === "loading";

  return (
    <>
      <main className={styles.section}>
        <SearchBar getSearchValue={(input) => setSearchData(input)} />
        <section className={styles.card_wrapper}>
          <div className={styles.layout}>
            {(isMoviesLoading ? [...Array(5)] : filtered).map((obj, index) =>
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