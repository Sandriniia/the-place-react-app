const router = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateGetCards,
  validateDeleteCard,
  validateCreateCard,
  validateLikeCard,
  validateDislikeCard,
} = require('../middlewares/validatons');

router.get('/', validateGetCards, getCards);

router.delete('/:id', validateDeleteCard, deleteCard);

router.post('/', validateCreateCard, createCard);

router.put('/:id/likes', validateLikeCard, likeCard);

router.delete('/:id/likes', validateDislikeCard, dislikeCard);

module.exports = router;
