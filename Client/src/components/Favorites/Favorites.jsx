import { useState } from "react";
import style from "./Favorites.module.css";
import { useSelector, useDispatch } from "react-redux";
import { filterCards, orderCards, reset } from "../../redux/actions/actions";
import Card from "../Cards/Singular/Card";

export default function Favorites() {
  // WARNING PELIGRO
  // CUIDADO!!!!
  // Male, Female, Genderless y unknown
  const favorites = useSelector((state) => state.favorites); // ACLARACION
  const dispatch = useDispatch();
  const [booleano, setBooleano] = useState(false);

  function handleOrder(event) {
    dispatch(orderCards(event.target.value));
    setBooleano(!booleano); // Se actualiza el componente!
  }
  function handleFilter(event) {
    if (event.target.value === "RESET") {
      dispatch(reset());
    } else {
      dispatch(filterCards(event.target.value));
    }
  }

  return (
    <div>
      <div className={style.selects}>
        <select onChange={handleOrder}>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>

        <select onChange={handleFilter}>
          <option value="unknown">UNKNOWN</option>
          <option value="Genderless">GENDERLESS</option>
          <option value="Female">FEMALE</option>
          <option value="Male">MALE</option>
        </select>
      </div>

      <div className={style.container}>
        {favorites?.map((char) => (
          <Card
            key={char.id}
            id={char.id}
            name={char.name}
            species={char.species}
            gender={char.gender}
            status={char.status}
            image={char.image}
            origin={char.origin.name}
          />
        ))}
      </div>
    </div>
  );
}
