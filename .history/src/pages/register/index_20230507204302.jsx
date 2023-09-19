import "style.scss";
import { Button, Checkbox, Form, Input } from 'antd';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const RegisterPage = () => (
  

<div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          
            <Form
                className="sign-up-form"
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
            <h2 className="title">Sign up</h2>
            <Form.Item
            //label="Username"
            name="username"
            className="input-field"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            //label="Password"
            name="password"
            className="input-field"
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

                <p className="social-text">Or Sign up with social platforms</p>
                <div className="social-media">
                <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
                </a>
                </div>
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
        <div className="panel right-panel">
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
        </div>
      </div>
    </div>
    
);
export default RegisterPage;