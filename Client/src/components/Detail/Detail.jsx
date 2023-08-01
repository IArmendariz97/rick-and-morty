import style from "./Detail.module.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//"/detail/:id" --> 55

export default function Detail() {
  const { id } = useParams();
  const [pjDetail, setPjDetail] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:3001/character/${id}`);
        const { data } = response;
        if (data.name) {
          setPjDetail(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      } catch (error) {
        window.alert("Error al obtener los datos");
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={style.container}>
      <h3>{pjDetail.name && pjDetail.name}</h3>
      <h5>{pjDetail.status ? pjDetail.status : ":( no hay status"}</h5>
      <img src={pjDetail.image} alt={pjDetail.name} />
      <section>
        <span>👤{pjDetail.species}</span>
        <span> {pjDetail.gender === "Male" ? "♂ Male" : "♀ Female"}</span>
        <span>🌍 {pjDetail.origin?.name}</span>
      </section>
    </div>
  );
}

// HTML SEMANTICO --->

// [] montaje
// [id] update
// () => return () => {} desmontaje

// var aux = "messi"
// var nuevo = aux || "esto"

// var nueva = aux && aux

// condicion ? true : false
