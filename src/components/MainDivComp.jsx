import React, { useRef, useState } from 'react'
import { v4 as uuid } from "uuid";
import ItemComp from './ItemComp';

const MainDivComp = () => {
    const inputRef = useRef();
    const [item, setItem] = useState("");
    const [groceryItems, setGroceryItems] = useState([]);
    const [errors, setErrors] = useState("");

    const handleAddItem = () => {
        if (item) {
            setGroceryItems([...groceryItems, { id: uuid(), name: item }]);
            setItem("");
            setErrors("")
        } else {
            setErrors("Enter an item!");
            inputRef.current.focus();
        }
    }
    const handleEditItem = (id, newItem) => {
        const updatedGroceryItems = groceryItems.map((item) => {
            if (item.id === id) {
                return { ...item, name: newItem };
            }

            return item;
        })
        setGroceryItems(updatedGroceryItems);
    }

    const handleDeleteItem = (removeId) => {
        const filteredItems = groceryItems.filter((item) => item.id !== removeId);
        setGroceryItems(filteredItems);
    }

    const handleClearItems = () => {
        setGroceryItems([])
    }

    return (
        <div className='grocery-buddy'>
            <h1>What to buy?</h1>
            <div className='input-section'>
                <div className='input-container'>
                    <input ref={inputRef} type="text" placeholder='Add Item' value={item} onChange={(event) => setItem(event.target.value)} />
                    <button onClick={handleAddItem} className='btn-add'>+</button>
                </div>
                <div>{errors ? <p className='errors'>{errors}</p> : null} </div>
            </div>
            <ul className="grocery-list">
                {groceryItems.map((item) => (<ItemComp key={item.id} item={item} handleEditItem={handleEditItem} handleDeleteItem={handleDeleteItem} />))}
            </ul>
            {groceryItems.length > 0 ? <button onClick={handleClearItems} className='btn-clear'>Clear Items</button> : null}
        </div>
    )
}

export default MainDivComp