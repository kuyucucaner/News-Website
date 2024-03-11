const dbConfig = require('../dbConfig');
const mssql = require('mssql');

const addModel = {
    addNews: async function (news , userId) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool.request()
            .input('categoryId', mssql.Int,  news.categoryId)
            .input('userId', mssql.Int, userId)
            .input('sourceId', mssql.Int, news.sourceId)
            .input('imageUrl', mssql.VarBinary, news.imageUrl)
            .input('title', mssql.NVarChar, news.title)
            .input('contentText', mssql.NVarChar, news.contentText)
            .input('publishDate', mssql.Date, new Date()) 
            .query(`INSERT INTO News
             (CategoryID , UserID, SourceID , ImageUrl , Title , ContentText, PublishDate) 
             VALUES 
             (@categoryId, @userId, @sourceId , @imageUrl ,@title, @contentText, @publishDate)
             `);
            console.log('result:', result);
            if (result.rowsAffected && result.rowsAffected[0] === 1) {
                console.log('Haber başarıyla eklenmiştir.');
                return { success: 'Haber başarıyla eklenmiştir.' };
             }
              else {
                console.error('Haber ekleme sorgusu beklenen sonucu döndürmedi.');
                return { error: 'Haber ekleme sorgusu beklenen sonucu döndürmedi.' };
            }
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; // Hata durumunda bir nesne döndür
        }
    },
}

module.exports = addModel;