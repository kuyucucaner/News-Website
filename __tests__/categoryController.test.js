const categoryModel = require('../models/categoryModel');
const CategoryController = require('../controllers/categoryController');

// Jest mock fonksiyonunu kullanarak categoryModel.getNewsByCategory'yi mockla
jest.mock('../models/categoryModel');

describe('CategoryController Tests', () => {
  // Her testin sonunda jest mocklarını sıfırla
  afterEach(() => {
    jest.resetAllMocks();
  });

  // Birinci test: "should get news by category successfully"
  it('should get news by category successfully', async () => {
    // Mock verileri tanımla
    const categoryId = '1';
    const mockNewsList = ['News1', 'News2'];
    
    // categoryModel.getNewsByCategory mockunu tanımla
    categoryModel.getNewsByCategory.mockResolvedValue(mockNewsList);

    // Express.js response nesnesini mockla
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    // console.log fonksiyonunu mockla
    console.log = jest.fn();

    // getNewsByCategoryController fonksiyonunu çağır
    await CategoryController.getNewsByCategoryController({ params: { categoryId } }, res);

    // Beklenen sonuçları kontrol et
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ newsList: mockNewsList });
    expect(console.log).toHaveBeenCalledWith('News List : ', mockNewsList);
  });

  // İkinci test: "should handle internal server error"
  it('should handle internal server error', async () => {
    // Mock verileri tanımla
    const categoryId = '456';

    // categoryModel.getNewsByCategory mockunu hata durumu ile tanımla
    categoryModel.getNewsByCategory.mockRejectedValue(new Error('Internal Server Error'));

    // Express.js response nesnesini mockla
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    // console.error fonksiyonunu mockla
    console.error = jest.fn();

    // getNewsByCategoryController fonksiyonunu çağır
    await CategoryController.getNewsByCategoryController({ params: { categoryId } }, res);

    // Beklenen sonuçları kontrol et
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(console.error).toHaveBeenCalled();
  });
});
