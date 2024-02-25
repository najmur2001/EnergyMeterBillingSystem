import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';
import { createPdf, fetchPdf, sendPdf } from '../controllers/pdfController.js';
//import * as controller from '../controllers/pdfController.js';



/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app

/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password





//pdf

// router.route('/createPdf').post(controller.createPdf); // to generate pdf 
// router.route('/fetchPdf').get(controller.fetchPdf); // to fetch the generated pdf
// router.route('/sendPdf').post(controller.sendPdf); // sent pdf to mail 




router.route('/createPdf').post(createPdf); // to generate pdf 
router.route('/fetchPdf').get(fetchPdf); // to fetch the generated pdf
router.route('/sendPdf').post(sendPdf); // sent pdf to mail 




export default router;