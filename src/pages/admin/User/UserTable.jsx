import { CloudDownloadOutlined, DeleteFilled, DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Space, Row, Col, Table, Popconfirm, message, notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import InputSearch from './InputSeach';
import { current } from '@reduxjs/toolkit';
import { callDeleteUser, callFetchListUser, callUpdateUser } from '../../../services/api';
import UserViewDetail from './UserViewDetail';
import UserModalCreate from './UserModalCreate';
import UserImport from './UserImport';
import * as XLSX from 'xlsx';
import UserModalUpdate from './UserModalUpdate';

const UserTable = (props) => {
    const [listUser, setListUser] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortQuery, setSortQuery] = useState('');
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalImport, setOpenModalImport] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState('');
    const [dataUpdate, setDataUpdate] = useState([]);
    
    console.log("filter", filter)

    

    const fetchUser = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`
        if(filter) {
            query +=`&${filter}`
        }
        if(sortQuery) {
            query +=`&${sortQuery}`
        }
        const res = await callFetchListUser(query)
        if(res && res.data) {   
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);

    }
    useEffect(()=> {
        fetchUser();
    },[current, pageSize, filter, sortQuery]) 

    const handleDeleteUser = async(userId) => {
        const res = await callDeleteUser(userId)
        if(res && res.data) {
            message.success('Xóa thành công user')
            fetchUser();
        }else {
            notification.error({
                message:'Có lỗi xảy ra',
                description: res.message
            })
        }
    }
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
    {
        title: 'Action',
        render: (text, record, index) => {
            return (
                <>
                    <Popconfirm
                        placement='leftTop'
                        title={'Xác nhận xóa User'}
                        description={'Bạn có chắc muốn xóa user này?'}
                        onConfirm={() => {handleDeleteUser(record._id)}}
                        okText='Xác nhận'
                        cancelText='Hủy'
                    >
                        <span style={{cursor:'pointer', margin: '0 20px'}}>
                            <DeleteTwoTone twoToneColor='#ff4d4f'/>
                        </span>    

                    </Popconfirm>
                    <EditTwoTone
                        twoToneColor='#f57800' style={{cursor: 'pointer'}}
                        onClick={()=>{
                             setOpenModalUpdate(true)
                             setDataUpdate(record)
                        }}

                    />
                </>
            )
        }
    }
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
            // fetchUser()
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
                <span style={{display: 'flex', gap: 15}}>
                    <Button
                        icon={<ExportOutlined/>}
                        type='primary'
                        onClick={()=> {
                            handleExportData();
                        }}
                    >
                        Export
                    </Button>
    
                    <Button
                        icon={<CloudDownloadOutlined/>}
                        type='primary'
                        onClick={()=> {
                            setOpenModalImport(true);
                        }}
                    >
                        Import
                    </Button>
    
                    <Button
                        icon={<PlusOutlined/>}
                        type='primary'
                        onClick={()=> {
                            setOpenModalCreate(true);
                        }}
                    >
                        Thêm mới
                    </Button>
    
                    <Button
                        type='ghost'
                        onClick={()=> {
                            setFilter('');
                            setSortQuery('');
                        }}
                    >
                        <ReloadOutlined/>
                    </Button>
                </span>
            </div>
        )
    }
    
    const handlesearch = (query) => {
        setCurrent(1);
        setFilter(query);
    }
    
    const handleExportData = () => {
        if(listUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listUser);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1');
            XLSX.writeFile(workbook,'ExportUser.csv');
        }
        
    }

  
  return <>

            <Row gutter={[20,20]} style={{margin:'28px 10px'}}>
                <Col span={24}>
                    <InputSearch setFilter={setFilter} setSortQuery={setSortQuery} handlesearch={handlesearch}/>
                </Col>
                <Col span={24}>
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
                                    <div>
                                        {range[0]}-{range[1]} trên {total} rows
                                    </div>
                                )}
                            }
                        }
                    />
                </Col>
            </Row>
            
            <UserModalCreate
                openModalCreate = {openModalCreate}
                fetchUser= {fetchUser}
                setOpenModalCreate = {setOpenModalCreate}
            />

            <UserModalUpdate
                openModalUpdate = {openModalUpdate}
                dataUpdate = {dataUpdate}
                setDataUpdate= {setDataUpdate}
                fetchUser= {fetchUser}
                setOpenModalUpdate = {setOpenModalUpdate}
            />  
            <UserImport
                openModalImport = {openModalImport}
                setOpenModalImport = {setOpenModalImport}
            />

            <UserViewDetail
                openViewDetail={openViewDetail}      
                setOpenViewDetail = {setOpenViewDetail}  
                dataViewDetail= {dataViewDetail}  
                setDataViewDetail= {setDataViewDetail}  
            />
            
        </>
};


export default UserTable;