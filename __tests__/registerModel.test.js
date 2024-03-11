const { validationResult } = require('express-validator');
const RegisterController = require('./RegisterController'); // Adjust the path based on your actual file structure
const existModel = require('../models/existModel');
const registerModel = require('../models/registerModel');

jest.mock('../models/existModel');
jest.mock('../models/registerModel');
jest.mock('express-validator');

describe('RegisterController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        userName: 'testuser',
        password: 'password123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should handle validation errors', async () => {
    const validationError = { array: jest.fn().mockReturnValue([{ msg: 'Validation error' }]) };
    validationResult.mockReturnValue(validationError);

    await RegisterController.registerUserController[2](req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Validation error' });
  });

  it('should register a new user successfully', async () => {
    const validationError = { isEmpty: jest.fn().mockReturnValue(true) };
    validationResult.mockReturnValue(validationError);

    const user = req.body;
    await RegisterController.registerUserController[2](req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: 'Kullanıcı başarıyla kaydedildi' });
    expect(registerModel.registerUser).toHaveBeenCalledWith(user);
  });

  it('should handle registration error', async () => {
    const validationError = { isEmpty: jest.fn().mockReturnValue(true) };
    validationResult.mockReturnValue(validationError);

    const error = new Error('Registration error');
    registerModel.registerUser.mockRejectedValueOnce(error);

    await RegisterController.registerUserController[2](req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Kullanıcı kayıt Hatası!' });
  });
});
