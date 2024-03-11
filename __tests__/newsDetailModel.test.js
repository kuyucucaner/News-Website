const NewsDetailModel = require('../models/newsDetailModel');

describe('NewsDetailModel', () => {
  describe('getNewsDetailByID', () => {
    it('should return news details by ID', async () => {
      // Test veritabanınızın konfigürasyonunu ve bağlantısını yapmalısınız.
      // Bu örnek için dbConfig ve mssql.connect() işlemlerini gerçekleştirmeniz gerekecek.

      // Bir haber ID'si seçin veya örnek bir ID kullanın
      const newsId = 5;

      // NewsDetailModel.getNewsDetailByID fonksiyonunu çağırın
      const newsDetail = await NewsDetailModel.getNewsDetailByID(newsId);

      // Dönen sonuçları kontrol et
      expect(newsDetail).toBeDefined();

      // Diğer özel kontrolleri buraya ekleyebilirsiniz.
    });
  });
});
