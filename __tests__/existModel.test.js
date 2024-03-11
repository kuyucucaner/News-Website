const Exist = require('../models/existModel');

describe('Exist', () => {
  describe('checkEmailExistence', () => {
    it('should check existence of email in the database', async () => {
      // Test veritabanınızın konfigürasyonunu ve bağlantısını yapmalısınız.
      // Bu örnek için dbConfig ve mssql.connect() işlemlerini gerçekleştirmeniz gerekecek.

      // Örnek bir e-posta adresi
      const email = 'tahacanerkuyucu@gmail.com';

      // Exist.checkEmailExistence fonksiyonunu çağırın
      const isEmailExist = await Exist.checkEmailExistence(email);

      // Dönen sonuçları kontrol et
      expect(isEmailExist).toBeDefined();
      expect(typeof isEmailExist).toBe('boolean');
    });
  });

  describe('checkUserNameExistence', () => {
    it('should check existence of user name in the database', async () => {
      // Test veritabanınızın konfigürasyonunu ve bağlantısını yapmalısınız.
      // Bu örnek için dbConfig ve mssql.connect() işlemlerini gerçekleştirmeniz gerekecek.

      // Örnek bir kullanıcı adı
      const userName = 'canerkuyucu';

      // Exist.checkUserNameExistence fonksiyonunu çağırın
      const isUserNameExist = await Exist.checkUserNameExistence(userName);

      // Dönen sonuçları kontrol et
      expect(isUserNameExist).toBeDefined();
      expect(typeof isUserNameExist).toBe('boolean');
    });
  });
});
