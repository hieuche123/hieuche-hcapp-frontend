import { useDispatch, useSelector } from 'react-redux';
import './order.scss'
import { Button, Empty, Form, InputNumber, Result, Steps, Input, message, notification } from 'antd';
import { DeleteTwoTone, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { doDeleteItemCartAction, doPlaceOrderAction, doUpdateCartAction } from '../../redux/order/orderSlice';
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { callPlaceOrder } from '../../services/api';
const Payment = (props) => {
    const {setCurrentStep} = props;
    const user = useSelector(state => state.account.user);
    const carts = useSelector(state => state.order.carts)
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [form] = Form.useForm();
    useEffect(()=> {
        if(carts && carts.length > 0) {
            let sum = 0;
            carts.map(item=> {
                sum += item.quantity * item.detail.price
            })
            setTotalPrice(sum)
        }
        else {
            setTotalPrice(0)
        }
    },[carts])

    const handleOnchangeInput = (value, book) => {
        if(!value || value < 1) return;
        if(!isNaN(value)) {
            dispatch(doUpdateCartAction({quantity: value, detail: book, _id: book._id}))
        }
    }

    const onFinish = async(values) => {
        setIsSubmit(true);
        const detailOrder = carts.map((item)=> {
            return {
                bookName: item.detail.mainText,
                quantity: item.quantity,
                _id: item._id
            }
        })
        const data = {
            name: values.name,
            address : values.address,
            phone: values.phone,
            totalPrice: totalPrice,
            detail: detailOrder
        }

        const res = await callPlaceOrder(data);
        if(res && res.data) {
            message.success("Đặt hàng thành công!");
            dispatch(doPlaceOrderAction());
            setCurrentStep(2);

        }
        else {
            notification.error({
                message: 'Đã có lỗi xảy ra!',
                description: res.message
            })
        }
        setIsSubmit(false);
    }
    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="view-order">
                <div className="basket">
                    
                    {
                        carts?.map((book, idex) => {
                            const currentBookPrice = book?.detail?.quantity
                            return (
                                <>
                                    <div className="basket-labels">
                                        <ul>
                                        <li className="item item-heading">Sản phẩm</li>
                                        <li className="price">Giá</li>
                                        <li className="quantity">Số lượng</li>
                                        <li className="subtotal">Thành tiền</li>
                                        </ul>
                                    </div>
                                    <div className="basket-product">
                                        <div className="item">
                                        <div className="product-image">
                                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} alt="Placholder Image 2" className="product-frame"/>
                                        </div>
                                        <div className="product-details">
                                            <h1 className="item-quantity"><strong >{currentBookPrice} x {book?.detail?.mainText}</strong></h1>
                                            <p><strong>Tác giả: {book?.detail?.author}</strong></p>
                                            <p>Mã sản phẩm - {book?.detail?._id}</p>
                                        </div>
                                        </div>
                                        <div className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price ?? 0)}</div>
                                        <div className="quantity">
                                            <InputNumber onChange={(value)=> {handleOnchangeInput(value, book)}} value={book?.quantity} />
                                        </div>
                                        <div className="subtotal">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice*book?.detail?.price ?? 0)}</div>
                                        <div className="remove">
                                            <DeleteTwoTone
                                                style={{cursor: 'pointer'}}
                                                onClick={() => dispatch(doDeleteItemCartAction({_id: book._id}))}
                                                twoToneColor='#eb2f96'
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }   

                    {

                        carts.length === 0 && 
                        <div className='order-book-empty'> 
                            <Empty description={'Không có sản phẩm trong giỏ hàng'}/>
                        </div>
                    }        
                </div>


                <aside>
                        <div className="summary">
                            <Form
                                form={form}
                                name="basic"
                                onFinish={onFinish}
                            >


                                <Form.Item
                                    labelCol={{span: 24}}
                                    label='Tên người nhận'
                                    name='name'
                                    initialValue={user?.fullName}
                                    rules={[{required: true, message: 'Vui lòng nhập Tên người nhận!'}]}
                                >
                                    <Input/>
                                </Form.Item>


                                <Form.Item
                                    labelCol={{span: 24}}
                                    label='Số điện thoại'
                                    name='phone'
                                    initialValue={user?.phone}
                                    rules={[{required:true, message: 'Vui lòng nhập Số điện thoại!'}]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    labelCol={{span: 24}}
                                    label='Địa chỉ'
                                    name='address'
                                    rules={[{required:true, message: 'Vui lòng nhập địa chỉ!'}]}
                                >
                                    <TextArea/>
                                </Form.Item>
                                <div className="summary-total">
                                    <div className="total-title">Tổng tiền</div>
                                    <div className="total-value final-value" id="basket-total">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice ?? 0)}</div>
                                </div>
                                <div className="summary-checkout">
                                    <button 
                                        className="checkout-cta" 
                                        onClick={()=>{
                                            
                                            form.submit();
                                        }}
                                        disabled={isSubmit}
                                    >
                                        {isSubmit && <span><LoadingOutlined/> &nbsp;</span>}
                                        Thanh toán ({carts?.length ?? 0})
                                    </button>
                                </div>
                            </Form>
                        </div>
                </aside>
            </div>
        </div>
    )
}
export default Payment;