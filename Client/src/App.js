import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/Navbar/Nav";
import About from "./components/About/About";
import Form from "./components/Form/Form";
import Detail from "./components/Detail/Detail";
import axios from "axios";
import style from "./App.module.css";
import Favorites from "./components/Favorites/Favorites";
import { setUser, setFavorites } from "./redux/actions/actions";
import { useDispatch } from "react-redux";

function App() {
  const navigate = useNavigate(); // Importar useNavigate !!!!!
  const [access, setAccess] = React.useState(false);
  const [errorApi, seterrorApi] = React.useState(false);

  const dispatch = useDispatch();

  function logout() {
    setAccess(false);
    navigate("/");
  }

  async function login(userData) {
    const { email, password } = userData;
    const URL = "http://localhost:3001/user/login/";

    try {
      const backendlogin = await axios(
        URL + `?email=${email}&password=${password}`
      );
      const { data } = backendlogin;
      console.log(data);
      const { access, user } = data;
      if (access) {
        const response = await axios(`
        http://localhost:3001/favorites/${user.id}`);
        dispatch(setUser(user));
        navigate("/home");
        const favorites = response.data;
        dispatch(setFavorites(favorites));
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    !access && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access]);

  const [characters, setCharacters] = useState([]); // [{}]
  async function onSearch(dato) {
    // agrega personajes a characters
    // axios(`http://localhost:3001/rickandmorty/onsearch/${dato}`)
    //   .then((character) => {
    //     if (character.data.name) {
    //       // antes de agregar busco si "ya existe". Como lo harias?
    //       // tu codigo aquí:
    //       // if("yaExiste") return
    //       setCharacters((oldChars) => [...oldChars, character.data]);
    //     } else {
    //     }
    //   })
    //   .catch((err) => alert(err.response.data.error));
    try {
      const backRequest = await axios(
        `http://localhost:3001/character/${dato}`
      );

      if (backRequest.status === 200) {
        seterrorApi(false);
        setCharacters((oldChars) => [...oldChars, backRequest.data]);
      } else {
        seterrorApi(true);
      }
    } catch (error) {
      seterrorApi(true);
    }
  }

  function onClose(id) {
    // elimina personajes de characters
    // window.alert("onClose :)")
    setCharacters(
      characters.filter((pj) => {
        return pj.id !== Number(id);
      })
    );
  }

  const location = useLocation();

  return (
    <div className={style.App}>
      {location.pathname !== "/" && <Nav onSearch={onSearch} out={logout} />}
      <Routes>
        <Route
          path="/home"
          element={
            !errorApi ? (
              <Home characters={characters} onClose={onClose} />
            ) : (
              <h1>Componente de error 404</h1>
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/character/:id" element={<Detail />} />
        <Route path="/" element={<Form login={login} />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
