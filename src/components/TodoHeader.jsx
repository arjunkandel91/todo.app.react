import { useState } from "react";

// react outside click handler from https://github.com/airbnb/react-outside-click-handler
import OutsideClickHandler from 'react-outside-click-handler';

// app images
import { search, filter, check, mode, add, close } from "../scripts/Image";
import { Filters } from "../scripts/Todo";

function TodoHeader({ count, addTask, searchTask, todoFilter}) {

    // component variables and form input
    let [CompData, setCompData] = useState({
        showSearch: false,
        showInput: false,
        formError: false,
        title: '',
        description: ''
    });

    // show or hide filter menu
    let [ShowFilterMenu, setShowFilterMenu] = useState(false);
    let [FilterMenuContent, setFilterMenuContent] = useState(Filters);

    // Function triggered when an option in the filter menu is clicked  
    // Activates the selected option and calls the function to filter the to-do list based on the chosen menu item  
    const Filter = (type) => {
        if (type !== 'none') {
            setFilterMenuContent(FilterMenuContent.map(f => {
                if (f.type == type) f.active = true;
                else f.active = false;
                return f;
            }));

            todoFilter(type);
            setShowFilterMenu(false);
        }
    }

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

    // light and dark theme toggle button click handler
    const ToggleDarkMode = () => {
        let hasDarkMode = document.body.classList.contains('dark-mode');
        if (hasDarkMode) document.body.classList.remove('dark-mode');
        else document.body.classList.add('dark-mode');
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
                    <img src={filter} onClick={() => setShowFilterMenu(true)}/>
                    {ShowFilterMenu && 
                    <OutsideClickHandler onOutsideClick={() => setShowFilterMenu(false)}>
                        <div className="filter-todo">
                            <ul>
                                {FilterMenuContent.map(menu => {
                                    return(<li key={menu.id} className={menu.active ? 'active' : ''} onClick={() => Filter(menu.type)}>
                                                <span><img src={check} /></span>
                                                <p>{menu.name}</p>
                                            </li>);
                                })}                            
                            </ul>
                        </div>
                    </OutsideClickHandler>
                    }

                    {/* dark and light theme toggle action */}
                    <img src={mode} onClick={ToggleDarkMode} />
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