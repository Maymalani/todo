import React, { useState, useEffect } from 'react';
import TodoImg from "./todoImg.jpg";

const getLocalItems = () => {
    let list = localStorage.getItem('lists');

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
};

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toogleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert("Please enter Details");
        }
        else if (inputData && !toogleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            );

            setToggleSubmit(true);

            setInputData('');

            setIsEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData('');
        }
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updatedItems);
    }

    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        });

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);
    }

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={TodoImg} alt="..." />
                        <figcaption>Add Your Todos Here ✌</figcaption>
                    </figure>
                    <div className="additems">
                        <input type="text" className='form-control' placeholder='Add ToDos...'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        {
                            toogleSubmit ?
                                <i className='fa fa-plus add-btn' title='Add Item' onClick={addItem}></i> :
                                <i className='far fa-edit add-btn' title='Edit Item' onClick={addItem}></i>
                        }
                    </div>

                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i className='far fa-edit edit-btn' title='Edit Item' onClick={() => editItem(elem.id)}></i>
                                            <i className='far fa-trash-alt delete-btn' title='Delete Item' onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text='Remove All' onClick={removeAll}>
                            <span>Check List</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;