const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Unauthorized = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: "Jeanne d'Arc",
  },
  about: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: 'https://static-cdn.sr.se/images/2359/a4c28ebf-d089-42b1-afd3-ab8c5217d857.jpg',
    validate: {
      validator: (v) => validator.isURL(v, { disallow_auth: true, require_protocol: true }),
      message: 'Введите url',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(email) {
      return validator.isEmail(email);
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
        }

        return user;
      });
    });
};

function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.methods.toJSON = toJSON;

module.exports = mongoose.model('user', userSchema);
