const profileModel = require('../models/profileModel');

const ProfileController = {
  updateProfileController: async function (req, res) {
    try {
      // Multer işlemi başarılı bir şekilde çalıştı mı kontrol et
      if (!req.file && !req.body.photoUrl) {
        return res.status(400).json({ error: 'Profil fotoğrafı yüklenemedi. Lütfen bir dosya seçin veya mevcut bir dosya kullanın.' });
      }
      if (req.file && !req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'Yalnızca resim dosyaları yükleyebilirsiniz.' });
      }
      if (req.file && req.file.size > 1000000) {
        return res.status(400).json({ error: 'Dosya boyutu 1 MB aşmamalıdır.' });
      }      
      const result = await profileModel.setUserByUserName({
        userName: req.body.userName,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        biography: req.body.biography,
        age: req.body.age,
        twitterLink: req.body.twitterLink,
        linkedinLink: req.body.linkedinLink,
        fileBuffer: req.file ? req.file.buffer : (req.body.photoUrl ? Buffer.from(req.body.photoUrl.split(',')[1], 'base64') : null)
      });

      if (result.success) {
        res.status(200).json({ success: true, message: 'Profil başarıyla güncellendi.' });
      } else {
        console.error(result);
        console.error('Profil güncelleme sorgusu beklenen sonucu döndürmedi.');
        res.status(500).json({ success: false, error: 'Profil güncellenirken bir hata oluştu.' });
      }

    } catch (error) {
      console.error('Hata Tipi: ', error.name);
      console.error('Hata Mesajı: ', error.message);
      console.error('Hata Detayları: ', error);
      return res.status(500).json({ error: 'Profil güncellenirken bir hata oluştu: ' + error.message });
    }
  },
};

module.exports = ProfileController;
