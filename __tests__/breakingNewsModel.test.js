const BreakingNewsModel = require('../models/breakingNewsModel');

describe('BreakingNewsModel', () => {
  describe('getLastNews', () => {
    it('should return the last news', async () => {
      // Burada test veritabanınızın konfigürasyonunu ve bağlantısını yapmalısınız.
      // Bu örnek için dbConfig ve mssql.connect() işlemlerini gerçekleştirmeniz gerekecek.

      // BreakingNewsModel.getLastNews fonksiyonunu çağırın
      const newsList = await BreakingNewsModel.getLastNews();

      // Dönen sonuçları kontrol et
      expect(newsList).toBeDefined();
      expect(newsList.length).toBeGreaterThan(0);

      // Diğer özel kontrolleri buraya ekleyebilirsiniz.
    });
  });
});
