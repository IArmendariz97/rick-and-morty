import React from "react";
import SearchBar from "./SearchBar/SearchBar.jsx";
import style from "./Nav.module.css";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <div className={style.container}>
      <Link className={style.link} to="/home">
        HOME
      </Link>
      <Link className={style.link} to="/favorites">
        FAVS ❤️
      </Link>
      {/* <Link to="/create">ADD CHARACTER!</Link> */}
      <SearchBar className={style.searchbar} onSearch={props.onSearch} />
      <Link className={style.link} to="/about">
        ABOUT
      </Link>
      <button className={style.btn} onClick={props.out}>
        LOGOUT
      </button>
    </div>
  );
}
