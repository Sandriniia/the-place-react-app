import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = `elements__delete-button ${
    isOwn ? 'elements__delete-button' : 'elements__delete-button_hidden'
  }`;

  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked ? 'elements__like_active' : 'elements__like'
  }`;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="elements__item">
      <div className="elements__box-img-button">
        <img
          src={props.card.link}
          alt={props.card.name}
          className="elements__image"
          onClick={handleCardClick}
        />
        <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
      </div>
      <div className="elements__group">
        <h3 className="elements__title">{props.card.name}</h3>
        <div className="elements__box-likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <div className="elements__like-number">{props.card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
