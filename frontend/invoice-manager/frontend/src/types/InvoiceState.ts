import { InvoiceLineItem } from './InvoiceLineItem';
export interface InvoiceState {
  row_data: Array<InvoiceLineItem>;
  subTotal: number;
  igst: number;
  cgst: number;
  sgst: number;
  total: number;
}
