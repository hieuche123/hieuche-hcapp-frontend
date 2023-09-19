
import { Button, Checkbox, Divider, Form, Input } from 'antd';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const RegisterPage = () => (
  
<div className="container" >
      <div className="forms-container" style={{display: 'flex', justifyContent: 'center'}} >
        <div className="signin-signup" >
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
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="panels-container">
        {/* <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div> */}
        {/* <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div> */}
      </div>
  </div>
    
);
export default RegisterPage;