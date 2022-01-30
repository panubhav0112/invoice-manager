import ClientDetails from './client_detail';

interface row_details {
  description: string;
  hsn: string;
  amount: string;
}

export default interface InvoiceDetails {
  company: ClientDetails;
  invoiceNumber: string;
  rowData: Array<row_details>;
  subtotalAmount: string;
  gstAmount: string;
  totalAmount: string;
  isPaymentDone: boolean;
  paymentAmount: string;
  paymentDate: string;
}
