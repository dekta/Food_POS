import React, { useEffect, useState } from 'react';
import { fetchMenuItems, deleteMenuItem } from '../../services/apiService';

const MenuList = ({ onEdit }) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchMenuItems();
            setMenuItems(data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deleteMenuItem(id);
        setMenuItems(menuItems.filter((item) => item._id !== id));
    };

    return (
        <div>
            <h2>Menu Items</h2>
            <ul>
                {menuItems.map((item) => (
                    <li key={item._id}>
                        {item.name} - ${item.price}
                        <button onClick={() => onEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuList;
