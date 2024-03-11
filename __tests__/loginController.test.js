const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mssql = require('mssql');
const dbConfig = require('../dbConfig');
const LoginController = require('../controllers/loginController');

// Load environment variables from .env file
dotenv.config();

// Jest mock fonksiyonunu kullanarak mssql.connect'ı mockla
jest.mock('mssql');

// ... (Diğer importlar ve setup kısmı)

// ... (Önceki importlar ve setup kısmı)

describe('LoginController Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully', async () => {
    // ... (Önceki başarılı giriş testi)
  });

  it('should handle invalid username', async () => {
    const req = {
      body: {
        userName: 'invalidUser',
        password: 'testPassword',
        rememberMe: 'on',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking mssql.connect to simulate an empty result set
    const queryMock = jest.fn().mockResolvedValue({
      recordset: [],
    });

    const requestMock = {
      input: jest.fn(),
      query: queryMock,
    };

    mssql.connect.mockResolvedValue({
      request: jest.fn(() => requestMock),
    });

    await LoginController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Geçersiz Kullanıcı Adı' });
  });

  it('should handle invalid password', async () => {
    const req = {
      body: {
        userName: 'testUser',
        password: 'invalidPassword',
        rememberMe: 'on',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking mssql.connect to simulate a successful database query
    const queryMock = jest.fn().mockResolvedValue({
      recordset: [
        {
          ID: 1,
          UserName: 'testUser',
          Password: bcrypt.hashSync('testPassword', 10),
          RoleID: 1,
        },
      ],
    });

    const requestMock = {
      input: jest.fn(),
      query: queryMock,
    };

    mssql.connect.mockResolvedValue({
      request: jest.fn(() => requestMock),
    });

    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

    await LoginController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Geçersiz Şifre' });
  });

  it('should handle internal server error', async () => {
    const req = {
      body: {
        userName: 'testUser',
        password: 'testPassword',
        rememberMe: 'on',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking mssql.connect to simulate a database error
    mssql.connect.mockRejectedValue(new Error('Internal Server Error'));

    await LoginController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Internal Server Error' });
  });
});
