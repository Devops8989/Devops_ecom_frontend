import axios from 'axios';

const BASE_URL = 'http://localhost:5002'; // product-service default

export const getProducts = () => axios.get(`${BASE_URL}/products`);
export const getCart = (userId) => axios.get(`http://localhost:5003/cart/${userId}`);
export const addToCart = (userId, item) => axios.post(`http://localhost:5003/cart/${userId}`, item);
export const loginUser = (credentials) => axios.post('http://localhost:5001/login', credentials);
export const getUserProfile = (userId) => axios.get(`http://localhost:5004/users/${userId}`);
export const placeOrder = (order) => axios.post('http://localhost:5005/orders', order);
export const makePayment = (payment) => axios.post('http://localhost:5006/pay', payment);
