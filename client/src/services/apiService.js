import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api', // Change this to your backend URL
});

// Attach token for protected routes
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});


export const registerUser = async (userData) => {
    const { data } = await API.post('auth/register', userData);
    localStorage.setItem('token', data.token);
    return data;
};

export const loginUser = async (userData) => {
    const { data } = await API.post('auth/login', userData);
    localStorage.setItem('token', data.token); // Store token in localStorage
    return data;
};

export const fetchMenuItems = () => API.get('/menu');
export const createMenuItem = (menuItem) => API.post('/menu', menuItem);
export const updateMenuItem = (id, menuItem) => API.put(`/menu/${id}`, menuItem);
export const deleteMenuItem = (id) => API.delete(`/menu/${id}`);

export const fetchOrders = () => API.get('/orders');
export const createOrder = (order) => API.post('/orders', order);
export const updateOrder = (id, order) => API.put(`/orders/${id}`, order);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);
