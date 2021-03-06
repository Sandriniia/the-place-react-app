const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

const NotFoundError = require('../errors/not-found-err');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError(`Ресурс по адресу ${req.path} не найден`));
});

module.exports = router;
