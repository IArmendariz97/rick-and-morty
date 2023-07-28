import React from "react";
import Cards from "../Cards/Cards";
import styles from "./Home.module.css";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <span className={styles.home}>Home</span>
      <Cards characters={props.characters} onClose={props.onClose} />
    </div>
  );
}
