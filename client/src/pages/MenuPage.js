import React, { useState } from 'react';
import MenuForm from "../components/Menu/MenuForm"
import MenuList from "../components/Menu/MenuList"

const MenuPage = () => {
    const [currentItem, setCurrentItem] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const handleEdit = (item) => {
        setCurrentItem(item);
    };

    const clearItem = () => {
        setCurrentItem(null);
    };

    const onSuccess = () => {
        setRefetch(!refetch);
    }

    return (
        <div>
            <MenuForm currentItem={currentItem} onSuccess={onSuccess} clearItem={clearItem} />
            <MenuList onEdit={handleEdit} refetch={refetch} />
        </div>
    );
};

export default MenuPage;
