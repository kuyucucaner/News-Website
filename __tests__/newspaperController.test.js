const newspaperModel = require('../models/newspaperModel');
const NewspaperController = require('../controllers/newspaperController');

jest.mock('../models/newspaperModel');

describe('NewspaperController', () => {
  it('should get all newspapers successfully', async () => {
    // Mock data
    const mockNewspapers = [
      { id: 1, title: 'Newspaper 1', /* diğer özellikler */ },
      { id: 2, title: 'Newspaper 2', /* diğer özellikler */ },
      // Diğer gazeteleri burada ekleyin
    ];

    // Mock function
    newspaperModel.getAllNewspaper.mockResolvedValue(mockNewspapers);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await NewspaperController.getAllNewspaperController(req, res);

    // Beklenen fonksiyonların çağrıldığını ve verilerin doğru şekilde döndürüldüğünü kontrol et
    expect(res.json).toHaveBeenCalledWith({ newspaper: mockNewspapers });
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should handle internal server error', async () => {
    // Mock function
    newspaperModel.getAllNewspaper.mockRejectedValue(new Error('Internal Server Error'));

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await NewspaperController.getAllNewspaperController(req, res);

    // Beklenen fonksiyonların çağrıldığını ve 500 durumunun döndüğünü kontrol et
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
