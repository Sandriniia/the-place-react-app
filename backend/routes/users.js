const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateGetUsers,
  validateGetUserById,
  validateUpdateUser,
  validateUpdateAvatar,
  validateGetCurrentUser,
} = require('../middlewares/validatons');

router.get('/', validateGetUsers, getUsers);

router.patch('/me', validateUpdateUser, updateUser);

router.get('/me', validateGetCurrentUser, getCurrentUser);

router.get('/:id', validateGetUserById, getUserById);

router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
