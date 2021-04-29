import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ isLogged, email, onLogout }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип:Место" className="header__logo" />
      <nav className="header__nav">
        <ul className="header__list">
          <Switch>
            <Route path="/sign-up">
              <li className="header__nav-item">
                <NavLink
                  className="header__link"
                  activeClassName="header__link_active"
                  to="/sign-in"
                >
                  Войти
                </NavLink>
              </li>
            </Route>
            <Route path="/sign-in">
              <li className="header__nav-item">
                <NavLink
                  className="header__link"
                  activeClassName="header__link_active"
                  to="/sign-up"
                >
                  Регистрация
                </NavLink>
              </li>
            </Route>
            {isLogged ? (
              <>
                <li className="header__nav-item header__email-item">{email}</li>
                <Link to="" className="header__link" onClick={onLogout}>
                  Выйти
                </Link>
              </>
            ) : (
              ''
            )}
          </Switch>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
