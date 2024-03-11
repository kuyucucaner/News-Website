const NewsDetailController = require('../controllers/newsDetailController');
const newsDetailModel = require('../models/newsDetailModel');
const newsModel = require('../models/newsModel');

jest.mock('../models/newsDetailModel');
jest.mock('../models/newsModel');

describe('NewsDetailController', () => {
  it('should render news detail and related news when news exists', async () => {
    const mockDetail = { ID: 1, CategoryName: 'SampleCategory', /* Diğer detay bilgileri */ };
    const mockRelatedNews = [
      { ID: 2, /* Diğer haber bilgileri */ },
      { ID: 3, /* Diğer haber bilgileri */ },
      // İlgili haberleri burada ekleyin
    ];

    // Mock functions
    newsDetailModel.getNewsDetailByID.mockResolvedValue(mockDetail);
    newsModel.getNewsByCategory.mockResolvedValue(mockRelatedNews);

    const req = { params: { id: '1' } };
    const res = {
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await NewsDetailController.getNewsDetailByIDController(req, res);

    // Beklenen fonksiyonların çağrıldığını ve render edildiğini kontrol et
    expect(res.render).toHaveBeenCalledWith('newDetail', {
      title: 'Caner Haber',
      news: mockDetail,
      relatedNews: expect.arrayContaining(mockRelatedNews),
    });
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return 404 when news does not exist', async () => {
    // Mock functions
    newsDetailModel.getNewsDetailByID.mockResolvedValue(null);

    const req = { params: { id: '999' } };
    const res = {
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await NewsDetailController.getNewsDetailByIDController(req, res);

    // Beklenen fonksiyonların çağrıldığını ve 404 durumunun döndüğünü kontrol et
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'News not found' });
    expect(res.render).not.toHaveBeenCalled();
  });

  it('should return 500 for internal server error', async () => {
    // Mock functions
    newsDetailModel.getNewsDetailByID.mockRejectedValue(new Error('Internal Server Error'));

    const req = { params: { id: '1' } };
    const res = {
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await NewsDetailController.getNewsDetailByIDController(req, res);

    // Beklenen fonksiyonların çağrıldığını ve 500 durumunun döndüğünü kontrol et
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(res.render).not.toHaveBeenCalled();
  });
});
