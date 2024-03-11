const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const bcrypt = require('bcrypt');

const RegisterModel = {
  registerUser: async function (user) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const pool = await mssql.connect(dbConfig);
      const result = await pool
        .request()
        .input('roleId', mssql.Int, parseInt(user.roleId, 10))
        .input('userName', mssql.NVarChar, user.userName)
        .input('password', mssql.NVarChar, hashedPassword)
        .input('email', mssql.NVarChar, user.email)
        .query(`
          INSERT INTO Users (RoleID, UserName, Password, Email) 
          VALUES (@roleId, @userName, @password, @email)
        `);

      if (result.rowsAffected && result.rowsAffected[0] === 1) {
        console.log('Kullanıcı başarıyla eklenmiştir.');
        return { success: 'Kullanıcı başarıyla eklenmiştir.' };
      } else {
        console.error('Kullanıcı ekleme sorgusu beklenen sonucu döndürmedi.');
        return { error: 'Kullanıcı ekleme sorgusu beklenen sonucu döndürmedi.' };
      }
    } catch (err) {
      console.error('Kullanıcı ekleme hatası:', err);
      return { error: 'Kullanıcı eklerken bir hata oluştu.' };
    }
  },
};

module.exports = RegisterModel;
