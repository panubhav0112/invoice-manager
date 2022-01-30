export interface InvoiceLineItem {
  id: number;
  description: string;
  hsn: string;
  cgst: number;
  sgst: number;
  igst: number;
  invoiceAmount: number;
}
