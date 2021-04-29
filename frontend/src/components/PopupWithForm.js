import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? '' : 'popup_hidden'}`}>
      <form className="popup__form" name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
        <button type="button" className="popup__close-button" onClick={props.onClose} />
        <h2 className="popup__title">{`${props.title}`}</h2>
        {props.children}
        <button type="submit" className="popup__save-button popup__button">
          {props.submitButton}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
