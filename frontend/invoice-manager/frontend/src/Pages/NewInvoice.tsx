import { useState, useEffect } from 'react';
import { Row, Col, Divider } from 'antd';
import { Input } from 'antd';
import { Button, Cascader } from 'antd';
import { Form } from 'antd';
import { DatePicker } from 'antd';
import { Spin } from 'antd';
import moment from 'moment';
import NavigationBar from '../components/Navbar';
import axios from 'axios';
import { InvoiceLineItem } from '../types/InvoiceLineItem';
import { InvoiceState } from '../types/InvoiceState';
import './newInvoice.css';

const { TextArea } = Input;

interface AmountItem {
  id: number;
}

const NewInvoice = () => {
  const dateFormat = 'YYYY/MM/DD';
  const [form] = Form.useForm();

  let companiesName: Array<any> = [];

  const [invoiceLineItems, setInvoiceLineItemns] = useState<
    Array<InvoiceLineItem>
  >([]);
  const [companiesTitle, setCompaniesTitle] = useState<Array<object>>([]);

  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPin, setCompanyPin] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [companyState, setCompanyState] = useState('');
  const [companyCountry, setCompanyCountry] = useState('');
  const [companyCgst, setCompanyCgst] = useState('');
  const [companySgst, setCompanySgst] = useState('');
  const [companyIgst, setCompanyIgst] = useState('');

  const [loading, setLoading] = useState(true);

  const [invoiceState, setInvoiceState] = useState<InvoiceState>({
    row_data: [],
    igst: 0,
    cgst: 0,
    sgst: 0,
    subTotal: 0,
    total: 0,
  });

  // const [cgstAmt, setCgstAmt] = useState(0);
  // const [sgstAmt, setSgstAmt] = useState(0);
  // const [igstAmt, setIgstAmt] = useState(0);
  // const [subtotalAmount, setSubtotalAmount] = useState(0);
  // const [totalAmount, setTotalAmount] = useState(0);

  // const createNewInvoiceAmount = (): AmountItem => {
  //   return {
  //     id: Math.floor(1000 + Math.random() * 5000),
  //   };
  // };

  const createNewRow = (): InvoiceLineItem => {
    return {
      id: Math.floor(1000 + Math.random() * 9000),
      description: '',
      hsn: '',
      cgst: 0,
      sgst: 0,
      igst: 0,
      invoiceAmount: 0,
    };
  };

  useEffect(() => {
    setInvoiceLineItemns([createNewRow()]);
  }, []);

  useEffect(() => {
    const getComapnies = async () => {
      try {
        axios
          .get('http://localhost:5000/api/companies/getCompanies')
          .then((companies) => {
            // console.log(companies);
            setLoading(false);
            const updatedData = companies.data;
            companiesName = updatedData.data[0].map(
              (company: any) => company.companyName
            );
            setCompaniesTitle(
              companiesName.map((item: any) => ({
                value: item,
                label: item,
              }))
            );
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log('myError');
      }
    };
    getComapnies();
    return;
  }, []);
  const handleAddNewRow = () => {
    const updatedLineItems = [...invoiceLineItems, createNewRow()];
    // form.setFieldsValue({
    //       invoiceAmount: invoiceAmount,
    //     });
    console.log('row no.');
    setInvoiceLineItemns(updatedLineItems);
  };

  const handleDeleteNewRow = (dd: any) => {
    var temp = [...invoiceLineItems];
    var index = temp.findIndex((p) => p.id === dd);
    temp.splice(index, 1);
    setInvoiceLineItemns(temp);
  };

  const onChange = async (value: any) => {
    // console.log(value);
    try {
      const info = await axios.get(
        `http://localhost:5000/api/companyInfo/getCompanyInfo/${value}`
      );
      setCompanyAddress(info.data.data[0].address);
      setCompanyPin(info.data.data[0].pinCode);
      setCompanyCity(info.data.data[0].city);
      setCompanyState(info.data.data[0].state);
      setCompanyCountry(info.data.data[0].country);
      setCompanyCgst(info.data.data[0].cgstPercentage);
      setCompanySgst(info.data.data[0].sgstPercentage);
      setCompanyIgst(info.data.data[0].igstPercentage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(companyAddress);
    form.setFieldsValue({
      address: companyAddress,
      pin: companyPin,
      city: companyCity,
      state: companyState,
      country: companyCountry,
      cgst: companyCgst,
      sgst: companySgst,
      igst: companyIgst,
    });
  }, [
    companyAddress,
    companyPin,
    companyCity,
    companyState,
    companyCountry,
    companyCgst,
    companySgst,
    companyIgst,
    form,
  ]);

  const amountHandler = (values: any) => {
    // createNewInvoiceAmount();
    // {rowAmount: values[0].value}
    const amt = values.invoiceAmount;
    setInvoiceState({
      row_data: [
        {
          id: 1,
          description: 'asdas',
          hsn: 'adsads',
          cgst: 12,
          sgst: 12,
          igst: 12,
          invoiceAmount: amt,
        },
      ],
      igst: 0,
      cgst: 2,
      sgst: 3,
      subTotal: 4,
      total: 9,
    });
    console.log(invoiceState);
    // console.log(createNewInvoiceAmount());
    // const updatedVals = [...vals, vals.push(values[0].value)];
    // setCgstAmt(values[0].value * +companyCgst * 0.01);
    // setSgstAmt(values[0].value * +companySgst * 0.01);
    // setSubtotalAmount(values[0].value);
    // // console.log(subtotalAmount);
    // setTotalAmount(
    //   +(values[0].value * +companyCgst * 0.01) +
    //     +(values[0].value * +companySgst * 0.01) +
    //     +values[0].value
    // );
    // // console.log(vals);
    // // console.log(cgstAmt);
  };

  // useEffect(() => {
  //   // console.log(companyAddress);
  //   form.setFieldsValue({
  //     cgstAmount: cgstAmt,
  //     sgstAmount: sgstAmt,
  //   });
  // }, [cgstAmt, sgstAmt, form]);

  const onFinish = (values: any) => {
    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className='myNav'>
        <NavigationBar />
      </div>
      <h1 className='newInvoice'>New Invoice</h1>
      {loading ? (
        <Spin className='spiner' />
      ) : (
        <div className='invoiceForm'>
          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            form={form}
          >
            <Row>
              <Col span={10}>
                <Form.Item
                  label='Company'
                  name='company'
                  rules={[
                    {
                      type: 'array',
                      required: true,
                      message: 'Please select company type!',
                    },
                  ]}
                >
                  <Cascader options={companiesTitle} onChange={onChange} />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label='Address'
                  name='address'
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  label='Date'
                  name='date'
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <DatePicker defaultValue={moment()} format={dateFormat} />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label='PIN'
                  name='pin'
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  label='Invoice no.'
                  name='invoiceNo'
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label='City'
                  name='city'
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  label='Amount'
                  name='amount'
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label='State'
                  name='state'
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  label='CGST'
                  name='cgst'
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label='Country'
                  name='country'
                  rules={[
                    { required: true, message: 'Please input your country!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  label='SGST'
                  name='sgst'
                  rules={[
                    {
                      required: true,
                      message: 'Please input sgst percentage !',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label='IGST'
                  name='igst'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your igst percentage !',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      )}

      <div className='grid'>
        <Row style={{ width: '150vh' }}>
          <Col
            className='gutter-row'
            span={5}
            style={{ color: 'rgb(204, 19, 204)', width: '120vh' }}
          >
            <div>Description</div>
          </Col>
          <Col
            className='gutter-row'
            span={3}
            style={{ color: 'rgb(204, 19, 204)' }}
          >
            <div>HSN</div>
          </Col>
          <Col
            className='gutter-row'
            span={3}
            style={{ color: 'rgb(204, 19, 204)' }}
          >
            <div>Amount</div>
          </Col>
          <Col
            className='gutter-row'
            span={3}
            style={{ color: 'rgb(204, 19, 204)' }}
          >
            <div>CGST</div>
          </Col>
          <Col
            className='gutter-row'
            span={3}
            style={{ color: 'rgb(204, 19, 204)' }}
          >
            <div>SGST</div>
          </Col>
          <Col
            className='gutter-row'
            span={3}
            style={{ color: 'rgb(204, 19, 204)' }}
          >
            <div>IGST</div>
          </Col>
        </Row>
        {/* <Divider orientation='left' className='divider'></Divider> */}
      </div>
      {invoiceLineItems.map((invoiceLineItem: InvoiceLineItem) => (
        <>
          <Divider
            orientation='left'
            className='divider'
            style={{ width: '102%' }}
          ></Divider>
          <Form onFieldsChange={amountHandler} form={form} preserve={true}>
            <div>
              <Row
                key={invoiceLineItem.id}
                style={{ width: '150vh' }}
                className='rowItem'
              >
                <Col className='gutter-row' span={5}>
                  <div>
                    <TextArea id='description' rows={1} />
                  </div>
                </Col>
                <Col className='gutter-row' span={3}>
                  <div>
                    <Input placeholder='HSN' />
                  </div>
                </Col>
                <Col className='gutter-row' span={3}>
                  <div>
                    <Form.Item name='invoiceAmount'>
                      <Input placeholder='0' defaultValue='0' />
                    </Form.Item>
                  </div>
                </Col>
                <Col className='gutter-row' span={3}>
                  <div>
                    <Form.Item name='cgstAmount'>
                      <Input placeholder='0' defaultValue='0' />
                    </Form.Item>
                  </div>
                </Col>
                <Col className='gutter-row' span={3}>
                  <div>
                    <Form.Item name='sgstAmount'>
                      <Input placeholder='0' defaultValue='0' />
                    </Form.Item>
                  </div>
                </Col>
                <Col className='gutter-row' span={3}>
                  <div>
                    <Form.Item name='igstAmount'>
                      <Input placeholder='0' defaultValue='0' />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Button
                type='primary'
                shape='circle'
                className='add-btn'
                onClick={handleAddNewRow}
              >
                +
              </Button>
              <Button
                danger
                shape='circle'
                className='del-btn'
                onClick={() => handleDeleteNewRow(invoiceLineItem.id)}
              >
                -
              </Button>
            </div>
          </Form>
        </>
      ))}
      <hr className='hrStart'></hr>
      <div className='subtotal'>Subtotal </div>
      <div className='subtotalAmt'>₹{0}</div>
      <hr className='hr'></hr>
      <div className='subtotal'>CGST </div>
      <div className='subtotalAmt'>₹{0} </div>
      <hr className='hr'></hr>
      <div className='subtotal'>SGST </div>
      <div className='subtotalAmt'>₹{0} </div>
      <hr className='hr'></hr>
      <div className='subtotal'>IGST </div>
      <div className='subtotalAmt'>₹{0} </div>
      <hr className='hr'></hr>
      <div className='subtotal'>Total </div>
      <div className='subtotalAmt'>₹{0} </div>
      <hr className='hr'></hr>
    </>
  );
};

export default NewInvoice;

// "proxy": "http://127.0.0.1:5000",
