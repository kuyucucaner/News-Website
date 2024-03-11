const newsModel = require('../models/newsModel');


const NewsController = {
    getAllNewsController: async function (req, res) {
      try {
        const news = await newsModel.getAllNews();
        return res.json({ news }); 
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' }); 
      }
    },  
};

module.exports = NewsController;