import { Navigate, useNavigate } from "react-router-dom"
import { Button, Result } from "antd"
import { SmileOutlined } from "@ant-design/icons";
const ResultPage = () => {
    const navigate = useNavigate();
    return (
        <>  
           <Result
                icon={<SmileOutlined/>}
                title='Đơn hàng đã được đặt thành công!'
                extra={
                    <Button type="primary" onClick={()=>{navigate('/')}}>
                        Back home
                    </Button>
                }
            >

            </Result>

        </>
    )
}

export default ResultPage;