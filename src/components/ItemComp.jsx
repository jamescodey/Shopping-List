import React, { useState } from 'react'

const ItemComp = ({ item, handleEditItem, handleDeleteItem }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newItem, setNewItem] = useState(item.name);
    const [errors, setErrors] = useState("");

    const onEdit = () => {
        if (newItem) {
            handleEditItem(item.id, newItem);
            setIsEditing(false);
            setNewItem(newItem);
            setErrors("")
        } else {
            setErrors("Grocery item cannot be empty");
        }

    };

    return (
        <>
            <li>
                {isEditing ? (<input type='text' value={newItem} onChange={(event) => setNewItem(event.target.value)} />) : (<span>{item.name}</span>)}
                <div>
                    <button onClick={() => { isEditing ? onEdit() : setIsEditing(true) }} className='btn-edit'>{isEditing ? "Save" : "Edit"}</button>
                    <button onClick={() => handleDeleteItem(item.id)} className='btn-delete'>x</button>
                </div>
            </li>
            {errors ? <p className='errors'>{error}</p> : null}
        </>
    )
}

export default ItemComp