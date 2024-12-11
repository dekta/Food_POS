import React, { useState } from 'react';
import { createMenuItem, updateMenuItem } from '../../services/apiService';

const MenuForm = ({ currentItem, clearItem }) => {
    const [formData, setFormData] = useState(currentItem || { name: '', price: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentItem) {
            await updateMenuItem(currentItem._id, formData);
        } else {
            await createMenuItem(formData);
        }
        clearItem();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Item Name"
                required
            />
            <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
            />
            <button type="submit">{currentItem ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default MenuForm;
