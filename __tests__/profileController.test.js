const profileModel = require('../models/profileModel');
const ProfileController = require('../controllers/profileController');

jest.mock('../models/profileModel');

describe('ProfileController', () => {
  it('should update profile successfully', async () => {
    // Mocked data
    const mockRequest = {
      body: {
        userName: 'testuser',
        email: 'test@example.com',
        // Add other required fields
      },
      file: {
        buffer: Buffer.from('fakeImageData', 'base64'),
        mimetype: 'image/png',
        size: 500000, // Adjust the size as needed
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the successful result
    profileModel.setUserByUserName.mockResolvedValue({ success: true });

    await ProfileController.updateProfileController(mockRequest, mockResponse);

    // Check if the response status and json functions were called
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ success: true, message: 'Profil başarıyla güncellendi.' });
  });

  it('should handle invalid file format', async () => {
    // Mocked request with invalid file format
    const mockRequest = {
      body: {
        userName: 'testuser',
        email: 'test@example.com',
        // Add other required fields
      },
      file: {
        buffer: Buffer.from('fakeImageData', 'base64'),
        mimetype: 'text/plain', // Invalid mimetype
        size: 500000, // Adjust the size as needed
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ProfileController.updateProfileController(mockRequest, mockResponse);

    // Check if the response status and json functions were called
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Yalnızca resim dosyaları yükleyebilirsiniz.' });
  });

  it('should handle internal server error', async () => {
    // Mocked request
    const mockRequest = {
      body: {
        userName: 'testuser',
        email: 'test@example.com',
        // Add other required fields
      },
      file: {
        buffer: Buffer.from('fakeImageData', 'base64'),
        mimetype: 'image/png',
        size: 500000, // Adjust the size as needed
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the internal server error
    const mockError = new Error('Internal Server Error');
    profileModel.setUserByUserName.mockRejectedValue(mockError);

    await ProfileController.updateProfileController(mockRequest, mockResponse);

    // Check if the response status and json functions were called
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Profil güncellenirken bir hata oluştu: Internal Server Error' });
  });
});
