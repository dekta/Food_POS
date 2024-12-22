import React from 'react';
import OrderList from '../components/Orders/OrderList';

const OrderPage = () => {
    return (
        <div style={{ marginTop: "4rem" }}>
            <h1>Order Management</h1>
            <OrderList />
        </div>
    );
};

export default OrderPage;
