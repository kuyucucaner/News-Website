const addModel = require('../models/addModel');

const AddController = {
  addNewsController: async function (req, res) {
    try {
      // Resim dosyası kontrolü
      if (!req.file) {
        return res.status(400).json({ error: 'Resim dosyası seçilmedi.' });
      }

      if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'Yalnızca resim dosyaları yükleyebilirsiniz.' });
      }

      if (req.file.size > 1000000) {
        return res.status(400).json({ error: 'Dosya boyutu 1 MB aşmamalıdır.' });
      }

      const userId = req.cookies.userID;

      // Haber verileri
      const { title, contentText, sourceID } = req.body;
      const categoryID = req.body.categoryID;  // Değiştirildi
      const imageUrl = req.file ? req.file.buffer : (req.body.imageUrl ? Buffer.from(req.body.imageUrl.split(',')[1], 'base64') : null);

      console.log('User:', userId);
      console.log('Body:', req.body);
      console.log('File:', req.file);
      console.log('categoryId:', categoryID);
      console.log('imageUrl:', imageUrl);
      console.log('Cookies:', req.cookies);

      // Veritabanına kaydet
      await addModel.addNews({ categoryId: categoryID, sourceId: sourceID, imageUrl, title, contentText }, userId);

      return res.status(200).json({ success: 'Haber başarıyla eklendi.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Haber eklenirken bir hata oluştu.' });
    }
  },
};

module.exports = AddController;
