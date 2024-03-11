const { check, validationResult } = require('express-validator');
const registerModel = require('../models/registerModel');
const existModel = require('../models/existModel');

// Validation middleware
const emailValidation = check('email').isEmail().withMessage('Geçersiz e-posta formatı.')
  .custom(async (value, { req }) => {
    const isEmailExists = await existModel.checkEmailExistence(value);
    if (isEmailExists) {
      throw new Error('E-posta adresi zaten kullanılıyor.');
    }
  });

const userNameValidation = check('userName').custom(async (value, { req }) => {
  const isUserNameExist = await existModel.checkUserNameExistence(value);
  if (isUserNameExist) {
    throw new Error('Kullanıcı adı zaten kullanılıyor.');
  }
});

const passwordValidation = check('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter uzunluğunda olmalı.');

const validateAndRegisterUser = async (req, res, next) => {
  try {
    // Apply validations
    await Promise.all([
      emailValidation.run(req),
      userNameValidation.run(req),
      passwordValidation.run(req),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      const errorMessage = errorMessages.join(' ');
      return res.status(400).json({ error: errorMessage });
    }

    const user = req.body;
    console.log('Yeni Üye:', user);

    // Assuming registerUser function is asynchronous and returns a promise
    await registerModel.registerUser(user);

    return res.status(200).json({ success: 'Kullanıcı başarıyla kaydedildi' });
  } catch (error) {
    console.error('Kullanıcı kayıt hatası:', error);
    const errorMessage = 'Kullanıcı kayıt Hatası!';
    return res.status(500).json({ error: errorMessage });
  }
};

module.exports = {
  registerUserController: validateAndRegisterUser,
};
