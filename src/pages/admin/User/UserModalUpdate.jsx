import { Badge, Descriptions, Divider, Drawer, Form, Input, Modal, message, notification } from "antd";
import { useEffect, useState } from "react";
import { callUpdateUser } from "../../../services/api";

const UserModalUpdate = (props) => {
    const {openModalUpdate, dataUpdate, setOpenModalUpdate} = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {fullName, _id, phone} = values;
        setIsSubmit(true);
        const res = await callUpdateUser(fullName, _id, phone);

        if(res && res.data) {
            message.success('Cập nhật user thành công!');
            setOpenModalUpdate(false);
            await props.fetchUser();
        }else {
            notification.error({
                message: 'Đã có lỗi xảy ra!',
                description: res.message
            })
        }

        setIsSubmit(false);
    }

    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    },[dataUpdate])
    return(
        <>
            <Modal 
                title='Cập nhật người dùng'
                open={openModalUpdate}
                onOk={() => {
                    form.submit()
                }}
                onCancel={() => {setOpenModalUpdate(false)}}
                okText={'Cập nhật'}
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
                        hidden
                        labelCol={{span: 24}}
                        label='Id'
                        name='_id'
                        rules={[{required:true, message: 'Vui lòng nhập ID!'}]}
                    >
                        <Input/>
                    </Form.Item>

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
                        label='Email'
                        name='email'
                        rules={[{required:true, message: 'Vui lòng nhập email!'}]}
                    >
                        <Input disabled/>
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
export default UserModalUpdate;