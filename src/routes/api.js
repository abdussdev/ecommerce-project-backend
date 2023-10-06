const express=require('express');
const BrandController = require("../controllers/BrandController");
const CategoryController = require("../controllers/CategoryController");
// const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const ProfileController = require("../controllers/ProfileController");
// const InvoiceController = require("../controllers/InvoiceController");
const AuthVerification = require("../middlewares/AuthVerification");

const router = express.Router();

// Brand & Category
router.get('/brand-list', BrandController.brandList)
router.get('/category-list', CategoryController.cetagoryList)

// Product
// router.get('/ListByCategory/:categoryID',ProductController.ListByCategory)
// router.get('/ListBySmilier/:categoryID',ProductController.ListBySmilier)
// router.get('/ListByBrand/:brandID',ProductController.ListByBrand)
// router.get('/ListByRemark/:remark',ProductController.ListByRemark)
// router.get('/SliderList',ProductController.SliderList)
// router.get('/ListByKeyword/:keyword',ProductController.ListByKeyword)

// router.get('/WishList',AuthVerification,ProductController.WishList)
// router.post('/CreateWishList',AuthVerification,ProductController.CreateWishList)
// router.post('/RemoveWishList',AuthVerification,ProductController.RemoveWishList)

// router.get('/CartList',AuthVerification,ProductController.CartList)
// router.post('/CreateCartList',AuthVerification,ProductController.CreateCartList)
// router.post('/RemoveCartList',AuthVerification,ProductController.RemoveCartList)

// router.get('/ListReview',ProductController.ListReview)
// router.get('/ProductDetails',ProductController.ProductDetails)

// User
router.get('/user-login/:email', UserController.userLogin)
router.get('/verify-login/:email/:otp', UserController.verifyLogin);

// Profile
router.post('/create-profile', AuthVerification, ProfileController.createOrUpdateProfile);
router.post('/update-profile', AuthVerification, ProfileController.createOrUpdateProfile)
router.get('/read-profile', AuthVerification, ProfileController.readProfile)

// Invoice
// router.get('/InvoiceCreate',AuthVerification,InvoiceController.InvoiceCreate)
// router.get('/InvoiceList',AuthVerification,InvoiceController.InvoiceList)
// router.get('/InvoiceProductList',AuthVerification,InvoiceController.InvoiceProductList)

// router.post('/PaymentSuccess/:trxID',InvoiceController.PaymentSuccess)
// router.post('/PaymentCancel/:trxID',InvoiceController.PaymentCancel)
// router.post('/PaymentFail/:trxID',InvoiceController.PaymentFail)
// router.post('/PaymentIPN/:trxID',InvoiceController.PaymentIPN)

module.exports = router;