import React, { useState } from "react";
import style from "./App.module.css";
import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Navbar/Nav";
import axios from "axios";
import Detail from "./components/Detail/Detail";
import { Routes, Route } from "react-router-dom";

function App() {
  function onSearch(dato) {
    // agrega personajes a characters
    axios(`https://rickandmortyapi.com/api/character/${dato}`)
      .then((respuesta) => {
        if (respuesta.data.name) {
          setCharacters((oldChars) => [...oldChars, respuesta.data]);
        } else {
        }
      })
      .catch((err) => window.alert("¡No hay personajes con este ID!"));
  }

  function onClose(id) {
    setCharacters(
      characters.filter((pj) => {
        return pj.id !== Number(id);
      })
    );
  }

  const [characters, setCharacters] = useState([]); // [{}]

  // const location = useLocation();
  // console.log("location", location);

  // let navigate = useNavigate()
  // function handle(){
  //   navigate("/algo")
  // }

  return (
    <div className={style.App}>
      <Nav onSearch={onSearch} />
      <Routes>
        {/* <Route path="*" element={<Nav onSearch={onSearch} />} /> */}
        <Route path="/" element={<h1 className="App-title">Welcome</h1>} />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route
          path="/about"
          element={<h1 className="App-subtitle">Soy el about</h1>}
        />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
