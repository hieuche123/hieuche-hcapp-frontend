import React, {useState} from "react";
import {FaReact} from 'react-icons/fa';
import {FiShoppingCart} from 'react-icons/fi';
import {VscSearchFuzzy} from 'react-icons/vsc';
import { Divider, Badge, Drawer, Space, message, Avatar, Popover } from "antd";
import './header.scss'
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import {Dropdown} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";
import ManageAccount from "../../pages/user/ManageAccount";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carts = useSelector(state => state.order.carts)

    const hanldeLogout = async () => {
        const res = await callLogout();
        if(res && res.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công!');
            navigate('/')
        }
    }
    let items = [
        {
            
            label: <label 
                style={{cursor: 'pointer'}}
                onClick={()=> {
                    setIsModalOpen(true);
                    console.log('heloo')
                }}
            >
                Quản lý tài khoản
            </label>,
            key: 'account',
        },
        {
            
            label: <label 
                style={{cursor: 'pointer'}}
                onClick={()=>hanldeLogout()}
            >
                Đăng xuất
            </label>,
            key: 'logout',
        },
    ];
    if(user?.role === 'ADMIN') {
        items.unshift({
            label: <Link to='/admin'>Trang quản trị</Link>,
            key: 'admin',

        })
    }

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;
    const contentPopover = () => {
        return (
            <div className="pop-cart-body">
                <div className="pop-cart-content">
                    {
                        carts?.map((book, index) => {
                            return(
                                <div className="book">
                                    <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`}/>
                                    <div>{book?.detail?.mainText}</div>
                                    <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price ?? 0)}</div>
                                </div>
                            )
                        })
                        
                    }
                    

                </div>

                <div className="pop-cart-footer">
                    <button onClick={()=>{navigate('/cart')}}>Xem giỏ hàng</button>

                </div>

            </div>
        )
    }
 
    return (
        <>
            <div className="header-container">
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={()=>{setOpenDrawer(true)}}>
                            =
                        </div>
                        <div className="page-header__logo">
                            <span className="logo" onClick={()=>{navigate('/')}}>
                                <FaReact className="rotate icon-react"/> Hieu Che Shop
                                <VscSearchFuzzy className="icon-search"/>
                            </span>
                            <input className="input-search" type={'text'} placeholder="Bạn tìm gì hôm nay"/>
                        </div>
                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Popover
                                    className="popover-carts"
                                    placement="topRight"
                                    rootClassName="popover-carts"
                                    title={'Sản phẩm mới thêm'}
                                    content={contentPopover}
                                    arrow={true}
                                    
                                >
                                    <Badge
                                        count={carts?.length ?? 0}
                                        size={'small'}
                                        showZero
                                    >
                                        <FiShoppingCart className="icon-cart"/>
                                    </Badge>
                                </Popover>
                            </li>
                            <li className="navigation__item mobile">
                                <Divider
                                    type="vertical"
                                >

                                </Divider>
                            </li>
                            <li className="navigation__item mobile">
                                {
                                    !isAuthenticated ? 
                                    <span onClick={()=>{navigate('/login')}}>
                                        Tài khoản
                                    </span>
                                    :
                                    <Dropdown menu={{items}} trigger={['click']}>
                                        <a onClick={(e)=> {e.preventDefault()}}>
                                            <Space>
                                                <Avatar src={urlAvatar}/>
                                                {user?.fullName}
                                            </Space>
                                        </a>

                                    </Dropdown>
                                }
                            </li>

                        </ul>

                    </nav>

                </header>
            </div>

            <Drawer
                title= 'Menu chức năng'
                placement="left"
                onClose={()=>{setOpenDrawer(false)}}
                open={openDrawer}
            >
                <p>Quản lý tài khoản</p>
                <Divider>

                </Divider>

            </Drawer>

            <ManageAccount
                isModalOpen={isModalOpen}      
                setIsModalOpen= {setIsModalOpen}
            />
        </>
    )
}
export default Header;