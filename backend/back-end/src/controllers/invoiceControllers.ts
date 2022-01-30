import express from 'express';
import generateToken from '../utils/generateTokens';
import Invoice from '../models/Invoice';
import Client from '../models/Client';
import throwError from '../utils/throwError';

const newInvoice = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  if (req.params.id) {
    try {
      const companyInfo = await Client.findOne({ _id: req.params.id });

      if (companyInfo) {
        const {
          invoiceNumber,
          rowData,
          subtotalAmount,
          gstAmount,
          totalAmount,
          isPaymentDone,
          paymentAmount,
          paymentDate,
        } = req.body;
        if (isPaymentDone) {
          const newInvoice = new Invoice({
            company: {
              clientId: companyInfo._id,
              companyName: companyInfo.companyName,
              shortName: companyInfo.shortName,
              defaultCurrency: companyInfo.defaultCurrency,
              address: companyInfo.address,
              pinCode: companyInfo.pinCode,
              city: companyInfo.city,
              state: companyInfo.state,
              country: companyInfo.country,
            },
            invoiceNumber,
            rowData,
            subtotalAmount,
            gstAmount,
            totalAmount,
            isPaymentDone,
            paymentAmount,
            paymentDate,
          });
          try {
            const savedInvoice = await newInvoice.save();
            res.status(201).json({
              message: 'Invoice created',
              data: [savedInvoice],
              success: true,
            });
          } catch (err) {
            next(err);
          }
        } else {
          const newInvoice = new Invoice({
            company: {
              clientId: companyInfo._id,
              companyName: companyInfo.companyName,
              shortName: companyInfo.shortName,
              defaultCurrency: companyInfo.defaultCurrency,
              address: companyInfo.address,
              pinCode: companyInfo.pinCode,
              city: companyInfo.city,
              state: companyInfo.state,
              country: companyInfo.country,
            },
            invoiceNumber,
            rowData,
            subtotalAmount,
            gstAmount,
            totalAmount,
            isPaymentDone,
          });
          try {
            const savedInvoice = await newInvoice.save();
            res.status(201).json({
              message: 'Invoice created',
              data: [savedInvoice],
              success: true,
            });
          } catch (err) {
            next(err);
          }
        }
      } else {
        res.status(400).json({
          message: 'enter company name',
          data: [],
          success: false,
        });
      }
    } catch (error) {
      next(error);
    }
  } else {
    throwError('Company Id not found', 404);
  }
};

export { newInvoice };
