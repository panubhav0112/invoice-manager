import React from 'react';
import { Form, Input, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const notifyLoginSuccess = () => toast.success('Logged In !', {});
  const notifyLoginFail = (msg: any) => toast.error(msg);

  const onFinish = async (values: any) => {
    console.log(values);
    axios
      .post('http://localhost:5000/api/signIn/login', {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        notifyLoginSuccess();
        setInterval(() => {
          navigate('/dashboard', { replace: true });
        }, 5000);
      })
      .catch(function (error) {
        if (error.response) {
          notifyLoginFail(error.response.data.message);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='signInContainer'>
      <h1>Sign In</h1>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        className='form'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your username!' }]}
          className='labelIp'
        >
          <Input className='ip' />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className='ip' />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 8, span: 16 }}
        ></Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
