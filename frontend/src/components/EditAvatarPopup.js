import React from 'react';
import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title='Update avatar'
      name='type_avatar'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitButton={'Save'}
    >
      <input
        id='change-avatar-card'
        ref={avatarRef}
        type='url'
        placeholder='https://somewebsite.com/someimage.jpg'
        name='avatar'
        className='popup__avatar-input popup__input'
        required
      />
      <span className='popup__span-error' id='change-avatar-card-error' />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
