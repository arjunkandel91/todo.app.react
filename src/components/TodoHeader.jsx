import { useState } from "react";

import { search, filter, mode, add, close } from "../scripts/Image";

function TodoHeader({ count, addTask, searchTask }) {

    // component variables and form input
    let [CompData, setCompData] = useState({
        showSearch: false,
        showInput: false,
        formError: false,
        title: '',
        description: ''
    });

    // clear form data and hide input boxes etc.
    const ClearForm = () => {
        setCompData({...CompData, title: '', description: '', formError: false, showInput: false});
    }

    const Submit = () => {
        // validation
        if (CompData.title.length <= 4) {
            setCompData({...CompData, formError: true});
            return;
        }

        // if success move ahead to add task
        // send collected info to parent component
        addTask({title: CompData.title, description: CompData.description});

        // finally hide the input box 
        // & clear data from input field
        ClearForm();
    }

    // This function hides the search input field  
    // It also ensures all tasks are displayed when the user closes the input field with a keyword  
    // By resetting the keyword to blank, the full list becomes visible again  
    const CloseSearchInput = () => {
        setCompData({...CompData, showSearch: false})
        searchTask('');
    }


    return (
        <header>
            <div className="app-search">
                <h1>Todo List ({ count })</h1>
                <div className="actions">
                    {/* search action */}
                    {!CompData.showSearch && <img src={search} onClick={() => setCompData({...CompData, showSearch: true})} />}
                    
                    {CompData.showSearch && <div className="search-box">
                        <input type="text" placeholder="Search" onChange={(e) => searchTask(e.target.value)} />
                        <img src={close} onClick={() => CloseSearchInput()} />
                    </div>}

                    {/* filter action */}
                    <img src={filter} />

                    {/* dark and light theme toggle action */}
                    <img src={mode} />
                </div>
            </div>

            {/* add task button */}
            {!CompData.showInput && <div className="add-task" onClick={() => setCompData({...CompData, showInput: true})}>
                <img src={add} />
                <p>Add Task</p>
            </div>}

            {/* input box to add new todo */}
            {CompData.showInput && <div className="input-box">
                <div className="input">
                    <input type="text" className={CompData.formError ? '__error' : ''} 
                                        placeholder="Title" 
                                        onChange={(e) => setCompData({...CompData, title: e.target.value})} />
                    {CompData.formError && <p className="__error_txt">Todo title is required!</p>}
                    <input type="text" placeholder="Description" 
                                        onChange={(e) => setCompData({...CompData, description: e.target.value})} />
                </div>
                <div className="button">
                    <button onClick={() => setCompData({...CompData, showInput: false})}>Cancel</button>
                    <button className="addbtn" onClick={Submit}>Add task</button>
                </div>
            </div>}
        </header>
    )
}

export default TodoHeader