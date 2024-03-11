const AddController = require('../controllers/AddController');
const addModel = require('../models/addModel');

jest.mock('../models/addModel'); // Mock the addModel module

describe('AddController Tests', () => {
  it('should add news successfully', async () => {
    const req = {
      file: {
        mimetype: 'image/png',
        size: 500000, // 500 KB
        buffer: Buffer.from('fakeImageBuffer'), // Mock image buffer
      },
      body: {
        title: 'Test News',
        contentText: 'This is a test news article.',
        sourceID: '123',
        categoryID: '456',
      },
      cookies: {
        userID: '789',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await AddController.addNewsController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: 'Haber başarıyla eklendi.' });
    expect(addModel.addNews).toHaveBeenCalled();
  });

  // Add more test cases for error scenarios if needed
});
