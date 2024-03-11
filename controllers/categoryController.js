const categoryModel = require('../models/categoryModel');


const CategoryController = {
    getNewsByCategoryController: async function (req, res) {
      try {
        const { categoryId } = req.params;
        const newsList = await categoryModel.getNewsByCategory(categoryId);
        console.log('News List : ' , newsList);
        return res.json({ newsList }); 
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' }); 
      }
    },  
};

module.exports = CategoryController;