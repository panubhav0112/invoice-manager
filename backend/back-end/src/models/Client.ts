import mongoose from 'mongoose';
import { Schema, model, connect } from 'mongoose';
import ClientDetails from '../types/client_detail';

const newClientSchema = new Schema<ClientDetails>({
  companyName: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
    // unique: true,
  },
  companyType: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
    required: true,
  },
  defaultCurrency: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    required: true,
  },
  yearsOfIncorporation: {
    type: String,
    required: true,
  },
  gstPercentage: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  cgstPercentage: {
    type: String,
    required: true,
  },
  sgstPercentage: {
    type: String,
    required: true,
  },
  igstPercentage: {
    type: String,
    required: true,
  },
});

const Client = model<ClientDetails>('Client', newClientSchema);

export default Client;
