const jwt = require('jsonwebtoken');
const authService = require('../auth/authService'); // Adjust the path based on your actual file structure

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
  sign: jest.fn(),
}));

describe('authenticateToken', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      cookies: {
        token: 'validAccessToken',
        refreshToken: 'validRefreshToken',
      },
    };
    res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      redirect: jest.fn(),
    };
    next = jest.fn();
  });

  it('should authenticate user with a valid access token', () => {
    const decodedUser = { userId: '123' };
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, decodedUser);
    });

    authService.authenticateToken(req, res, next);

    expect(req.user).toEqual(decodedUser);
    expect(next).toHaveBeenCalled();
  });

  it('should handle invalid access token and validate with refresh token', () => {
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(new Error('Invalid access token'));
    });

    const decodedRefreshUser = { userId: '123' };
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(null, decodedRefreshUser);
    });

    const newAccessToken = 'newAccessToken';
    jwt.sign.mockReturnValueOnce(newAccessToken);

    authService.authenticateToken(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith('token', newAccessToken, { httpOnly: true, secure: true });
    expect(req.user).toEqual(decodedRefreshUser);
    expect(next).toHaveBeenCalled();
  });

  it('should handle invalid access token and invalid refresh token', () => {
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(new Error('Invalid access token'));
    });

    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(new Error('Invalid refresh token'));
    });

    authService.authenticateToken(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith('userLoggedIn', 'false', { httpOnly: false, secure: true });
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  it('should handle missing access token', () => {
    req.cookies.token = undefined;

    authService.authenticateToken(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith('userLoggedIn', 'false', { httpOnly: false, secure: true });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.redirect).toHaveBeenCalledWith('/');
  });
});
