import React from 'react';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title='New Place'
      name='type_add-card'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitButton={'Add'}
    >
      <input
        id='place-name-card'
        type='text'
        placeholder='Name'
        name='name'
        value={name || ''}
        onChange={handleNameChange}
        className='popup__place-name popup__input'
        required
        minLength={2}
        maxLength={30}
      />
      <span className='popup__span-error' id='place-name-card-error' />
      <input
        id='place-link-card'
        type='url'
        placeholder='Link to picture'
        name='link'
        value={link || ''}
        onChange={handleLinkChange}
        className='popup__place-link popup__input'
        required
      />
      <span className='popup__span-error' id='place-link-card-error' />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
