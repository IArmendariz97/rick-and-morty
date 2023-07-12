import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { addFavorite, deleteFavorite } from "../../../redux/actions/actions";
// import { connect } from "react-redux";

export default function Card({
  name,
  species,
  onClose,
  gender,
  status,
  origin,
  image,
  id,
}) {
  //   console.log(props, "props"); cardInfo

  const dispatch = useDispatch(); // CREO UN DISPATCH
  const favorites = useSelector((state) => state.favorites); // ME TRAIGO "favorites" DEL GLOBAL

  const [isFav, setIsFav] = useState(false);

  function handleClick() {
    //despachar el objeto de la accion
    if (isFav) {
      setIsFav(false);
      dispatch(deleteFavorite(id));
    } else {
      setIsFav(true);
      dispatch(
        addFavorite({
          name,
          species,
          onClose,
          gender,
          status,
          origin,
          image,
          id,
        })
      );
    }
  }

  useEffect(() => {
    // [{1} {3}]
    // {1 ❤️} {2🤍} {3❤️} {44🤍} {66🤍}
    favorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [favorites, id]);

  return (
    <div className={style.cardContainer}>
      {onClose ? (
        <button className={style.closeButton} onClick={() => onClose(id)}>
          X
        </button>
      ) : null}
      <h2 className={style.cardInfo}>{name}</h2>
      <h2 className={style.cardInfo}>{species}</h2>
      <h2 className={style.cardInfo}>{gender}</h2>
      <h2 className={style.cardInfo}>{status}</h2>
      <h2 className={style.cardInfo}>{origin}</h2>
      <Link to={`/detail/${id}`}>
        <img className={style.cardImage} src={image} alt={name} />
      </Link>
      {isFav ? (
        <button onClick={handleClick}>❤️</button>
      ) : (
        <button onClick={handleClick}>🤍</button>
      )}
    </div>
  );
}
