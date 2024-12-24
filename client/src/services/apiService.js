import axios from 'axios';

const API = axios.create({
    baseURL: 'https://food-pos-evsg.onrender.com/api', 
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
    localStorage.setItem('token', data.token); 
    localStorage.setItem('user', JSON.stringify({ name: data?.name, role: data?.role, isAdmin: data?.role === "admin" ? true : false ,accessType:data?.accessType})); // Store token in localStorage
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
export const fetchCusOrders = () => API.get(`/orders/cus`);

export const registerCustomer = async (userData) => {
    const { data } = await API.post('auth/register/customer', userData);
    localStorage.setItem('token', data.token);
    return data;
};
