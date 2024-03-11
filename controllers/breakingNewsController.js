const breakingNewsModel = require('../models/breakingNewsModel');


const BreakingNewsController = {
    getLastNewsController: async function (req, res) {
      try {
        const news = await breakingNewsModel.getLastNews();
        return res.json({ news }); 
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' }); 
      }
    },  
};

module.exports = BreakingNewsController;