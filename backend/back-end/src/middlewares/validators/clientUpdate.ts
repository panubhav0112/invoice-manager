import express, { NextFunction } from 'express';
import throwError from '../../utils/throwError';
import validator from 'validator';
import Client from '../../models/Client';
import ClientDetails from '../../types/client_detail';

const validateUpdate = async (
  req: express.Request,
  res: express.Response,
  next
) => {
  try {
    const client = req.body as ClientDetails;
    const {
      companyName,
      shortName,
      companyType,
      gstNumber,
      defaultCurrency,
      cin,
      yearsOfIncorporation,
      gstPercentage,
      address,
      pinCode,
      city,
      state,
      country,
      cgstPercentage,
      sgstPercentage,
      igstPercentage,
    } = client;
    console.log(req.body);
    if (gstNumber) {
      console.log(cgstPercentage);

      if (validator.isEmpty(companyName, { ignore_whitespace: false })) {
        throwError('Please enter company name', 400);
      }
      if (validator.isEmpty(shortName, { ignore_whitespace: false })) {
        throwError('Please enter short name', 400);
      }
      if (validator.isEmpty(gstNumber, { ignore_whitespace: false })) {
        throwError('Please gst', 400);
      }

      if (validator.isEmpty(address, { ignore_whitespace: false })) {
        throwError('Please enter address', 400);
      }
      if (validator.isEmpty(city, { ignore_whitespace: false })) {
        throwError('Please enter city', 400);
      }
      if (validator.isEmpty(state, { ignore_whitespace: false })) {
        throwError('Please enter state', 400);
      }
      if (validator.isEmpty(country, { ignore_whitespace: false })) {
        throwError('Please enter country', 400);
      }

      if (!validator.isLength(shortName, { min: 1, max: 5 })) {
        throwError('Please enter short name between length 1 to 5', 400);
      }
      if (!validator.isFloat(yearsOfIncorporation, { min: 0, max: 25 })) {
        throwError('Please enter years of incorporation between 0 to 25', 400);
      }
      if (!validator.isFloat(gstPercentage, { min: 0, max: 50.0 })) {
        throwError('Please enter gst percentage between 0 to 50', 400);
      }
      if (!validator.isFloat(cgstPercentage, { min: 0, max: 50.0 })) {
        throwError('Please enter gst percentage between 0 to 50', 400);
      }
      if (!validator.isFloat(sgstPercentage, { min: 0, max: 50.0 })) {
        throwError('Please enter gst percentage between 0 to 50', 400);
      }
      if (!validator.isFloat(igstPercentage, { min: 0, max: 50.0 })) {
        throwError('Please enter igst percentage between 0 to 50', 400);
      }
      // console.log('dsad');

      next();
    } else {
      throwError('Please enter gst number', 400);
    }
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default validateUpdate;
