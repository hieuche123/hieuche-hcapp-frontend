
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
    
            <div>
                <Form.Item
                  style={{display:'flex', justifyContent:'flex-end'}}
                >
                  <Button style={{width:'120px'}}  type='primary' htmlType="submit">
                    Submit
                  </Button>

                  <Button
                    style={{width:'120px', marginLeft:'16px'}}
                    htmlType="button"
                    onClick={onReset}
                  >
                    Clear
                  </Button>
                </Form.Item>
            </div>    

          </Form>


  )

    
};
export default InputSearch;