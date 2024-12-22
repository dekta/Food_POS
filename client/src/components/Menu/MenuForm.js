import React, { useEffect, useState } from 'react';
import { createMenuItem, updateMenuItem } from '../../services/apiService';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, LinearProgress, MenuItem, Select, Switch, TextareaAutosize, TextField, Tooltip, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { handleGetUser } from "../../utils/helper"

const MenuForm = ({ currentItem, clearItem, onSuccess, onLoading, onClose }) => {
    const [formData, setFormData] = useState(currentItem || { name: '', price: '', isAvailable: true, category: 'veg', url: '', description: '' });
    console.log('currentItem:', currentItem)
    console.log('formData:', formData)
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (currentItem) {
                await updateMenuItem(currentItem._id, formData);
                setIsOpen(false);
                onSuccess();
            } else {
                await createMenuItem(formData);
                setIsOpen(false);
                onSuccess();
            }
        }
        catch (e) {
            setError('Something went wrong.');
        }
        finally {
            clearItem && clearItem();
            onLoading && onLoading();
            setLoading(false);
        }
    };



    const handleChange = (e, type) => {
        setFormData({ ...formData, [e.target.name]: type ? e.target.checked : e.target.value });
    };

    useEffect(() => {
        if (currentItem && Object.keys(currentItem)) {
            setFormData(currentItem);
            setIsOpen(true);
        };

        return () => {
            setFormData({});
            setLoading(false);
            setError("");
        }
    }, [currentItem])

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between', marginTop: "4rem" }}>
                <Typography variant='h4'>Menu Management</Typography>
                <Tooltip title="Add Menu">
                    <Box sx={{ display: "flex", alignItems: "center", zIndex: "10", cursor: "default" }}>
                        <IconButton sx={{ display: "flex", alignItems: "center", gap: "10px" }} onClick={() => setIsOpen(true)}>
                            <AddCircleOutlineOutlinedIcon fontSize='30px' />
                        </IconButton>
                        <Typography variant='h6'>Add Menu</Typography>
                    </Box>
                </Tooltip>
            </Box>
            <Dialog
                open={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    onClose && onClose();
                }}
            >
                {
                    loading && <LinearProgress />
                }

                <DialogTitle>Add Menu</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Item Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="price"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        id="category"
                        onChange={handleChange}
                        name='category'
                        sx={{ width: "100%" }}
                        placeholder="Category"
                        label="category"
                        value={formData?.category}
                    >
                        <MenuItem value="veg">Veg</MenuItem>
                        <MenuItem value="non-veg">Non Veg</MenuItem>
                    </Select>
                    <Switch
                        onChange={(e) => handleChange(e, "switch")}
                        name='isAvailable'
                        id='isAvailable'
                        defaultChecked={formData?.isAvailable}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="url"
                        name="url"
                        label="Image URL"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.url}
                        onChange={handleChange}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => handleSubmit()}>
                        {loading ? "Loading..." : currentItem ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MenuForm;
