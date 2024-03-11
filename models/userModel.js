const dbConfig = require('../dbConfig');
const mssql = require('mssql');

const ProfileModel = {
    getUserByUserName: async function (userName) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('userName', mssql.NVarChar, userName)
                .query(`
                SELECT *
                FROM Users
                WHERE UserName = @userName
            `);
            if (result.recordset.length > 0) {
                return result.recordset[0]; 
            }
            else {
                console.error('Kullanıcı profil sorgusu beklenen sonucu döndürmedi.');
                return { error: 'Kullanıcı profil sorgusu beklenen sonucu döndürmedi.' };
            }
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; // Hata durumunda bir nesne döndür
        }

    },
}
module.exports = ProfileModel;