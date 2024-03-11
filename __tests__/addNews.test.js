const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Express uygulamanızın konfigürasyonu
app.use(bodyParser.json());
app.post('/addNews', (req, res) => {
  res.status(200).json({ success: 'Haber başarıyla eklendi.' });
});

// Test kodu başlangıcı
describe('Express App', () => {
  test('should add news successfully', async () => {
    const response = await supertest(app)
    .post('/addNews')
    .send({
      categoryID: '1',
      sourceID: '2',
      title: 'Test News',
      contentText: 'This is a test news article.',
      imageUrl: 'C:/Users/tahac/Videos/Xin Si Lu/3.jpg', // Gerçek bir dosya yolu ekleyin
    });
  
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ success: 'Haber başarıyla eklendi.' });
  
  });
});
