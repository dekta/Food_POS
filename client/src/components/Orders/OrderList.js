import React, { useEffect, useState } from 'react';
import { fetchOrders, deleteOrder, updateOrder, fetchCusOrders } from '../../services/apiService';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DeleteOutline, DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { handleGetUser } from '../../utils/helper';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [cusOrders, setCusOrders] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', customerPhone: '', status: '' });
    const navigate = useNavigate();
    const user = handleGetUser();
    const isEdit = user?.isAdmin;
    const isDelete = user?.isAdmin;
    const role = user?.role

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await fetchOrders();
                const { data: cusOrdersData } = await fetchCusOrders() 
                setOrders(data);
                setCusOrders(cusOrdersData || [])
            }
            catch (err) {
                if (err?.status === 401) {
                    navigate("/login")
                }
            }
            finally {

            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deleteOrder(id);
        setOrders(orders.filter((order) => order._id !== id));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateOrder = async () => {
        setLoading(true)
        if (!formData?.fullName || !formData?.customerPhone || !formData?.items?.length) {
            alert("Please fill the all fields...!")
            return
        }
        const payload = {
            items: formData?.items?.map((item) => {
                return {
                    menuItem: item?.menuItem?._id,
                    quantity: item?.quantity,
                    price: item?.menuItem?.price
                }
            }),
            totalPrice: formData?.totalPrice,
            status: formData?.status,
            customerPhone: formData?.customerPhone,
            fullName: formData?.fullName,
        };
        try {
            await updateOrder(formData?._id, payload);
            localStorage.removeItem("POS_CART");
            navigate("/");

        }
        catch (err) {
            if (err?.status === 401) {
                navigate("/login")
            }
        }
        finally {
            setLoading(false)
            setIsOpen(false);
        }
    }


    const handleDeleteItem = (id) => {
        setFormData(prev => {
            const updatedItems = prev?.items?.filter(item => item?._id !== id);
            let localPrice = 0;
            const updatedAmount = updatedItems?.forEach(element => {
                localPrice += element?.menuItem?.price * element?.quantity
            });
            return {
                ...prev, items: updatedItems,
                totalPrice: localPrice
            }
        });
    }

    return (
        <>
            {role ==='customer' && (<Box sx={{ display: "flex", flexDirection: "column", gap: "2rem", }}>
                {cusOrders.map((order) => (
                    <Box key={order._id} sx={
                        {
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            padding: "2rem",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }
                    }>
                        <Box>
                            <Typography variant='h5'>{order?.fullName}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Typography variant='subtitle2'>Total</Typography>
                                <Typography variant='subtitle2'>${order.totalPrice}</Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>)}
            {role !=='customer' && (<Box sx={{ display: "flex", flexDirection: "column", gap: "2rem", }}>
                {orders.map((order) => (
                    <Box key={order._id} sx={
                        {
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            padding: "2rem",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }
                    }>
                        <Box>
                            <Typography variant='h5'>{order?.fullName}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Typography variant='subtitle2'>Total</Typography>
                                <Typography variant='subtitle2'>${order.totalPrice}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <IconButton disabled={isDelete ? false : true} variant="contained" onClick={() => handleDelete(order._id)}><DeleteOutline /></IconButton>
                            <IconButton disabled={isEdit ? false : true} variant="contained" onClick={() => {
                                setFormData(order);
                                setIsOpen(true);
                            }}><EditOutlined /></IconButton>
                        </Box>
                    </Box>
                ))}
            </Box>)}
            <Dialog
                open={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
            >
                {
                    loading && <LinearProgress />
                }
                <DialogTitle>Update Order</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", width: "500px", }}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="fullName"
                            name="fullName"
                            label="Full Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="customerPhone"
                            name="customerPhone"
                            label="Customer Phone"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={formData.customerPhone}
                            onChange={handleChange}
                        />
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                            id="status"
                            onChange={handleChange}
                            name='status'
                            sx={{ width: "100%" }}
                            value={formData?.status}
                        >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                        </Select>

                        <Box>
                            {formData?.items?.map((item) => {
                                return <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                                    <Typography>{item?.menuItem?.name}</Typography>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                                        <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", gap: "10px" }}>
                                            <Typography variant='subtitle2'>Price</Typography>
                                            <Typography variant='subtitle2'>${item?.menuItem?.price} * {item?.quantity}</Typography>
                                        </Box>
                                        <IconButton disabled={isDelete ? false : true} onClick={() => handleDeleteItem(item?._id)}><DeleteOutlined /></IconButton>
                                    </Box>
                                </Box>
                            })}
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", gap: "10px" }}>
                            <Typography sx={{ color: "gray" }} variant='h6'>Total Amount</Typography>
                            <Typography variant='h6'>${formData?.totalPrice}</Typography>
                        </Box>
                        <Button sx={{ width: "100%", marginTop: "10px" }} onClick={handleUpdateOrder} variant='contained'>{loading ? "Loading..." : "Update"}</Button>

                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default OrderList;
