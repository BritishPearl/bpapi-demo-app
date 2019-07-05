import * as express from 'express';
import { addUser, getAuthenticatedUser } from './user';
import { loginUser } from './auth';
import passport from '../middlewares/passport';
import validateRecaptcha from '../middlewares/recaptchaValidation';
import * as bp from './bp';

const router = express.Router();
const authenticateFun = passport.authenticate('jwt', { session: false });

router.route('/api/login').post(loginUser);
router.route('/api/user').post(validateRecaptcha(), addUser);
router.route('/api/user/me').get(authenticateFun, getAuthenticatedUser);

router.route('/api/britishpearl/authorize').get(bp.auth);
router.route('/api/britishpearl/accounts').get(authenticateFun, bp.accounts);
router.route('/api/britishpearl/investment-summary').get(authenticateFun, bp.investmentSummary);
router.route('/api/britishpearl/callback').get(authenticateFun, bp.callback);
router.route('/api/britishpearl/revoke').get(authenticateFun, bp.revoke);

export default router;
