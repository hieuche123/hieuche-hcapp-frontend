import { CloudDownloadOutlined, DeleteFilled, DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Space, Row, Col, Table, Popconfirm, message, notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import InputSearch from '../../pages/admin/User/InputSeach';
import { current } from '@reduxjs/toolkit';
import { callDeleteUser, callFetchListOrder, callUpdateUser } from '../../services/api';
import UserViewDetail from '../../pages/admin/User/UserViewDetail';
import UserModalCreate from '../../pages/admin/User/UserModalCreate';
import UserImport from '../../pages/admin/User/UserImport';
import * as XLSX from 'xlsx';
import UserModalUpdate from '../../pages/admin/User/UserModalUpdate';

const HistoryOrder = (props) => {
    const [listUser, setListUser] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortQuery, setSortQuery] = useState('');
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState('');
    
    console.log("filter", filter)

    

    const fetchOrder = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`
        if(filter) {
            query +=`&${filter}`
        }
        if(sortQuery) {
            query +=`&${sortQuery}`
        }
        const res = await callFetchListOrder(query)
        if(res && res.data) {   
            setListUser(res.data.result);
            console.log("listUser:", listUser)
            
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);

    }
    useEffect(()=> {
        fetchOrder();
    },[current, pageSize, filter, sortQuery]) 

   
  const columns = [
    {
        title: 'Id',
        dataIndex: '_id',
        render: (text, record, index) => {
            return (
                <a href='#' onClick={() => {
                setDataViewDetail(record);
                setOpenViewDetail(true);
                }}>{record._id}</a>
            )
        }
    },
    {
        title: 'Tên hiển thị',
        dataIndex: 'fullName',
        sorter: true,

    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: true,

    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        sorter: true,
    },
    
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
            // fetchOrder()
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize (pagination. pageSize)
            setCurrent(1);
        }
        
        if (sorter && sorter.field) {
            const q = sorter.order === "ascend" ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(q);

        }
    }

    const renderHeader = (props) => {
        return (
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Tab list user</span>
                
            </div>
        )
    }
    
    const handlesearch = (query) => {
        setCurrent(1);
        setFilter(query);
    }
    
   

  return <>

            <Row gutter={[20,20]} style={{margin:'28px 10px'}}>
                <Col span={24}>
                    <InputSearch setFilter={setFilter} setSortQuery={setSortQuery} handlesearch={handlesearch}/>
                </Col>
                <Col span={24} style={{marginTop:'-30px'}}>
                    <Table 
                        title={renderHeader}
                        loading={isLoading}
                        columns={columns} 
                        rowKey='_id'
                        dataSource={listUser} 
                        onChange={onChange}
                        pagination= {
                            {   
                                current: current, 
                                pageSize: pageSize, 
                                showSizeChanger: true, 
                                total: total,
                                showTotal: (total, range) => {return (
                                    <div >
                                        {range[0]}-{range[1]} trên {total} rows
                                    </div>
                                )}
                            }
                        }
                    />
                </Col>
            </Row>

            <UserViewDetail
                openViewDetail={openViewDetail}      
                setOpenViewDetail = {setOpenViewDetail}  
                dataViewDetail= {dataViewDetail}  
                setDataViewDetail= {setDataViewDetail}  
            />
            
        </>
};


export default HistoryOrder;