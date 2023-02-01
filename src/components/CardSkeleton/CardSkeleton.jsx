import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./CardSkeleton.module.scss";

const CardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className={styles.wrapper} key={index}>
        <div>
          <Skeleton count={2} height={15} style={{ marginBottom: ".6rem" }} />
        </div>
        <div className={styles.icons}>
          <Skeleton circle width={30} height={30} />
          <Skeleton circle width={30} height={30} />
        </div>
      </div>
    ));
};

export default CardSkeleton;
