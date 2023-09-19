import { Badge, Descriptions, Drawer,Button } from "antd";
import moment from 'moment';
const UserViewDetail = (props) => {
    console.log("props:", props)

      const onClose = () => {
        props.setOpenViewDetail(false);
      };
    return(
        <>
            <Drawer
                title= 'Chức năng xem chi tiết'
                width={'50vw'}
                onClose={onClose}
                open={props.openViewDetail}
            >
                <Descriptions
                    title='Thông tin user'
                    bordered
                    column={2}
                >
                    <Descriptions.Item label='Id'>{props.dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label='Tên hiển thị'>{props.dataViewDetail?.fullName}</Descriptions.Item>
                    <Descriptions.Item label='Email'>{props.dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label='Số điện thoại'>{props.dataViewDetail?.phone}</Descriptions.Item>

                    <Descriptions.Item label='Role' span={2}>
                        <Badge status="processing" text={props.dataViewDetail?.role}/>
                    </Descriptions.Item>
                    <Descriptions.Item label='Create At'>
                        {moment(props.dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label='Update At'>
                        {moment(props.dataViewDetail?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>

                    
                </Descriptions>

            </Drawer>
        </>
    )
}
export default UserViewDetail;