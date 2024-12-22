import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { createOrder } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { handleGetUser, handleTruncate } from '../utils/helper';

const CheckoutPage = () => {
    const [localRecords, setLocalRecords] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [isOpen, setIsOpen] = useState(false)
    const [clickedItem, setClickedItem] = useState({});
    const [isCheckout, setIsCheckout] = useState();
    const [formData, setFormData] = useState({ fullName: '', customerPhone: '', status: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const user = handleGetUser();
    const isDelete = user?.isAdmin;

    const handleRemove = (id) => {
        let localStorageData = JSON.parse(localStorage.getItem("POS_CART")) || []
        localStorageData = localStorageData?.filter((item) => item?._id !== id)
        localStorage.setItem("POS_CART", JSON.stringify(localStorageData));
        setLocalRecords(localStorageData);
    }

    const handleEditQuantity = () => {
        let localStorageData = JSON.parse(localStorage.getItem("POS_CART")) || []
        localStorageData = localStorageData?.map((item) => {
            if (item?._id === clickedItem?._id) {
                return { ...item, quantity }
            }
            return item
        });
        localStorage.setItem("POS_CART", JSON.stringify(localStorageData));
        setLocalRecords(localStorageData)
        setClickedItem({});
        setQuantity(0);
        setIsOpen(false);
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleGenerateOrder = async () => {
        setLoading(true)
        if (!formData?.fullName || !formData?.customerPhone || !localRecords?.length) {
            alert("Please fill the all fields...!")
            return
        }
        const payload = {
            items: localRecords?.map((item) => {
                return {
                    menuItem: item?._id,
                    quantity: item?.quantity,
                    price: item?.price
                }
            }),
            totalPrice: totalAmount,
            status: formData?.status,
            customerPhone: formData?.customerPhone,
            fullName: formData?.fullName,
        };
        console.log('payload:', payload)
        try {
            await createOrder(payload);
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

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("POS_CART")) || []
        let localTotal = 0;
        localStorageData?.forEach(element => {
            localTotal += element?.price * element?.quantity;
        });
        setTotalAmount(localTotal)
        setLocalRecords(localStorageData);

        if ((JSON.parse(localStorage.getItem("POS_CART")) || []).length === 0) {
            navigate("/")
        }
    }, [quantity, (JSON.parse(localStorage.getItem("POS_CART")) || []).length])

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh", marginTop: "4rem" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: "2rem", height: "80vh", overflow: 'hidden', overflowY: "auto" }}>
                    {localRecords.map((item) => (
                        <Card key={item._id} sx={{ width: 345, height: "fit-content" }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={item?.url}
                                title={item?.name}
                            />
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item?.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        ${item?.price}
                                    </Typography>
                                </Box>
                                <Tooltip title={item?.description}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {handleTruncate(item?.description, 45)}
                                    </Typography>
                                </Tooltip>
                            </CardContent>
                            <CardActions sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <IconButton disabled={isDelete ? false : true} onClick={() => handleRemove(item?._id)}><DeleteOutlined /></IconButton>
                                <Button onClick={() => {
                                    setIsOpen(true);
                                    setQuantity(item?.quantity)
                                    setClickedItem(item);
                                }} size="small">Update Quantity</Button>
                                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <Typography variant='subtitle2'>Quantity</Typography>
                                    <Typography variant='subtitle2'>{item?.quantity}</Typography>
                                </Box>
                            </CardActions>
                        </Card>
                    ))}
                </Box >
                <footer style={{ padding: "1rem", display: "flex", justifyContent: "right", alignItems: "center", gap: "1rem" }}>
                    <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", gap: "10px" }}>
                        <Typography sx={{ color: "gray" }} variant='h6'>Total Amount</Typography>
                        <Typography variant='h6'>${totalAmount}</Typography>
                    </Box>
                    <Button variant='contained' onClick={() => {
                        setIsCheckout(true);
                        setIsOpen(true);
                    }}>Generate Order</Button>
                </footer>
            </Box>
            <Dialog
                open={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
            >
                {
                    loading && <LinearProgress />
                }
                <DialogTitle>{isCheckout ? "Generate Order" : "Update Quantity"}</DialogTitle>
                <DialogContent>{
                    isCheckout ? <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", width: "500px" }}>
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
                        <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", gap: "10px" }}>
                            <Typography sx={{ color: "gray" }} variant='h6'>Total Amount</Typography>
                            <Typography variant='h6'>${totalAmount}</Typography>
                        </Box>
                        <Button sx={{ width: "100%", marginTop: "10px" }} onClick={handleGenerateOrder} variant='contained'>{loading ? "Loading..." : "Generate"}</Button>

                    </Box> : <>
                        <Box style={{ display: "flex", alignItems: "center", margin: "10px 0px" }}>
                            <Button disabled={quantity === 0 ? true : false} onClick={() => setQuantity(quantity - 1)}><ArrowDownwardOutlined /></Button>
                            <Typography variant='h4'>{quantity}</Typography>
                            <Button onClick={() => setQuantity(quantity + 1)}><ArrowUpwardOutlined /></Button>
                        </Box>
                        <Button sx={{ width: "100%" }} onClick={handleEditQuantity} variant='contained'>Update</Button>
                    </>
                }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CheckoutPage