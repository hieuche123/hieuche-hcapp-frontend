import { useDispatch, useSelector } from 'react-redux';
import './order.scss'
import { Button, Empty, InputNumber, Result, Steps } from 'antd';
import { DeleteTwoTone, SmileOutlined } from '@ant-design/icons';
import { doDeleteItemCartAction, doUpdateCartAction } from '../../redux/order/orderSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ViewOrder = (props) => {
    const {setCurrentStep} = props;
    const carts = useSelector(state => state.order.carts)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

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
    console.log('cart',carts)
    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="view-order">
                <div className="basket">
                    
                    {
                        carts?.map((book, index) => {
                            const currentBookPrice = book?.detail?.quantity
                            return (
                                <div key={index}>
                                    <div className="basket-module">
                                        <label for="promo-code">Enter a promotional code</label>
                                        <input id="promo-code" type="text" name="promo-code" maxlength="5" className="promo-code-field"/>
                                        <button className="promo-code-cta">Apply</button>
                                    </div>
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
                                            <h1><strong><span className="item-quantity">{currentBookPrice}</span> x {book?.detail?.mainText}</strong></h1>
                                            <p><strong>Navy, Size 10</strong></p>
                                            <p>Product Code - 232321939</p>
                                        </div>
                                        </div>
                                        <div className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice ?? 0)}</div>
                                        <div className="quantity">
                                            <InputNumber onChange={(value)=> {handleOnchangeInput(value, book)}} value={book?.quantity} />
                                        </div>
                                        <div className="subtotal">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice*book?.detail?.quantity ?? 0)}</div>
                                        <div className="remove">
                                            <DeleteTwoTone
                                                style={{cursor: 'pointer'}}
                                                onClick={() => dispatch(doDeleteItemCartAction({_id: book._id}))}
                                                twoToneColor='#eb2f96'
                                            />
                                        </div>
                                    </div>
                                </div>
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
                            <div className="summary-total-items"><span className="total-items"></span> Giỏ hàng của bạn</div>
                            <div className="summary-subtotal">
                            <div className="subtotal-title">Tạm tính</div>
                            <div className="subtotal-value final-value" id="basket-subtotal">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice ?? 0)}</div>
                            <div className="summary-promo hide">
                                <div className="promo-title">Promotion</div>
                                <div className="promo-value final-value" id="basket-promo"></div>
                            </div>
                            </div>
                            {/* <div className="summary-delivery">
                                <select name="delivery-collection" className="summary-delivery-selection">
                                    <option value="0" selected="selected">Thẻ tín dụng</option>
                                    <option value="collection">Momo</option>
                                    <option value="first-className">Zalo pay</option>
                                    <option value="second-className">Royal Mail 2nd className</option>
                                    <option value="signed-for">Royal Mail Special Delivery</option>
                                </select>
                            </div> */}
                            <div className="summary-total">
                                <div className="total-title">Tổng tiền</div>
                                <div className="total-value final-value" id="basket-total">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice ?? 0)}</div>
                            </div>
                            <div className="summary-checkout">
                            <button className="checkout-cta" 
                            onClick={
                                ()=>{
                                    setCurrentStep(1);
                                
                                }}
                            >
                                Thanh toán ({carts.length})
                            </button>
                            </div>
                        </div>
                </aside>
            </div>
        </div>
    )
}
export default ViewOrder;