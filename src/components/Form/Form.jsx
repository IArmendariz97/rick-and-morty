import React, { useState } from "react";
import style from "./Form.module.css";

export default function Form() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submit, tuki");
  }

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
    setErrors(validate({ ...user, [event.target.name]: event.target.value }));
  }

  function validate(datos) {
    const regex = new RegExp(/\S+@\S+\.\S+/);

    let incorrect = {};
    if (datos.username.length <= 4) {
      incorrect.username = "Username must be 5 characters long at least";
    } else if (!datos.username.includes("2")) {
      incorrect.username = "Must includes a 2";
    } else if (!regex.test(datos.email)) {
      incorrect.email = "You must enter a valid email";
    }

    return incorrect;
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          key="1"
          name="username"
          onChange={handleChange}
          value={user.username}
          type="text"
          placeholder="username..."
        />

        {errors.username ? (
          <span className="error" style={{ color: "red" }}>
            {errors.username}
          </span>
        ) : null}

        <label>Email</label>
        <input
          key="2"
          name="email"
          onChange={handleChange}
          value={user.email}
          type="text"
          placeholder="email..."
        />
        <label>Password</label>
        <input
          key="3"
          name="password"
          onChange={handleChange}
          value={user.password}
          type="password"
          placeholder="password..."
        />
        <input type="submit"></input>
      </form>
    </div>
  );
}
