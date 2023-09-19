import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Row, Upload, message, notification } from "antd";
import { useState } from "react";
import { callUpdateAvatar, callUpdateUserInfo } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { doUploadAvatarAction } from "../../redux/order/orderSlice";
import { doUpdateUserInfoAction } from "../../redux/account/accountSlice";

const UserInfo = () => {
    const tempAvatar = useSelector(state => state.account.tempAvatar);

    const user = useSelector(state => state.account.user);
    const [userAvatar , setUserAvatar] = useState(user?.avatar?? '')
    const [isSubmit , setIsSubmit] = useState(false)

    const dispatch = useDispatch();
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${tempAvatar || user?.avatar}`
    const handleUploadAvatar = async({file, onSuccess, OnError}) => {
        const res = await callUpdateAvatar(file);
        if(res && res.data){
            const newAvatar = res.data.fileUploaded;
            dispatch(doUploadAvatarAction({avatar : newAvatar}));
            setUserAvatar(newAvatar)
            onSuccess('ok');

        }else {
            OnError('Đã có lỗi khi up load file')
        }
    }

    const propsUpload = {
        maxCount: 1,
        multiple: false,
        ShowUploadList: false,
        customRequest: handleUploadAvatar,
        onchange(info) {    
            if(info.file.status !=='uploading') {

            }
            if(info.file.status ==='done') {
                message.success('Upload file thành công!')
            }
            else if (info.file.status ==='error') {
                message.error('Lỗi Upload file!')
            }
        }
    }

    const onFinish = async(values) => {
        const {fullName, phone ,_id} = values;
        setIsSubmit(true);
        const res = await callUpdateUserInfo(_id, phone, fullName, userAvatar);

        if(res && res.data) {
            dispatch(doUpdateUserInfoAction({avatar: userAvatar, phone, fullName}))
            message.success('Cập nhật thành công!')

            localStorage.removeItem('access_token')

        }else {
            notification.error( {
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    }
    return (
        <div style={{minHeight: 400}}>
            <Row>
                <Col sm={24} md={12}>
                    <Row gutter={[30, 30]}>
                        <Col span={24}>
                            <Avatar
                                size={{xs: 32, sm: 64, md: 80, lg: 128, xl: 160, xll: 200}}
                                icon={<AntDesignOutlined/>}
                                src={urlAvatar}
                                shape="circle"
                            />
                        </Col>
                        <Col span={24}>
                            <Upload {...propsUpload}>
                                <Button icon={<UploadOutlined/>}>Upload Avatar</Button>
                            </Upload>
                        </Col>
                    </Row>
                </Col>
                <Col sm={24} md={12}>
                    <Form
                        onFinish={onFinish}
                    >

                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default UserInfo;