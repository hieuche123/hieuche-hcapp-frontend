
import { Button, Checkbox, Col, Divider, Form, Input, Row, message, notification } from 'antd';
import './InputSearch.scss'


const InputSearch = (props) => {
  const {handlesearch, setFilter, setSortQuery} = props;
  console.log('propsquery',props  )

  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    
    let query = '';
    if(values.fullName) {
      query += `&fullName=/${values.fullName}/i`
    }
    if(values.email) {
      query += `&email=/${values.email}/i`
    }
    if(values.phone) {
      query += `&phone=/${values.phone}/i`
    }
    if(query) {
      handlesearch(query);
    }
    console.log('query',query)

  }

  const onReset = () => {
    form.resetFields();
    setFilter('');
    setSortQuery('');
  };
  return (
    
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          >
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  labelCol={{
                    span: 24,
                  }}
                  name={`fullName`}
                  label={`Name`}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  labelCol={{
                    span: 24,
                  }}
                  name={`email`}
                  label={`Email`}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  labelCol={{
                    span: 24,
                  }}
                  name={`phone`}
                  label={`Số điện thoại`}
                >
                  <Input />
                </Form.Item>
              </Col>

            </Row>
    
            <Row style={{display:'flex', justifyContent:'flex-end'}}>

                <Form.Item
                >
                  <Button  type='primary' htmlType="submit">
                    Submit
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={onReset}
                    style={{marginLeft:'14px'}}
                  >
                    Clear
                  </Button>
                </Form.Item>
            </Row>    

          </Form>


  )

    
};
export default InputSearch;