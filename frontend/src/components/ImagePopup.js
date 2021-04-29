import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card ? '' : 'popup_hidden'}`}>
      <div className="popup__box">
        <button type="button" className="popup__close-button" onClick={props.onClose} />
        <img
          src={props.card ? props.card.link : '#'}
          alt={props.card ? props.card.name : '#'}
          className="popup__image"
        />
        <p className="popup__image-caption">{props.card ? props.card.name : '#'}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
