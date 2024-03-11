const connect = require('../dbConfig');
const sql = require('mssql');

const Exist = {
  checkEmailExistence: async function (email) {
    try {
      const pool = await sql.connect(connect);
      const queryResult = await pool
        .request()
        .input('email', sql.NVarChar, email)
        .query('SELECT COUNT(*) AS ADET FROM Users WHERE Email = @email');
      const userCount = queryResult.recordset[0].ADET;
      return userCount > 0;
    } catch (error) {
      console.error('E-posta varlığı kontrolü sırasında bir hata oluştu:', error);
      throw error; // Hata fırlatmayı unutmayın, böylece çağıran kod hata yönetimini ele alabilir.
    }
  },
  
  checkUserNameExistence: async function (userName) {
    try {
      const pool = await sql.connect(connect);
      const query = await pool.request()
        .input('userName', sql.NVarChar, userName)
        .query('SELECT COUNT(*) AS ADET FROM Users WHERE UserName = @userName');
      const userCount = query.recordset[0].ADET;
      return userCount > 0;
    } catch (error) {
      console.error('Kullanıcı Adı varlığı kontrolü sırasında bir hata oluştu:', error);
      throw error; // Hata fırlatmayı unutmayın, böylece çağıran kod hata yönetimini ele alabilir.
    }
  }
};

module.exports = Exist;
