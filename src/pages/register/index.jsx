
import { Button, Checkbox, Divider, Form, Input, message, notification } from 'antd';
import { useState } from 'react';
import './register.scss'
import { useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/api';

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    const {fullname, email, password, phone} = values;
    setIsSubmit(true);
    const res = await callRegister(fullname, email, password, phone);
    setIsSubmit(false);
    if(res?.data?._id) {
      message.success('Đăng ký tài khoản thành công!');
      navigate('/login')
    }else{
      notification.error({
        message:'Có lỗi xáy ra',
        description:
          res.message && Array.isArray(res.message) ? res.message[0] :res.message[1],
        duration: 5
      })
    }
  }
  return (

       <div className="login">
        <Form
              form={form}
              name="basic"
              className="login-form"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 24,
              }}
              style={{
                maxWidth: 400,
                margin: '0 auto'
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
      >
              
              <h1 style={{marginBottom:'10px'}}>Đăng ký tài khoản</h1>
  
          <Form.Item
            labelCol={{
              span: 24,
            }}
            label="Fullname"
            name="fullname"
            rules={[
              {
                required: true,
                message: 'Please input your fullname!',
              },
            ]}
            
          >
            <Input style={{height:'40px'}}/>
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
            <Input style={{height:'40px'}} />
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
            <Input.Password style={{height:'40px'}} />
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
            <Input style={{height:'40px'}} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
              
  
              
  
              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
                style={{
                }}
                
              >
                <Button type="primary" className='button-register'  htmlType="Đăng nhập" loading={isSubmit}>
                  Đăng ký
                </Button >

              </Form.Item>
              
              <p style={{textAlign: 'center'}}>Bạn đã có tài khoản <a onClick={()=>{navigate('/login')}}>Đăng nhập</a></p>
        </Form>
    </div>


      
  )
  
    
}
export default RegisterPage;