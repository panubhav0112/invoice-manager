import { useState } from 'react';
import { Form, Input, Cascader, Row, Col, Button, AutoComplete } from 'antd';
import NavigationBar from '../components/Navbar';
import { ClientDetails } from '../types/client_details';
import { ToastContainer, toast } from 'react-toastify';
import registration from '../lib/api/register';
import { Spin } from 'antd';
import './ClientPage.css';
import {
  companies,
  currencies,
  formItemLayout,
  tailFormItemLayout,
} from '../utils/ClientPage_arrays';

export const notifyFail = (msg: any) => {
  toast.error(msg);
};
export const notifySuccess = (msg: any) => toast.success(msg);

const CreateClient = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: ClientDetails) => {
    setLoading(true);
    try {
      const clientDetails = {
        companyName: values.companyName,
        shortName: values.shortName,
        companyType: values.companyType[0],
        gstNumber: values.gstNumber,
        defaultCurrency: values.defaultCurrency[0],
        gstPercentage: values.gstPercentage,
        yearsOfIncorporation: values.yearsOfIncorporation,
        address: values.address,
        pinCode: values.pinCode,
        city: values.city,
        state: values.state,
        country: values.country,
        cin: values.cin,
        cgstPercentage: values.cgstPercentage,
        sgstPercentage: values.sgstPercentage,
        igstPercentage: values.igstPercentage,
      };
      registration(clientDetails, setLoading);
    } catch (error) {
      notifyFail(error);
    }
  };

  return (
    <>
      <NavigationBar />
      {loading ? (
        <Spin size='large' className='spinerRegistration' />
      ) : (
        <>
          <div className='myForm'>
            <Col>
              <h1 className='newClient'>New - Client/Company</h1>
              <Form
                {...formItemLayout}
                form={form}
                name='register'
                onFinish={onFinish}
                scrollToFirstError
              >
                <Row>
                  <Col span={12}>
                    <Form.Item
                      className='formLabel'
                      name='companyName'
                      label='Company Name'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter Company Name',
                        },
                      ]}
                    >
                      <Input className='myInput' style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      className='formLabel left'
                      name='address'
                      label='Address'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter address',
                        },
                      ]}
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
                      rules={[
                        {
                          required: true,
                          message: 'Please enter Short Name !',
                        },
                      ]}
                    >
                      <Input className='myInput' style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      className='formLabel left'
                      name='pinCode'
                      label='PIN Code'
                      rules={[
                        {
                          // type: 'number',
                          required: true,
                          message: 'Please enter PIN Code!',
                        },
                      ]}
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
                      rules={[
                        {
                          type: 'array',
                          required: true,
                          message: 'Please select company type!',
                        },
                      ]}
                    >
                      <Cascader
                        options={companies}
                        className='myInput companytype'
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      className='formLabel left'
                      name='city'
                      label='City'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter city !',
                        },
                      ]}
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
                      name='gstNumber'
                      label='GST Number'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter GST Number!',
                        },
                      ]}
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
                      rules={[
                        {
                          required: true,
                          message: 'Please input State !',
                        },
                      ]}
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
                      rules={[
                        {
                          required: true,
                          message: 'Please enter Default Currency ',
                        },
                      ]}
                    >
                      {/* <Input className='myInput' /> */}
                      <Cascader options={currencies} className='myInput' />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      className='formLabel left'
                      name='country'
                      label='Country'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter Country!',
                        },
                      ]}
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
                      rules={[
                        {
                          required: true,
                          message: 'Please enter GST Percent!',
                        },
                      ]}
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
                      name='cin'
                      label='CIN'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter CIN Number!',
                        },
                      ]}
                    >
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
                      name='cgstPercentage'
                      label='CGST Percent'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter CGST Percentage!',
                        },
                      ]}
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
                      name='sgstPercentage'
                      label='SGST Percent'
                      rules={[
                        {
                          required: true,
                          message: 'Please input SGST Percentage!',
                        },
                      ]}
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
                      rules={[
                        {
                          required: true,
                          message: 'Please enter years of incorporation',
                        },
                      ]}
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
                      name='igstPercentage'
                      label='IGST Percent'
                      rules={[
                        {
                          required: true,
                          message: 'Please igst percentage !',
                        },
                      ]}
                    >
                      <AutoComplete placeholder=''>
                        <Input className='myInput leftinput' />
                      </AutoComplete>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    style={{
                      position: 'absolute',
                      marginLeft: '70vh',
                      marginTop: ' -61.5vh',
                    }}
                  >
                    Add New
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </div>
        </>
      )}

      <ToastContainer />
    </>
  );
};

export default CreateClient;
