import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleUserNameChange(event) {
    setUserName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  useEffect(() => {
    setUserName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name: userName,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title='Edit profile'
      name='type_edit'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={props.isDisabled}
      submitButton={'Save'}
    >
      <input
        id='name-card'
        type='text'
        placeholder="Jeanne d'Arc"
        name='name'
        value={userName || ''}
        onChange={handleUserNameChange}
        className='popup__name popup__input'
        required
        minLength={2}
        maxLength={40}
      />
      <span className='popup__span-error' id='name-card-error' />
      <input
        id='description-card'
        type='text'
        placeholder='What can you tell about yourself?'
        name='about'
        value={description || ''}
        onChange={handleDescriptionChange}
        className='popup__description popup__input'
        required
        minLength={2}
        maxLength={200}
      />
      <span className='popup__span-error' id='description-card-error' />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
