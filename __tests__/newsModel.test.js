const NewsModel = require('../models/newsModel');

describe('NewsModel', () => {
  describe('getAllNews', () => {
    it('should return the top 10 news', async () => {
      // Test veritabanınızın konfigürasyonunu ve bağlantısını yapmalısınız.
      // Bu örnek için dbConfig ve mssql.connect() işlemlerini gerçekleştirmeniz gerekecek.

      // NewsModel.getAllNews fonksiyonunu çağırın
      const allNews = await NewsModel.getAllNews();

      // Dönen sonuçları kontrol et
      expect(allNews).toBeDefined();
      expect(allNews.length).toBe(10);

      // Diğer özel kontrolleri buraya ekleyebilirsiniz.
    });
  });

  describe('getNewsByCategory', () => {
    it('should return the top 6 news for a specific category', async () => {
      // Test veritabanınızın konfigürasyonunu ve bağlantısını yapmalısınız.
      // Bu örnek için dbConfig ve mssql.connect() işlemlerini gerçekleştirmeniz gerekecek.

      // Bir kategori ID'si seçin veya örnek bir ID kullanın
      const categoryId = 1;

      // NewsModel.getNewsByCategory fonksiyonunu çağırın
      const newsByCategory = await NewsModel.getNewsByCategory(categoryId);

      // Dönen sonuçları kontrol et
      expect(newsByCategory).toBeDefined();

      // Diğer özel kontrolleri buraya ekleyebilirsiniz.
    });
  });
});
