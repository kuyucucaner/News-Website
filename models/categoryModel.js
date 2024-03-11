const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');


const CategoryModel = {
    getNewsByCategory: async function (categoryId) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool.request()
                .input('categoryId', mssql.Int, categoryId)
                .query(`
                SELECT Categories.CategoryName ,  Users.UserName , Sources.SourceName,
                News.ID ,News.ImageUrl , News.Title, News.ContentText , News.PublishDate
                FROM News
                INNER JOIN Categories ON News.CategoryID = Categories.ID
                INNER JOIN Users ON News.UserID = Users.ID
                INNER JOIN Sources ON News.SourceID = Sources.ID
                WHERE News.CategoryID = @categoryId
                ORDER BY PublishDate DESC
            `);
            console.log('Newsss :' , result);
            await mssql.close();
            if (result.recordset && result.recordset.length > 0) {
                const newsList = result.recordset.map(newsItem => {
                    if (newsItem.ImageUrl !== null && newsItem.ImageUrl !== undefined) {
                        const base64String = base64.fromByteArray(newsItem.ImageUrl);
                        newsItem.ImageUrl = `data:image/jpeg;base64,${base64String}`;
                    }
                    return newsItem;
                });
                return newsList; // Tüm haberleri döndür
            }
            } catch (err) {
            console.error(err);
            throw err;
        }
    },
}
module.exports = CategoryModel;