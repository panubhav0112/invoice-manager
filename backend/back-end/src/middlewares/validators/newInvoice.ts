import express, { NextFunction } from 'express';
import throwError from '../../utils/throwError';
import validator from 'validator';
import InvoiceDetails from '../../types/invoice_details';

const validateNewInvoice = async (
  req: express.Request,
  res: express.Response,
  next
) => {
  try {
    const client = req.body as InvoiceDetails;
    const {
      company,
      invoiceNumber,
      rowData,
      subtotalAmount,
      gstAmount,
      totalAmount,
      isPaymentDone,
      paymentAmount,
      paymentDate,
    } = client;
    const { description, hsn, amount } = rowData[0];
    console.log(req.body);

    if (validator.isEmpty(invoiceNumber, { ignore_whitespace: false })) {
      throwError('Invoice Number not found', 404);
    }
    if (validator.isEmpty(description, { ignore_whitespace: false })) {
      throwError('Please enter description', 400);
    }
    if (validator.isEmpty(hsn, { ignore_whitespace: false })) {
      throwError('Please hsn', 400);
    }
    if (!validator.isFloat(amount, { min: 0 })) {
      throwError('Please enter years of incorporation between 0 to 25', 400);
    }
    if (!validator.isFloat(subtotalAmount, { min: 0 })) {
      throwError('Please enter gst percentage between 0 to 50', 400);
    }
    if (!validator.isFloat(gstAmount, { min: 0 })) {
      throwError('Please enter gst percentage between 0 to 50', 400);
    }
    if (!validator.isFloat(totalAmount, { min: 0 })) {
      throwError('Please enter gst percentage between 0 to 50', 400);
    }
    next();
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default validateNewInvoice;
