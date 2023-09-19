import { Badge, Descriptions, Divider, Drawer, Form, Input, Modal, message, notification } from "antd";
import { useState } from "react";
import { callCreateUser } from "../../../services/api";

const UserModalCreate = (props) => {
    const {openModalCreate, setOpenModalCreate} = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {fullName, email, password, phone} = values;
        setIsSubmit(true);
        const res = await callCreateUser(fullName, email, password, phone);

        if(res && res.data) {
            message.success('Tạo mới user thành công!');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchUser();
        }else {
            notification.error({
                message: 'Đã có lỗi xảy ra!',
                description: res.message
            })
        }

        setIsSubmit(false);
    }

    return(
        <>
            <Modal 
                title='Thêm mới người dùng'
                open={openModalCreate}
                onOk={() => {
                    form.submit()
                }}
                onCancel={() => {setOpenModalCreate(false)}}
                okText={'Tạo mới'}
                cancelText={'Hủy'}
                confirmLoading={isSubmit}
            >
                <Divider/>

                <Form
                    form={form}
                    name="basic"
                    style={{maxWidth:600}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        labelCol={{span: 24}}
                        label='Tên hiển thị'
                        name='fullName'
                        rules={[{required:true, message: 'Vui lòng nhập tên hiển thị!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        labelCol={{span: 24}}
                        label='Password'
                        name='password'
                        rules={[{required:true, message: 'Vui lòng nhập Password!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        labelCol={{span: 24}}
                        label='Email'
                        name='email'
                        rules={[{required:true, message: 'Vui lòng nhập email!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        labelCol={{span: 24}}
                        label='Phone'
                        name='phone'
                        rules={[{required:true, message: 'Vui lòng nhập phone!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}
export default UserModalCreate;