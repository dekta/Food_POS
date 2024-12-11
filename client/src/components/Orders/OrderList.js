import React, { useEffect, useState } from 'react';
import { fetchOrders, deleteOrder } from '../../services/apiService';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchOrders();
            setOrders(data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deleteOrder(id);
        setOrders(orders.filter((order) => order._id !== id));
    };

    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>
                        {order.customerPhone} - Total: ${order.totalPrice}
                        <button onClick={() => handleDelete(order._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
