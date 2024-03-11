const ProfileModel = require('../models/profileModel');
const fs = require('fs');

describe('ProfileModel', () => {
  describe('getUserByUserName', () => {
    it('should return user by username', async () => {
      // Test veritabanınızın konfigürasyonunu ve bağlantısını yapmalısınız.
      // Bu örnek için dbConfig ve mssql.connect() işlemlerini gerçekleştirmeniz gerekecek.

      // Test için bir kullanıcı adı belirleyin
      const testUserName = 'canerkuyucu';

      // ProfileModel.getUserByUserName fonksiyonunu çağırın
      const user = await ProfileModel.getUserByUserName(testUserName);

      // Dönen sonuçları kontrol et
      expect(user).toBeDefined();
      expect(user.UserName).toBe(testUserName);

      // Diğer özel kontrolleri buraya ekleyebilirsiniz.
    });
  });

  describe('setUserByUserName', () => {
    it('should update user profile by username', async () => {
      // Test veritabanınızın konfigürasyonunu ve bağlantısını yapmalısınız.
      // Bu örnek için dbConfig ve mssql.connect() işlemlerini gerçekleştirmeniz gerekecek.

      // Test için bir kullanıcı adı belirleyin
      const testUserName = 'canerkuyucu';
      const fileBuffer = fs.readFileSync('C:/Users/tahac/Videos/Xin Si Lu/3.jpg');

      // Test için güncellenecek kullanıcı verileri
      const userData = {
        userName: testUserName,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        biography: 'Test biography',
        age: '25',
        twitterLink: 'https://twitter.com/testuser',
        linkedinLink: 'https://linkedin.com/in/testuser',
        fileBuffer: fileBuffer, // Eğer profil fotoğrafını güncellemek istiyorsanız uygun bir değer girin
      };

      // ProfileModel.setUserByUserName fonksiyonunu çağırın
      const result = await ProfileModel.setUserByUserName(userData);

      // Dönen sonuçları kontrol et
      expect(result).toBeDefined();
      expect(result.success).toBe('Kullanıcı başarıyla güncellenmiştir.');

      // Diğer özel kontrolleri buraya ekleyebilirsiniz.
    });
  });
});
