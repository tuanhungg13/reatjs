import React, { useState } from "react";
import './todoList.css';

const TodoList = () => {
    const [listToDo, setListTodo] = useState(['Learning English', 'Watching TV']);
    const [title, setTitle] = useState('');

    const handleOnChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const addNewToDo = () => {
        if (title.trim()) {
            setListTodo([...listToDo, title]);
            setTitle(''); // Clear the input field after adding the new todo
        }
    };

    return (
        <div className="list-todo-container">
            <div className="add-todo">
                <input
                    type="text"
                    value={title}
                    onChange={handleOnChangeTitle}
                />
                <button type="button" onClick={addNewToDo}>Add</button>
            </div>
            <div className="list-todo-content">
                {listToDo && listToDo.length > 0 &&
                    listToDo.map((item, index) => (
                        <div className="todo-child" key={index}>
                            <span>{index + 1} - {item}</span>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default TodoList;
