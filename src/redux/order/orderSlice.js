import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

// carts = [
//     {quantity:1, _id: 'abc', detail: {_id: 'abc', name: 'def'}},
//     {quantity:1, _id: 'abcd', detail: {_id: 'abcd', name: '456'}},
// ]

const initialState = {
    carts: []// thong tin cart
}
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doAddBookAction: (state, acction) => {
            let carts = state.carts;
            const item = acction.payload;

            let isExistIndex = carts.findIndex(c => c._id === item._id);
            if(isExistIndex > -1) {
                carts[isExistIndex].quantity = carts[isExistIndex].quantity + item.quantity
                if( carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity ) {
                    carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity
                }
            } else {
                carts.push({quantity: item.quantity, _id: item._id, detail: item.detail})
            }
            state.carts = carts // update state
            message.success('Sản phẩm đã được thêm vào giỏ hàng');
        },
        doUpdateCartAction: (state, acction) => {
            let carts = state.carts;
            const item = acction.payload;

            let isExistIndex = carts.findIndex(c => c._id === item._id);
            if(isExistIndex > -1) {
                carts[isExistIndex].quantity =  item.quantity
                if( carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity ) {
                    carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity
                }
            } else {
                carts.push({quantity: item.quantity, _id: item._id, detail: item.detail})
            }
            state.carts = carts // update state
        },
        doDeleteItemCartAction: (state, action) => {
            state.carts = state.carts.filter(c => c._id !== action.payload._id)
        },
        doPlaceOrderAction: (state, action) => {
            state.carts = [];
        },
        doUpdateUserInfoAction: (state, action) => {
            state.user.avatar = action.payload.avatar
            state.user.phone = action.payload.phone
            state.user.fullName = action.payload.fullName
        },
        doUploadAvatarAction:  (state, action) => {
            state.tempAvatar = action.payload.avatar;
        }
    }

})
export const {doAddBookAction, doUpdateCartAction, doDeleteItemCartAction, doPlaceOrderAction, doUploadAvatarAction} = orderSlice.actions;

export default orderSlice.reducer;