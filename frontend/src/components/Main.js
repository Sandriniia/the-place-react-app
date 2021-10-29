import React from 'react';
import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__cover-avatar' onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} alt="Jeanne d'Arc's portrait" className='profile__avatar' />
        </div>
        <div className='profile__info'>
          <h1 className='profile__title'>{currentUser.name}</h1>
          <button type='button' className='profile__edit-button' onClick={props.onEditProfile} />
          <p className='profile__subtitle'>{currentUser.about}</p>
        </div>
        <button type='button' className='profile__add-button' onClick={props.onAddPlace} />
      </section>
      <section className='elements'></section>
      <section className='elements'>
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
