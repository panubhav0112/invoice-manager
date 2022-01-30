import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../components/Navbar';
import { Form, Input, Button, Row, Col, AutoComplete } from 'antd';
import { notifyFail, notifySuccess } from './ClientPage';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './ViewDetails.css';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 12,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
    lg: {
      span: 12,
      offset: 11,
    },
  },
};

const ViewDetails = ({ selectedCompany }: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [shortName, setShortName] = useState('');
  const [cin, setCin] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [yearsOfIncorporation, setYearsOfIncorporation] = useState('');
  const [lastInvoice, setLastInvoice] = useState('');
  const [invoiceDate, setinvoiceDate] = useState('');
  const [lastTransaction, setlastTransaction] = useState('');
  const [defaultCurrency, setDefaultCurrency] = useState('');
  const [gstPercentage, setgstPercentage] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [companyPin, setCompanyPin] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [companyState, setCompanyState] = useState('');
  const [companyCountry, setCompanyCountry] = useState('');
  const [companyCgst, setCompanyCgst] = useState('');
  const [companySgst, setCompanySgst] = useState('');
  const [companyIgst, setCompanyIgst] = useState('');
  const { gstNum } = useParams();
  useEffect(() => {
    setLoading(true);
    const getComapnies = async () => {
      try {
        axios
          .get(
            `http://localhost:5000/api/companies/getCompanyInfoGst/${gstNum}`
          )
          .then((companies) => {
            setLoading(false);
            console.log(companies.data.data[0], 'dsadas');
            setCompanyName(companies.data.data[0].companyName);
            setShortName(companies.data.data[0].shortName);
            setGstNumber(companies.data.data[0].gstNumber);
            setYearsOfIncorporation(
              companies.data.data[0].yearsOfIncorporation
            );
            setLastInvoice('asdasd');
            setinvoiceDate('18/12/21');
            setlastTransaction('12000');
            setCin(companies.data.data[0].cin);
            setCompanyType(companies.data.data[0].companyType);
            setgstPercentage(companies.data.data[0].gstPercentage);
            setDefaultCurrency(companies.data.data[0].defaultCurrency);
            setCompanyAddress(companies.data.data[0].address);
            setCompanyPin(companies.data.data[0].pinCode);
            setCompanyCity(companies.data.data[0].city);
            setCompanyState(companies.data.data[0].state);
            setCompanyCountry(companies.data.data[0].country);
            setCompanyCgst(companies.data.data[0].cgstPercentage);
            setCompanySgst(companies.data.data[0].sgstPercentage);
            setCompanyIgst(companies.data.data[0].igstPercentage);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      } catch (error) {
        setLoading(false);
        console.log('myError');
      }
    };
    getComapnies();
    return;
  }, []);
  const [form] = Form.useForm();
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
      lastTransaction: lastTransaction,
      invoiceDate: invoiceDate,
      lastInvoice: lastInvoice,
      companyName: companyName,
      shortName: shortName,
      companyType: companyType,
      gstNumber: gstNumber,
      yearsOfIncorporation: yearsOfIncorporation,
      cin: cin,
      defaultCurrency: defaultCurrency,
      gstPercentage: gstPercentage,
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
    lastTransaction,
    lastInvoice,
    invoiceDate,
    companyName,
    shortName,
    companyType,
    gstNumber,
    yearsOfIncorporation,
    cin,
    defaultCurrency,
    gstPercentage,
    form,
  ]);
  const onFinish = async (values: any) => {
    setLoading(true);
    await axios
      .put(`http://localhost:5000/api/update/updateCompany/${companyName}`, {
        companyName: values.companyName,
        shortName: values.shortName,
        companyType: values.companyType,
        gstNumber: values.gstNumber,
        defaultCurrency: values.defaultCurrency,
        cin: values.cin,
        gstPercentage: values.gstPercentage,
        yearsOfIncorporation: values.yearsOfIncorporation,
        address: values.address,
        pinCode: values.pin,
        city: values.city,
        state: values.state,
        country: values.country,
        cgstPercentage: values.cgst,
        sgstPercentage: values.sgst,
        igstPercentage: values.igst,
      })
      .then((response) => {
        setLoading(false);
        notifySuccess('Client Details Updated Successfully');
      })
      .catch(function (error) {
        console.log('ohgoihoihgo');
        setLoading(false);
        if (error.response) {
          notifyFail(error.response.data.message);
        } else if (error.request) {
          notifyFail(error.request);
        } else {
          notifyFail(error.message);
        }
        notifyFail(error.config);
      });
  };
  const goBack = () => {
    navigate('/clientList', { replace: true });
  };
  return (
    <>
      <div>
        <NavigationBar />
        <ArrowLeftOutlined className='arrow' onClick={goBack} />
        <h2 className='details'>
          Clients {'>'} {companyName}
        </h2>
        {loading ? (
          <Spin size='large' className='spinerUpdate' />
        ) : (
          <Form
            {...formItemLayout}
            form={form}
            name='register'
            onFinish={onFinish}
            scrollToFirstError
            className='updateForm'
          >
            <Row>
              <Col span={12}>
                <Form.Item
                  className='formLabel'
                  name='companyName'
                  label='Company Name'
                >
                  <Input className='myInput' style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className='formLabel left'
                  name='address'
                  label='Address'
                >
                  <Input
                    className='myInput leftinput'
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  className='formLabel'
                  name='shortName'
                  label='Short Name'
                >
                  <Input className='myInput' style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className='formLabel left'
                  name='pin'
                  label='PIN Code'
                >
                  <Input
                    className='myInput leftinput'
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  className='formLabel'
                  name='companyType'
                  label='Company Type'
                >
                  <Input className='myInput' style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item className='formLabel left' name='city' label='City'>
                  <Input
                    className='myInput leftinput'
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  className='formLabel'
                  name='gstNumber'
                  label='GST Number'
                >
                  <Input
                    style={{
                      width: '100%',
                    }}
                    className='myInput'
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className='formLabel left'
                  name='state'
                  label='State'
                >
                  <AutoComplete placeholder=''>
                    <Input className='myInput leftinput' />
                  </AutoComplete>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  className='formLabel'
                  name='defaultCurrency'
                  label='Default Currency'
                >
                  {/* <Input className='myInput' /> */}
                  <Input className='myInput' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className='formLabel left'
                  name='country'
                  label='Country'
                >
                  <Input
                    className='myInput leftinput'
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  className='formLabel'
                  name='gstPercentage'
                  label='GST Percentage'
                >
                  <Input
                    style={{
                      width: '100%',
                    }}
                    className='myInput'
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item className='formLabel left' name='cin' label='CIN'>
                  <Input
                    style={{
                      width: '100%',
                    }}
                    className='myInput leftinput'
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  className='formLabel'
                  name='cgst'
                  label='CGST Percent'
                >
                  <Input
                    style={{
                      width: '100%',
                    }}
                    className='myInput'
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className='formLabel left'
                  name='sgst'
                  label='SGST Percent'
                >
                  <AutoComplete placeholder=''>
                    <Input className='myInput leftinput' />
                  </AutoComplete>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  className='formLabel'
                  name='yearsOfIncorporation'
                  label='Years of Incorporation'
                >
                  <Input
                    style={{
                      width: '100%',
                    }}
                    className='myInput leftinput yrs'
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className='formLabel left'
                  name='igst'
                  label='IGST Percent'
                >
                  <AutoComplete placeholder=''>
                    <Input className='myInput leftinput' />
                  </AutoComplete>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  className='formLabel'
                  name='lastInvoice'
                  label='Last Invoice'
                >
                  <Input
                    style={{
                      width: '100%',
                    }}
                    className='myInput leftinput yrs'
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className='formLabel left'
                  name='invoiceDate'
                  label='Invoice Date'
                >
                  <AutoComplete placeholder=''>
                    <Input className='myInput leftinput' />
                  </AutoComplete>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  className='formLabel'
                  name='lastTransaction'
                  label='Last Transaction'
                >
                  <Input
                    style={{
                      width: '100%',
                    }}
                    className='myInput leftinput yrs'
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type='primary'
                htmlType='submit'
                style={{
                  position: 'absolute',
                  marginLeft: '78vh',
                  marginTop: ' -80.5vh',
                }}
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default ViewDetails;
