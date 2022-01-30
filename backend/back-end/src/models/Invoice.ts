import mongoose from 'mongoose';
import { Schema, model, connect } from 'mongoose';
import Client from './Client';
import InvoiceDetails from '../types/invoice_details';

const newInvoiceSchema = new Schema<InvoiceDetails>(
  {
    company: [
      {
        clientId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Client',
        },
        companyName: {
          type: String,
        },
        shortName: {
          type: String,
        },
        address: {
          type: String,
        },
        pinCode: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        defaultCurrency: {
          type: String,
        },
      },
    ],
    invoiceNumber: {
      type: String,
    },
    rowData:
      // type: Array,
      [
        {
          description: { type: String },
          hsn: { type: String },
          amount: { type: String },
        },
      ],
    subtotalAmount: {
      type: String,
    },
    gstAmount: {
      type: String,
    },
    totalAmount: {
      type: String,
    },
    isPaymentDone: {
      type: Boolean,
    },
    paymentAmount: {
      type: String,
    },
    paymentDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = model<InvoiceDetails>('Invoice', newInvoiceSchema);

export default Invoice;
