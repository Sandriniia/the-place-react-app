import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const registerData = {
    email: '',
    password: '',
  };
  const [data, setData] = useState(registerData);

  function handleChange(event) {
    const { name, value } = event.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    onRegister(data);
  }

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Регистрация</h2>
        <input
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          value={data.email || ''}
          onChange={handleChange}
          required
          className="register__input register__email-input"
        ></input>
        <input
          id="password"
          type="text"
          placeholder="Пароль"
          name="password"
          value={data.password || ''}
          onChange={handleChange}
          required
          className="register__input"
        ></input>
        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
        <div className="register__question-box">
          <p className="register__question">Уже зарегистрированы?</p>
          <Link to="" className="register__link">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
