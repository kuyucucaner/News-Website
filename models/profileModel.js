const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');

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
            if (result.recordset && result.recordset.length > 0) {
              const user = result.recordset[0];
              if (user.PhotoUrl !== null && user.PhotoUrl !== undefined) {
                  const base64String = base64.fromByteArray(user.PhotoUrl);
                  user.PhotoUrl = `data:image/jpeg;base64,${base64String}`;
              }
              return user; // Sadece ilk kullanıcıyı döndür
          } else {
              console.error('Kullanıcı profil sorgusu beklenen sonucu döndürmedi.');
              return { error: 'Kullanıcı profil sorgusu beklenen sonucu döndürmedi.' };
          }
          
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; // Hata durumunda bir nesne döndür
        }

    },
    setUserByUserName: async function (userData) {
        const {
          userName,
          email,
          firstName,
          lastName,
          biography,
          age,
          twitterLink,
          linkedinLink,
          fileBuffer,
        } = userData;
        try {
          const pool = await mssql.connect(dbConfig);
          const result = await pool
            .request()
            .input('userName', mssql.NVarChar, userName)
            .input('email', mssql.NVarChar, email || null)
            .input('firstName', mssql.NVarChar, firstName || null)
            .input('lastName', mssql.NVarChar, lastName || null)
            .input('biography', mssql.NVarChar, biography || null)
            .input('age', mssql.NVarChar, age || null)
            .input('twitterLink', mssql.NVarChar, twitterLink || null)
            .input('linkedinLink', mssql.NVarChar, linkedinLink || null)
            .input('photoUrl', mssql.VarBinary, fileBuffer !== null ? fileBuffer : null)
            .query(`
              UPDATE Users 
              SET 
                  Email = @email,
                  FirstName = @firstName,
                  LastName = @lastName,
                  Biography = @biography,
                  Age = @age,
                  TwitterLink = @twitterLink,
                  LinkedinLink = @linkedinLink,
                  PhotoUrl = @photoUrl
              WHERE UserName = @userName
            `);
        
          if (result.rowsAffected && result.rowsAffected.length > 0 && result.rowsAffected[0] === 1) {
            console.log('Kullanıcı başarıyla güncellenmiştir.');
            return { success: 'Kullanıcı başarıyla güncellenmiştir.' };
          } else {
            console.error('Kullanıcı güncelleme sorgusu beklenen sonucu döndürmedi.');
            console.error(result); // Hata mesajını detaylı bir şekilde yazdır
            return { error: 'Kullanıcı güncelleme sorgusu beklenen sonucu döndürmedi.' };
          }
        } catch (err) {
          console.error('Hata: ', err);
          console.error('Kullanıcı güncelleme sırasında bir hata oluştu:', err.message);
          return { error: 'Kullanıcı güncelleme sırasında bir hata oluştu: ' + err.message };
        }
      },
    
    
}
module.exports = ProfileModel;