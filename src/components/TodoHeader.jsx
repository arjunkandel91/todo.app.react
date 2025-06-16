import { useState } from "react";

import { search, filter, mode, add, close } from "../scripts/Image";

function TodoHeader({ count }) {

    // component variables and form input
    let [ShowSearch, setShowSearch] = useState(false);
    let [ShowInput, setShowInput] = useState(false);

    return (
        <header>
            <div className="app-search">
                <h1>Todo List ({ count })</h1>
                <div className="actions">
                    {/* search action */}
                    {!ShowSearch && <img src={search} onClick={() => setShowSearch(true)} />}
                    
                    {ShowSearch && <div className="search-box">
                        <input type="text" placeholder="Search" />
                        <img src={close} onClick={() => setShowSearch(false)} />
                    </div>}

                    {/* filter action */}
                    <img src={filter} />

                    {/* dark and light theme toggle action */}
                    <img src={mode} />
                </div>
            </div>

            {/* add task button */}
            {!ShowInput && <div className="add-task" onClick={() => setShowInput(true)}>
                <img src={add} />
                <p>Add Task</p>
            </div>}

            {/* input box to add new todo */}
            {ShowInput && <div className="input-box">
                <div className="input">
                    <input type="text" placeholder="Title" />
                    <p className="__error_txt">Todo title is required!</p>
                    <input type="text" placeholder="Description" />
                </div>
                <div className="button">
                    <button onClick={() => setShowInput(false)}>Cancel</button>
                    <button className="addbtn">Add task</button>
                </div>
            </div>}
        </header>
    )
}

export default TodoHeader