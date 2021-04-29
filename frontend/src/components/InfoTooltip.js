import React from 'react';
import successImage from '../images/auth-success.jpg';
import failImage from '../images/auth-fail.jpg';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? '' : 'popup_hidden'}`}>
      <div className="info-tooltip">
        <button type="button" className="popup__close-button" onClick={props.onClose} />
        <div className="info-tooltip__box">
          <img
            src={props.isSuccess ? successImage : failImage}
            alt=""
            className="info-tooltip__image"
          />
          <p className="info-tooltip__text">
            {props.isSuccess
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так!\n Попробуйте еще раз.'}
          </p>
        </div>
      </div>
    </div>
  );
}
export default InfoTooltip;
