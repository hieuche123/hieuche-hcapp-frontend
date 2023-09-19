import axios from "../utils/axios-customize";
export const callRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register',{fullName, email, password, phone})
}
export const callCreateUser = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user',{fullName, email, password, phone})
}

export const callUpdateUser = (fullName, _id, phone) => {
    return axios.put('/api/v1/user',{fullName, _id, phone})
}

export const callDeleteUser = ( _id) => {
    return axios.delete(`/api/v1/user/${_id}`)
}
export const callLogin = (username, password) => {
    return axios.post('/api/v1/auth/login',{username, password})
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}


export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}


export const callBulkCreateUser = (data) => {
    return axios.post('/api/v1/user/bulk-create', data)
}


export const callFetchListUser = (query) => {
    return axios.get(`/api/v1/user?${query}`)
}


export const callFetchListBook = (query) => {
    return axios.get(`/api/v1/book?${query}`)
}

export const callCreateBook = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.post('/api/v1/book',{thumbnail, slider, mainText, author, price, sold, quantity, category})
}

export const callUpdateBook = (id, thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.put(`/api/v1/book/${id}`,{thumbnail, slider, mainText, author, price, sold, quantity, category})
}

export const callDeleteBook = ( _id) => {
    return axios.delete(`/api/v1/book/${_id}`)
}
export const callFetchCategory = () => {
    return axios.get('/api/v1/database/category')
}
export const callFetchDashboard = () => {
    return axios.get('/api/v1/database/dashboard')
}

export const callFetchBookById = (id) => {
    return axios.get(`/api/v1/book/${id}`)
}


export const callPlaceOrder = (data) => {
    return axios.post(`/api/v1/order`, {...data})
}


export const callUploadBookImg=(fileImg) =>{
    const bodyFormData= new FormData();
    bodyFormData.append('fileImg',fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers:
    {
    "Content-Type":"multipart/form-data",
    "upload-type": "book"
    },
});
}


export const callUpdateAvatar=(fileImg) =>{
    const bodyFormData= new FormData();
    bodyFormData.append('fileImg',fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers:
        {
            "Content-Type":"multipart/form-data",
            "upload-type": "avatar"
        },
});
}

export const callUpdateUserInfo = (_id, phone, fullName, avatar) => {
    return axios.put(`/api/v1/user`,{_id, phone, fullName, avatar})
}

export const callUpdatePassword = (email, oldpass, newpass) => {
    return axios.post(`/api/v1/user/change-password`,{email, oldpass, newpass})
}