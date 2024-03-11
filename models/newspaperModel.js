const dbConfig = require('../dbConfig');
const mssql = require('mssql');


const NewspaperModel = {
    getAllNewspaper: async function () {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool.request().query(`
            SELECT TOP 12 * FROM Newspapers 
            ORDER BY PublishDate DESC
            `);
            await mssql.close();
            return result.recordset;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
}

module.exports = NewspaperModel;