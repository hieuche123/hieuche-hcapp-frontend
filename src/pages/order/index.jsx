import { Button, Result, Steps } from "antd"
import ViewOrder from "../../components/Order/ViewOrder"
import { useState } from "react"
import { SmileOutlined } from "@ant-design/icons"
import Payment from "../../components/Order/Payment"
import "./order.scss"
import ResultPage from "../../components/Order/Result"

const OrderPage = (props) => {
    const [currentStep, setCurrentStep] = useState(0)
    return (
        <div style={{background:'#efefef', padding: '20px 0'}}>
            <div className="order-container" style={{maxWidth: '1440px', margin: '0 auto'}} >
                <div className="order-steps">
                    <Steps 
                        className="order-step"
                        size="small" 
                        current={currentStep} 
                        status={'finish'} 
                        items={[
                            {
                                title: "Đơn hàng",
                            },
                            {
                                title: "Đặt hàng",
                            },
                            {
                                title: "Thanh toán",
                            },
                        ]}>
                    

                    </Steps>
                </div>
                {
                    currentStep === 0 && 
                        <ViewOrder setCurrentStep={setCurrentStep} />
                }
                {
                    currentStep === 1 && 
                        <Payment setCurrentStep={setCurrentStep} />
                }
                {
                    currentStep === 2 && 
                        <ResultPage/>
                }
            </div>
        </div>
    )
}

export default OrderPage;