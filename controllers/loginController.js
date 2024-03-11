const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dbConfig = require('../dbConfig');
const mssql = require('mssql');

const LoginController = {
    login: async function (req, res) {
        try {
            //DATABASE
            const { userName, password , rememberMe} = req.body;
            console.log('Login Request:', { userName, password , rememberMe});
            const pool = await mssql.connect(dbConfig);
            if (!pool) {
                console.error('Veritabanına bağlanılamadı');
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            const request = pool.request();
            request.input('userName', mssql.NVarChar, userName);
            const result = await request.query('SELECT * FROM Users WHERE UserName = @userName');
            

            if (result.recordset.length === 0) {
                console.log('Geçersiz Kullanıcı Adı  :', userName);
                return res.status(401).json({ error: 'Geçersiz Kullanıcı Adı' });
            }
            const user = result.recordset[0];
            if (!user) {
                console.log('Kullanıcı bulunamadı:', userName);
                return res.status(401).json({ error: 'Geçersiz Kullanıcı Adı' });
            }
            // PASSWORD 
            if (!bcrypt.compareSync(password, user.Password)) {
                console.log('Invalid Password');
                return res.status(401).json({ error: 'Geçersiz Şifre' });
            }
  
            //REMEMBER ME
            const isRememberMe = rememberMe === 'on';
            if (isRememberMe) {
                res.cookie('rememberedUserName', userName, { httpOnly: false, secure: true});
                res.cookie('rememberedPassword', password, { httpOnly: false, secure: true});
            } else {
                res.clearCookie('rememberedUserName');
                res.clearCookie('rememberedPassword');
            }
            //JWT
            const accessToken = jwt.sign({
                ID: user.ID, userName: user.UserName,
                email: user.Email, role: user.RoleID,
                firstName : user.FirstName , lastName : user.LastName,
                biography : user.Biography , age : user.Age, 
                twitterLink : user.TwitterLink , linkedinLink : user.LinkedinLink , 
                // photoUrl : user.PhotoUrl,
            }
                , process.env.JWT_ACCESSECRETKEY, { expiresIn: '5m' });
            const refreshToken = jwt.sign({
                ID: user.ID, userName: user.UserName,
                email: user.Email, role: user.RoleID,
                firstName : user.FirstName , lastName : user.LastName,
                biography : user.Biography , age : user.Age, 
                twitterLink : user.TwitterLink , linkedinLink : user.LinkedinLink , 
                // photoUrl : user.PhotoUrl,
            }
                , process.env.JWT_REFRESHSECRETKEY, { expiresIn: '10m' });
            res.cookie('token', accessToken, { httpOnly: true, secure: true });
            res.cookie('userLoggedIn', 'true', { httpOnly: false, secure: true });
            res.cookie('userRole', user.RoleID , { httpOnly: false, secure: true });
            res.cookie('userID', user.ID , { httpOnly: false, secure: true });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
            res.cookie('id', user.ID, { httpOnly: false, secure: true });
            return res.status(200).json({ success: true, message: 'Başarılı Giriş!', user });
        } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
}
module.exports = LoginController;