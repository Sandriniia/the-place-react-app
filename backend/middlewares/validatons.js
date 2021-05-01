const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateGetUsers = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().max(200).required(),
    })
    .unknown(),
});

const validateGetUserById = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      }),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().max(200).required(),
    })
    .unknown(),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Поле "email" должно быть валидным');
      })
      .messages({
        'any.required': 'Поле должно быть заполнено',
      }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Поле должно быть заполнено',
    }),
  }),
  headers: Joi.object()
    .keys({
      'content-type': Joi.string().valid('application/json').required(),
    })
    .unknown(),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Поле должно быть заполнено',
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Поле должно быть заполнено',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля "name" - 2',
      'string.max': 'Максимальная длина поля "name" - 30',
      'string.required': 'Введите имя',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля "about" - 2',
      'string.max': 'Максимальная длина поля "about" - 30',
      'string.required': 'Расскажите о себе',
    }),
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (validator.isURL(value, { disallow_auth: true, require_protocol: true })) {
          return value;
        }
        return helpers.message('Поле "avatar" должно быть валидным url-адресом');
      })
      .messages({
        'any.required': 'Поле должно быть заполнено',
      }),
  }),
  headers: Joi.object()
    .keys({
      'content-type': Joi.string().valid('application/json').required(),
    })
    .unknown(),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'string.required': 'Введите имя',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
        'string.required': 'Расскажите о себе',
      }),
  }),
  headers: Joi.object()
    .keys({
      'content-type': Joi.string().valid('application/json').required(),
      authorization: Joi.string().max(200).required(),
    })
    .unknown(),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { disallow_auth: true, require_protocol: true })) {
          return value;
        }
        return helpers.message('Поле "avatar" должно быть валидным url-адресом');
      })
      .messages({
        'any.required': 'Поле должно быть заполнено',
      }),
  }),
  headers: Joi.object()
    .keys({
      'content-type': Joi.string().valid('application/json').required(),
      authorization: Joi.string().max(200).required(),
    })
    .unknown(),
});

const validateGetCurrentUser = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().max(200).required(),
    })
    .unknown(),
});

const validateGetCards = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().max(200).required(),
    })
    .unknown(),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id пользователя');
      }),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().max(200).required(),
    })
    .unknown(),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля - 2',
        'string.max': 'Максимальная длина поля - 30',
        'string.required': 'Поле должно быть заполнено',
      }),
    link: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { disallow_auth: true, require_protocol: true })) {
          return value;
        }
        return helpers.message('Поле "link" должно быть валидным url-адресом');
      })
      .messages({
        'any.required': 'Поле должно быть заполнено',
      }),
  }),
  headers: Joi.object()
    .keys({
      'content-type': Joi.string().valid('application/json').required(),
      authorization: Joi.string().max(200).required(),
    })
    .unknown(),
});

const validateLikeCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id пользователя');
      }),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().max(200).required(),
    })
    .unknown(),
});

const validateDislikeCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id пользователя');
      }),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().max(200).required(),
    })
    .unknown(),
});

module.exports = {
  validateGetUsers,
  validateGetUserById,
  validateLogin,
  validateCreateUser,
  validateUpdateUser,
  validateUpdateAvatar,
  validateGetCurrentUser,
  validateGetCards,
  validateDeleteCard,
  validateCreateCard,
  validateLikeCard,
  validateDislikeCard,
};
