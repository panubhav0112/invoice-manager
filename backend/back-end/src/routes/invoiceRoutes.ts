import express from 'express';
import { newInvoice } from '../controllers/invoiceControllers';
import validateNewInvoice from '../middlewares/validators/newInvoice';

const router = express.Router();

console.log('object');

router.post('/newInvoice/:id', validateNewInvoice, newInvoice);

export default router;
