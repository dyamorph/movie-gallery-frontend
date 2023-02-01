import React from 'react';
import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import styles from './MovieCard.module.scss';
import {useDispatch} from "react-redux";
import {fetchDeleteMovie} from "../../redux/slices/movies.js";

const MovieCard = ({ film, score, id }) => {
  const [liked, setLiked] = useState(false);
  const onLikedToggle = () => {
    !liked ? setLiked(true) : setLiked(false);
  };
  const dispatch = useDispatch()
  const onClickDelete = () => {
    dispatch(fetchDeleteMovie(id))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.textWrapper}>
          <h1 className={styles.film}>{`Film: ${film}`}</h1>
          <h1 className={styles.score}>{`Rating: ${score}`}</h1>
        </div>
      </div>
      <div className={styles.badgeWrapper}>
        <div className={liked ? styles.liked : styles.like} onClick={onLikedToggle}>
          <AiFillHeart size={26} />
        </div>
        <div className={styles.delete} onClick={onClickDelete}>
          <BsTrash size={24} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
