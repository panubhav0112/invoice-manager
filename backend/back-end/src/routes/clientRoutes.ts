import express from 'express';
import {
  newClient,
  getCompanies,
  getCompanyInfo,
  updateClientProfile,
  getCompaniesPage,
  getCompanyInfoFromGst,
  countCompanies,
} from '../controllers/clientControllers';
import { authUser } from '../controllers/userControllers';
import protect from '../middlewares/authMiddleware';
import validateForm from '../middlewares/validators/clientRegistration';
import validateUpdate from '../middlewares/validators/clientUpdate';

const router = express.Router();

// router.route('/').post(newClient);
router.post('/newClient', validateForm, newClient);
router.get('/getCompanies', getCompanies);
router.get('/getCompaniesCount', countCompanies);
router.get('/getCompaniesPage/:page', getCompaniesPage);
router.get('/getCompanyInfo/:value', getCompanyInfo);
router.get('/getCompanyInfoGst/:gst', getCompanyInfoFromGst);
router.put('/updateCompany/:value', validateUpdate, updateClientProfile);
router.post('/login', authUser);

// export default router;
// module.exports = router;
export default router;
