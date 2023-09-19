import { Navigate, useNavigate } from "react-router-dom"
import { Button, Result } from "antd"
const NotPermited = () => {
    const navigate = useNavigate();
    return (
        <>  
            <Result
                status='403'
                title='403'
                subTitle='Sorry the page you visted does not exist.'
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

export default NotPermited;