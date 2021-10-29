import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ onLogin }) {
  const loginData = {
    email: '',
    password: '',
  };
  const [data, setData] = useState(loginData);
  const history = useHistory();

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
    onLogin(data)
      .then(() => history.push('/'))
      .catch((err) => console.log(err));
  }

  return (
    <div className='log-in'>
      <form className='log-in__form' onSubmit={handleSubmit}>
        <h2 className='log-in__title'>Sign in</h2>
        <input
          id='login-email'
          type='email'
          placeholder='email'
          name='email'
          value={data.email}
          onChange={handleChange}
          required
          className='log-in__input log-in__email-input'
        ></input>
        <input
          id='login-password'
          type='password'
          placeholder='password'
          name='password'
          value={data.password}
          onChange={handleChange}
          required
          className='log-in__input'
        ></input>
        <button type='submit' className='log-in__button'>
          Go
        </button>
      </form>
    </div>
  );
}

export default Login;
