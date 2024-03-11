const { registerUserController } = require('../controllers/registerController');
const registerModel = require('../models/registerModel');
const existModel = require('../models/existModel');

jest.mock('../models/registerModel');
jest.mock('../models/existModel');

describe('validateAndRegisterUser', () => {
  it('should register a new user if input is valid', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        userName: 'testuser',
        password: 'password123',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const next = jest.fn();

    existModel.checkEmailExistence.mockResolvedValue(false);
    existModel.checkUserNameExistence.mockResolvedValue(false);
    registerModel.registerUser.mockResolvedValue();

    await registerUserController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: 'Kullanıcı başarıyla kaydedildi' });
  });

  it('should return a 400 response with error message if input is invalid', async () => {
    const req = {
      body: {
        email: 'invalid-email',
        userName: 'existingUser',
        password: 'short',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    existModel.checkEmailExistence.mockResolvedValue(true);
    existModel.checkUserNameExistence.mockResolvedValue(true);

    await registerUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
// Updated expectation
expect(res.json).toHaveBeenCalledWith({
  error: expect.stringContaining('Geçersiz e-posta formatı.'),
  error: expect.stringContaining('E-posta adresi zaten kullanılıyor.'),
  error: expect.stringContaining('Kullanıcı adı zaten kullanılıyor.'),
  error: expect.stringContaining('Şifre en az 6 karakter uzunluğunda olmalı.'),
});

  });

  it('should return a 500 response if an error occurs during registration', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        userName: 'testuser',
        password: 'password123',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    existModel.checkEmailExistence.mockResolvedValue(false);
    existModel.checkUserNameExistence.mockResolvedValue(false);
    registerModel.registerUser.mockRejectedValue(new Error('Some error occurred'));

    await registerUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Kullanıcı kayıt Hatası!' });
  });
});
