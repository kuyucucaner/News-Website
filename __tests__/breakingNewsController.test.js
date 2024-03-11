// breakingNewsController.test.js

// breakingNewsModel modülünü jest ile mockla
jest.mock('../models/breakingNewsModel');

// breakingNewsModel modülünü içe aktar
const breakingNewsModel = require('../models/breakingNewsModel');

// BreakingNewsController modülünü içe aktar
const BreakingNewsController = require('../controllers/breakingNewsController');

describe('BreakingNewsController Tests', () => {
  afterEach(() => {
    // Her testin sonunda jest.mock ile mocklanmış fonksiyonların sıfırlanması
    jest.resetAllMocks();
  });

  it('should get last news successfully', async () => {
    // Mock breakingNewsModel.getLastNews fonksiyonunu tanımla
    breakingNewsModel.getLastNews.mockResolvedValue(['News1', 'News2']);

    // Mock Express.js response nesnesini oluştur
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    // Mock console.error'u jest mock fonksiyonu ile değiştir
    console.error = jest.fn();

    // BreakingNewsController.getLastNewsController fonksiyonunu çağır
    await BreakingNewsController.getLastNewsController({}, res);

    // Jest assert fonksiyonları ile sonuçları kontrol et
    expect(res.status).not.toHaveBeenCalled(); // Hata durumunu kontrol et
    expect(res.json).toHaveBeenCalledWith({ news: ['News1', 'News2'] }); // Doğru haberleri kontrol et

    // Mock console.error'un çağrılıp çağrılmadığını kontrol et
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should handle internal server error', async () => {
    // Mock breakingNewsModel.getLastNews fonksiyonunu hata durumunu tetikleyecek şekilde tanımla
    breakingNewsModel.getLastNews.mockRejectedValue(new Error('Internal Server Error'));

    // Mock Express.js response nesnesini oluştur
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    // Mock console.error'u jest mock fonksiyonu ile değiştir
    console.error = jest.fn();

    // BreakingNewsController.getLastNewsController fonksiyonunu çağır
    await BreakingNewsController.getLastNewsController({}, res);

    // Jest assert fonksiyonları ile hata durumunu kontrol et
    expect(res.status).toHaveBeenCalledWith(500); // Doğru HTTP durumu kontrol et
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' }); // Doğru hata mesajını kontrol et

    // Mock console.error'un çağrıldığını kontrol et
    expect(console.error).toHaveBeenCalled();
  });
});
