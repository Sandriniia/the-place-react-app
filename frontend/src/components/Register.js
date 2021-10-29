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
    <div className='register'>
      <form className='register__form' onSubmit={handleSubmit}>
        <h2 className='register__title'>
          <span className='register__title-first-part'>Create your</span>
          <span className='register__title-logo'> The Place </span>
          <span className='register__title-last-part'>Account</span>
        </h2>
        <input
          id='email'
          type='email'
          placeholder='email'
          name='email'
          value={data.email || ''}
          onChange={handleChange}
          required
          className='register__input register__email-input'
        ></input>
        <input
          id='password'
          type='password'
          placeholder='password'
          name='password'
          value={data.password || ''}
          onChange={handleChange}
          required
          className='register__input'
        ></input>
        <button type='submit' className='register__button'>
          Sign up
        </button>
        <div className='register__question-box'>
          <p className='register__question'>Already have an account?</p>
          <Link to='' className='register__link'>
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
