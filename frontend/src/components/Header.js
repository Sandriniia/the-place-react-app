import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';

function Header({ isLogged, email, onLogout }) {
  return (
    <header className='header'>
      <h1 className='header__logo'>The Place</h1>
      <nav className='header__nav'>
        <ul className='header__list'>
          <Switch>
            <Route path='/sign-up'>
              <li className='header__nav-item'>
                <NavLink
                  className='header__link'
                  activeClassName='header__link_active'
                  to='/sign-in'
                >
                  Sign in
                </NavLink>
              </li>
            </Route>
            <Route path='/sign-in'>
              <li className='header__nav-item'>
                <NavLink
                  className='header__link'
                  activeClassName='header__link_active'
                  to='/sign-up'
                >
                  Sign up
                </NavLink>
              </li>
            </Route>
            {isLogged ? (
              <>
                <li className='header__nav-item header__email-item'>{email}</li>
                <Link to='' className='header__link' onClick={onLogout}>
                  Sign out
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
