
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const LoginPage = () => {
  const navigate = useNavigate()
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
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            

            <Form.Item
              labelCol={{
                span: 24,
              }}
              label="email"
              name="username"
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
              wrapperCol={{
                offset: 10,
                span: 24,
              }}
            >
              <Button type="primary" htmlType="Đăng nhập" loading={false}>
                Submit
              </Button>
            </Form.Item>
          </Form>

        <h3 style={{textAlign: 'center'}}>Bạn chưa có tài khoản <span onClick={()=>{navigate('/register')}}>Đăng ký</span></h3>

  </div>
  )

    
};
export default LoginPage;