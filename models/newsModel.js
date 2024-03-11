const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');


const NewsModel = {
    getAllNews: async function () {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool.request().query(`
                SELECT TOP 10 * FROM News 
                ORDER BY PublishDate DESC
            `);
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
    
    getNewsByCategory: async function (categoryId) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool.request()
                .input('categoryId', mssql.Int, categoryId)
                .query(`
            SELECT TOP 6 * FROM News 
            WHERE News.CategoryID = @categoryId
            ORDER BY PublishDate DESC
            `);
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
// gelen id ye göre o haberi görüntüleyeceğim bir sayfa oluşturacağım.
module.exports = NewsModel;