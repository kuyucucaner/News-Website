var express = require('express');
const RegisterController = require('../controllers/registerController');
const LoginController = require('../controllers/loginController');
const NewsController = require('../controllers/newsController');
const NewspaperController = require('../controllers/newspaperController');
const AuthController = require('../auth/authService');
const ProfileModel = require('../models/profileModel');
const ProfileController = require('../controllers/profileController');
var router = express.Router();
const multer = require('multer');
const NewsDetailController = require('../controllers/newsDetailController');
const NewsDetailModel = require('../models/newsDetailModel');
const AddController = require('../controllers/addController');
const CategoryController = require('../controllers/categoryController');
const CategoryModel = require('../models/categoryModel');
const BreakingNewsController = require('../controllers/breakingNewsController');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('main', { title: 'Caner Haber' });
});

//REGİSTER
router.get('/register', async function(req, res, next) {
  res.render('register', { title: 'Caner Haber' });
});
router.post('/addUser' , RegisterController.registerUserController);

//LOGİN
router.post('/login' , LoginController.login);

//NEWS
router.get('/getTopNews' ,NewsController.getAllNewsController);
//BREAKİNG NEWS 
router.get('/breakingNews' , BreakingNewsController.getLastNewsController);

//NEWS DETAILS 
router.get('/newDetail/:id' , NewsDetailController.getNewsDetailByIDController);
// NEWS CATEGORİES
router.get('/categories/:categoryId' , CategoryController.getNewsByCategoryController);

router.get('/sport',async function(req, res, next) {
  const categoryNews = await CategoryModel.getNewsByCategory(1);
  res.render('sport', { title: 'Caner Haber' , news : categoryNews});
});
router.get('/economy',async function(req, res, next) {
  const categoryNews = await CategoryModel.getNewsByCategory(2);
  res.render('economy', { title: 'Caner Haber' , news : categoryNews});
});
router.get('/technology',async function(req, res, next) {
  const categoryNews = await CategoryModel.getNewsByCategory(3);
  res.render('technology', { title: 'Caner Haber' , news : categoryNews});
});
router.get('/entertainment',async function(req, res, next) {
  const categoryNews = await CategoryModel.getNewsByCategory(4);
  res.render('entertainment', { title: 'Caner Haber' , news : categoryNews});
});
router.get('/health',async function(req, res, next) {
  const categoryNews = await CategoryModel.getNewsByCategory(5);
  res.render('health', { title: 'Caner Haber' , news : categoryNews});
});
router.get('/science',async function(req, res, next) {
  const categoryNews = await CategoryModel.getNewsByCategory(6);
  res.render('science', { title: 'Caner Haber' , news : categoryNews});
});
//NEWSPAPER 
router.get('/getTopNewspaper' , NewspaperController.getAllNewspaperController);
//ADDNEWS
router.get('/addNews', AuthController.authenticateToken ,async function(req, res, next) {
  res.render('addNews', { title: 'Caner Haber' });
});

router.post('/addNews' , upload.single('imageUrl'),AddController.addNewsController);

//PROFİLE
router.get('/profile',AuthController.authenticateToken, async function(req, res, next) {
  const userName = req.user.userName;
  const profile = await ProfileModel.getUserByUserName(userName);
  res.render('profile', { title: 'Caner Haber' , person : profile});
});

//PROFİLE EDİT 
router.get('/profile-edit',AuthController.authenticateToken, async function(req, res, next) {
  const userName = req.user.userName;
  const profile = await ProfileModel.getUserByUserName(userName);
  res.render('profileEdit', { title: 'Caner Haber' , person : profile});
  
});


router.post('/profile-update', upload.single('photoUrl'), ProfileController.updateProfileController);


//LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  res.clearCookie('id');
  res.clearCookie('userLoggedIn');
  res.clearCookie('userRole');
  res.redirect('/'); // Çıkış yapıldıktan sonra anasayfaya yönlendir
});

//TEST 
router.get('/test-endpoint', (req, res) => {
  res.status(200).send('Test endpoint response');
});

module.exports = router;
 