import { useSelector } from "react-redux";
import { callUpdatePassword } from "../../services/api";
import { Form } from "antd";
import { useState } from "react";

const ChangePassword = () => {
    const {form} = Form.useForm();
    const [isSubmit , setIsSubmit] = useState(false)
    const user = useSelector(state => state.account.user);
    const onFinish = async(values) => {
        const {email, oldpass, newpass} = values;
        setIsSubmit(true);
        const res = await callUpdatePassword(email, oldpass, newpass);

        if(res && res.data) {
            message.success('Cập nhật thành công!')
            form.setFieldValue("oldpass","")
            form.setFieldValue("newpass","")


        }else {
            notification.error( {
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    }
    return (
        <>
        
        </>
    )
}

export default ChangePassword;