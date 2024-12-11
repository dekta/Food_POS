import React, { useState } from 'react';
import MenuForm from "../components/Menu/MenuForm"
import MenuList from "../components/Menu/MenuList"

const MenuPage = () => {
    const [currentItem, setCurrentItem] = useState(null);

    const handleEdit = (item) => {
        setCurrentItem(item);
    };

    const clearItem = () => {
        setCurrentItem(null);
    };

    return (
        <div>
            <h1>Menu Management</h1>
            <MenuForm currentItem={currentItem} clearItem={clearItem} />
            <MenuList onEdit={handleEdit} />
        </div>
    );
};

export default MenuPage;
