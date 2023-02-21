import { useState } from "react";
import styles from "./AddMovie.module.scss";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import { fetchAddMovie } from "../../redux/slices/movies.js";
import Modal from "../Modal/Modal.jsx";
import { Link } from "react-router-dom";
import Background from "../../assets/movies-bg.png";

export default function AddMovie() {
  const [movie, setMovie] = useState("");
  const [score, setScore] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      movie: "",
      score: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAddMovie(values));

    if (!data.payload) {
      alert("Failure to add a movie");
    }
    setModalActive(true);
    setScore("");
    setMovie("");
  };

  const handleMovieChange = (e) => {
    setMovie(e.target.value);
  };
  const handleScoreChange = (e) => {
    const regExp = /^(10|[1-9])$/;
    if (e.target.value === "" || regExp.test(e.target.value)) {
      setScore(e.target.value);
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.movie_field}>
          <div className="md:w-1/3">
            <label className={styles.label_text} htmlFor="movie">
              Movie
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className={styles.movie_input}
              {...register("movie", { required: "Enter a movie or TV show" })}
              id="movie"
              type="text"
              placeholder="Rage"
              value={movie}
              onChange={handleMovieChange}
            ></input>
          </div>
        </div>
        <div className={styles.score_field}>
          <div className="md:w-1/3">
            <label className={styles.label_text} htmlFor="movie-score">
              Score
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className={styles.score_input}
              {...register("score", { required: "Enter a score" })}
              id="movie-score"
              type="text"
              pattern="[0-9.]+"
              placeholder="8"
              value={score}
              onChange={handleScoreChange}
            ></input>
          </div>
        </div>
        <div className={styles.btn_container}>
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className={styles.movie_button} type="submit">
              Add movie
            </button>
          </div>
        </div>
      </form>
      <Modal active={modalActive} setActive={setModalActive}>
        <p className={styles.modal_text}>
          The movie was successfully added to the collection
        </p>
        <Link className={styles.show_collection_button} to="/collection">
          Show collection
        </Link>
      </Modal>
    </section>
  );
}
