import { InboxOutlined } from "@ant-design/icons";
import { Modal, Table, message, notification } from "antd";
import Dragger from "antd/es/upload/Dragger";
import * as XLSX from 'xlsx';
import { useState } from "react";
import { callBulkCreateUser } from "../../../services/api";
import templateFile from './importuser.xlsx?url'
const UserImport = (props) => {
    const {openModalImport, setOpenModalImport} = props;
    const [dataExcel, setDataExcel] = useState([]);


    const dummyRequest = ({file, onSuccess}) => {
        setTimeout(() => {
            onSuccess('ok')
        },5000)
    }

    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        customRequest : dummyRequest,

        onChange(info) {
            console.log('info',info)
            const {status} = info.file;

            if(status !== 'uploading') {
                console.log(info.file)
            }
            if(status === 'done') {
                if(info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload =  function (e) {
                        const data =  new Uint8Array(reader.result); 
                        const workbook = XLSX.read(data, {type: 'array'})
                        const sheet = workbook.Sheets[workbook.SheetNames[0]]
                        const json = XLSX.utils.sheet_to_json(sheet, {
                            header: ['fullName', 'email', 'phone'],
                            range: 1
                        })
                        console.log('json', json)
                        
                        if(json && json.length > 0) {
                            setDataExcel(json)
                        }
                    }
                }
                message.success(`${info.file.name} file uploaded successfully!`);
            }
            else if(status === 'error') {
                message.error(`${info.file.name} file uploaded failed!`);
            }
        },
        onDrop(e) {
            console.log('Drop',e.dataTransfer.files)
        }
    }

    const handleSubmit = async() => {
        const data = dataExcel.map(item => {
            item.password = '123456';
            return item;
        })
        const res = await callBulkCreateUser(data)
        if(res.data) {
            notification.success({
                description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`,
                message: 'Upload thành công'
            })
            setDataExcel([]);
            setOpenModalImport(false);
            props.fetchUser();
        }else{
            notification.error({
                description: res.message,
                message: 'Đã có lỗi xảy ra!'
            })
        }
    }
    return (
        <>
            <Modal
                title= 'Import data user'
                width={'50vw'}
                open={openModalImport}
                onOk={()=> handleSubmit()}
                onCancel={()=> {
                    setOpenModalImport(false)
                    setDataExcel([])
                }}
                okText='Import data'
                okButtonProps={{
                    disabled: dataExcel.length < 1
                }}
                maskClosable= {false}
            >
                <Dragger {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only accept .csv <a onClick={(e) => {e.stopPropagation()}} href={templateFile}>Download Samble File</a>
                    </p>
                </Dragger>

                <div style={{paddingTop: 20}}>
                    <Table
                        dataSource={dataExcel}
                        title={() => <span>Dữ liệu upload</span>}
                        columns={[
                            {dataIndex:'fullName', title: 'Tên hiển thị'},
                            {dataIndex:'email', title: 'Email'},
                            {dataIndex:'phone', title: 'Số điện thoại'},
                        ]}
                    >
                      {
                        console.log('dataExcel', dataExcel)

                      }
                    </Table>
                </div>
            </Modal>
        </>
    )
}
export default UserImport;