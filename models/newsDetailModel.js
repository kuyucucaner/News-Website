const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');


const NewsDetailModel  = {
    getNewsDetailByID: async function (newsId) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('id', mssql.Int, newsId)
                .query(`SELECT Categories.ID , Categories.CategoryName ,  Users.UserName , Sources.SourceName,
                News.ImageUrl , News.Title, News.ContentText , News.PublishDate
                FROM News
                INNER JOIN Categories ON News.CategoryID = Categories.ID
                INNER JOIN Users ON News.UserID = Users.ID
                INNER JOIN Sources ON News.SourceID = Sources.ID
                WHERE News.ID = @id`);

    
                if (result.rowsAffected && result.rowsAffected[0] === 1) {
                    const newsDetail = result.recordset[0];
                    if (newsDetail.ImageUrl !== null && newsDetail.ImageUrl !== undefined) {
                        const base64String = base64.fromByteArray(newsDetail.ImageUrl);
                        newsDetail.ImageUrl = `data:image/jpeg;base64,${base64String}`;
                    }
                    return newsDetail; // Sadece bir haber detayını döndür
                }
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
}
module.exports = NewsDetailModel;