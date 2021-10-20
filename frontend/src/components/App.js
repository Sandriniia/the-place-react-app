import React, { useState, useEffect, useCallback } from 'react';
import '../index.css';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const history = useHistory();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    const likeRequest = !isLiked ? api.addCardLike(card._id) : api.deleteCardLike(card._id);

    likeRequest
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    console.log(card);
    api
      .removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .sentUserData(data)
      .then((userData) => {
        setCurrentUser(userData);
        closePopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .sentUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closePopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    console.log(data);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closePopups();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (isLogged) {
      console.log(cards);
      api
        .getUserData()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));

      api
        .getCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [isLogged]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closePopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleRegister({ email, password }) {
    return auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push('./sign-in');
      })
      .catch(() => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin({ email, password }) {
    return auth
      .login(email, password)
      .then((res) => {
        if (!res || res.status === 400) {
          return 'Что то пошло не так';
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
          setEmail(email);
          history.push('/');
          setIsLogged(true);
        }
      })
      .catch((err) => console.log(err));
  }

  const checkToken = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .getUserData(token)
        .then((res) => {
          if (res) {
            setIsLogged(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch(() => {
          history.push('/sign-in');
        });
    }
  }, [history]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  function onLogout() {
    localStorage.removeItem('token');
    setIsLogged(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onLogout={onLogout} isLogged={isLogged} />
      <Switch>
        <Route path='/sign-up'>
          <Register onRegister={handleRegister} checkToken={checkToken} />
        </Route>
        <Route path='/sign-in'>
          <Login onLogin={handleLogin} checkToken={checkToken} />
        </Route>
        <ProtectedRoute
          exact
          path='/'
          component={Main}
          isLogged={isLogged}
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
        />
        <Route>
          {isLogged ? <Redirect to='/'></Redirect> : <Redirect to='/sign-in'></Redirect>}
        </Route>
      </Switch>
      <Footer />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        isLogged={isLogged}
        onClose={closePopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closePopups}
        isLogged={isLogged}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closePopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <ImagePopup card={selectedCard} onClose={closePopups} />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isSuccess={isSuccess}
        onClose={closePopups}
      ></InfoTooltip>
    </CurrentUserContext.Provider>
  );
}

export default App;
