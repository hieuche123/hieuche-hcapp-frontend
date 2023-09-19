
import { Button, Checkbox, Divider, Form, Input, message, notification } from 'antd';
import { useState } from 'react';
import './register.scss'
import { useNavigate } from 'react-router-dom';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const RegisterPage = () => {
  
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    const {fullName, email, passworf, phone} = values;
    setIsSubmit(true);
    const res = await callRegister(fullName, email, passworf, phone);
    setIsSubmit(false);
    if(res?.data?._id) {
      message.success('Đăng ký tài khoản thành công!');
      navigate('/login')
    }else{
      notification.error({
        message:'Có lỗi xáy ra',
        description:
          res.message && res.message.length >0 ? res.message[0] :res.message[1],
        duration: 5
      })
    }
  }
  return (

    <div className="register-page" >
      <h3 style={{textAlign: 'center'}}>Đăng ký người dùng mới</h3>
      <Divider/>
      <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
            margin: '0 auto'
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            labelCol={{
              span: 24,
            }}
            label="fullname"
            name="fullname"
            rules={[
              {
                required: true,
                message: 'Please input your fullname!',
              },
            ]}
          >
            <Input/>
          </Form.Item>


          <Form.Item
            labelCol={{
              span: 24,
            }}
            label="email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{
              span: 24,
            }}            
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            labelCol={{
              span: 24,
            }}            
            label="phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your phone!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={isSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>

      <h3 style={{textAlign: 'center'}}>Bạn đã có tài khoản <button onClick={()=>{navigate('/login')}}>Đăng nhập</button></h3>

  </div>
  )
  
    
}
export default RegisterPage;