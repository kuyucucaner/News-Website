const newsDetailModel = require('../models/newsDetailModel.js');
const newsModel = require('../models/newsModel.js');

const NewsDetailController = {
    getNewsDetailByIDController: async function (req, res) {
        try {
            const id = req.params.id;
            console.log('ID: ', id);
            const detail = await newsDetailModel.getNewsDetailByID(id);            
            if (detail) {
                console.log('Category:', detail.CategoryName);
                const news = await newsModel.getNewsByCategory(detail.ID);
                
                // Seçilen detaylarla aynı ID'ye sahip olan haberleri filtrele
                const filteredNews = news.filter(item => item.ID !== parseInt(id));

                res.render('newDetail', { title: 'Caner Haber', news: detail, relatedNews: filteredNews });
            } else {
                console.log('Haber bulunamadı');
                return res.status(404).json({ error: 'News not found' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = NewsDetailController;
