import asyncHandler from 'express-async-handler';
import express from 'express';

import Client from '../models/Client';
import Error from '../types/error';
import generateToken from '../utils/generatetokens';
import ClientDetails from '../types/client_detail';
import { nextTick } from 'process';
import throwError from '../utils/throwError';

const newClient = async (req: express.Request, res: express.Response, next) => {
  try {
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
    } = req.body;

    const newClient = new Client({
      companyName,
      shortName,
      companyType,
      gstNumber,
      defaultCurrency,
      gstPercentage,
      cin,
      yearsOfIncorporation,
      address,
      pinCode,
      city,
      state,
      country,
      cgstPercentage,
      sgstPercentage,
      igstPercentage,
    });
    const savedClient = await newClient.save();

    res.status(201).json({
      message: 'Successfully created new client with the following details',
      data: [],
      success: true,
    });
  } catch (err: any) {
    if (err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getCompanies = async (req: express.Request, res: express.Response) => {
  try {
    const companies = await Client.find({});
    if (companies) {
      res.status(200).json({
        message: 'Successfully fetched companies',
        data: [companies],
        success: true,
      });
    }
  } catch (err) {
    throwError('Cannot find companies', 500);
  }
};

const getCompanyInfo = async (req: express.Request, res: express.Response) => {
  try {
    if (req.params.value !== undefined) {
      const companyInfo = await Client.findOne({
        companyName: req.params.value,
      });
      if (companyInfo) {
        res.status(200).json({
          message: 'Successfully fetched companies',
          data: [companyInfo],
          success: true,
        });
      }
    } else {
      throwError('Cannot get company info', 400);
    }
  } catch (err: any) {
    throwError(err, 500);
  }
};

const getCompanyInfoFromGst = async (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.params);
  try {
    if (req.params.gst !== undefined) {
      const companyInfo = await Client.findOne({
        gstNumber: req.params.gst,
      });
      if (companyInfo) {
        res.status(200).json({
          message: 'Successfully fetched companies',
          data: [companyInfo],
          success: true,
        });
      }
    } else {
      throwError('Cannot get company info', 400);
    }
  } catch (err: any) {
    throwError(err, 500);
  }
};

const updateClientProfile = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.params.value) {
    throwError('Enter company name', 404);
  }
  const client = await Client.findOne({ companyName: req.params.value });
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
  } = req.body;
  if (client) {
    client.companyName = companyName;
    client.shortName = shortName;
    client.companyType = companyType;
    client.gstNumber = gstNumber;
    client.defaultCurrency = defaultCurrency;
    client.cin = cin;
    client.yearsOfIncorporation = yearsOfIncorporation;
    client.gstPercentage = gstPercentage;
    client.address = address;
    client.pinCode = pinCode;
    client.city = city;
    client.state = state;
    client.country = country;
    client.cgstPercentage = cgstPercentage;
    client.sgstPercentage = sgstPercentage;
    client.igstPercentage = igstPercentage;
    const updatedClient = await client.save();

    res.json({
      _id: updatedClient._id,
      companyName: updatedClient.companyName,
      shortName: updatedClient.shortName,
      token: generateToken(updatedClient._id),
    });
  } else {
    throwError('Client not found', 404);
  }
};

const getCompaniesPage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const page_limit = 10;

    const page: any = +req.params.page || 1;
    const limit: any = req.query.limit || page_limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    console.log(page, page_limit);

    const companies = await Client.find({})
      .skip(page_limit * page - page_limit)
      .limit(page_limit);

    console.log(companies);

    // const resultCompanies = companies.slice(startIndex, endIndex);

    if (companies) {
      res.status(200).json({
        message: 'Successfully fetched companies',
        data: [companies],
        success: true,
      });
    }
  } catch (err) {
    throwError('Cannot find companies', 500);
  }
};

const countCompanies = async (req: express.Request, res: express.Response) => {
  try {
    const companiesCount = await Client.countDocuments({});
    console.log(companiesCount);
    if (companiesCount) {
      res.status(200).json({
        message: 'Successfully fetched companies',
        data: [companiesCount],
        success: true,
      });
    }
  } catch (err) {
    throwError('Cannot count companies', 500);
  }
};

export {
  newClient,
  getCompanies,
  getCompanyInfo,
  updateClientProfile,
  getCompaniesPage,
  getCompanyInfoFromGst,
  countCompanies,
};
