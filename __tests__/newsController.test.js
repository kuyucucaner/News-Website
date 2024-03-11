const NewsController = require('../controllers/newsController');
const newsModel = require('../models/newsModel');

jest.mock('../models/newsModel');

describe('NewsController Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all news successfully', async () => {
    const mockNewsData = [
      { id: 1, title: 'News 1', content: 'Lorem ipsum', date: '2022-01-01' },
      { id: 2, title: 'News 2', content: 'Dolor sit amet', date: '2022-01-02' },
    ];

    jest.spyOn(newsModel, 'getAllNews').mockResolvedValue(mockNewsData);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await NewsController.getAllNewsController(req, res);

    expect(res.json).toHaveBeenCalledWith({ news: mockNewsData });
  });

  it('should handle internal server error', async () => {
    const errorMessage = 'Internal Server Error';
    jest.spyOn(newsModel, 'getAllNews').mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await NewsController.getAllNewsController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
