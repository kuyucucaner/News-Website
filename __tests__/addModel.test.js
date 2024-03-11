const addModel = require('../models/addModel');

describe('addModel', () => {
  describe('addNews', () => {
    test('should add news successfully', async () => {
      // Örnek haber verisi
      const newsData = {
        categoryId: 1,
        sourceId: 1,
        imageUrl: Buffer.from('fakeImageData'), // Replace with actual image data
        title: 'Test News',
        contentText: 'This is a test news article.',
      };

      // Örnek kullanıcı ID
      const userId = 7;

      // Modeli test et
      const result = await addModel.addNews(newsData, userId);

      // Beklenen sonuçları kontrol et
      expect(result).toEqual({ success: 'Haber başarıyla eklenmiştir.' });
    });
  });
});
