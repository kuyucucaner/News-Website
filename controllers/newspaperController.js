const newspaperModel = require('../models/newspaperModel');


const NewspaperController = {
    getAllNewspaperController: async function (req, res) {
      try {
        const newspaper = await newspaperModel.getAllNewspaper();
        return res.json({ newspaper }); 
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' }); 
      }
    },  
};

module.exports = NewspaperController;