const CategoryModel = require('../models/categoryModel');

describe('CategoryModel', () => {
  describe('getNewsByCategory', () => {
    it('should return news for a specific category', async () => {
      // Test veritabanınızın konfigürasyonunu ve bağlantısını yapmalısınız.
      // Bu örnek için dbConfig ve mssql.connect() işlemlerini gerçekleştirmeniz gerekecek.

      // Örnek bir kategori ID'si
      const categoryId = 1;

      // CategoryModel.getNewsByCategory fonksiyonunu çağırın
      const newsList = await CategoryModel.getNewsByCategory(categoryId);

      // Dönen sonuçları kontrol et
      expect(newsList).toBeDefined();
      expect(newsList.length).toBeGreaterThan(0);

      // Özel kontrolleri buraya ekleyebilirsiniz.
      // Örneğin, dönen haberlerin belirli bir kategoriye ait olup olmadığını kontrol edebilirsiniz.
      const firstNewsItem = newsList[0];
      expect(firstNewsItem.CategoryName).toEqual('Spor');
    });
  });
});
