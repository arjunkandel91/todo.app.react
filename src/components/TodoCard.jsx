import { useState } from "react";

import { edit, deleteIcon } from "../scripts/Image"

function TodoCard({ todo, complete, del, editInit, editCancel, editTask }) {

    // components state variables & input
    let [CompData, setCompData] = useState({
            formError: false,
            title: todo.title,
            description: todo.description
    });

    const Submit = () => {
        // validation
        if (CompData.title.length <= 4) {
            setCompData({...CompData, formError: true});
            return;
        }

        // emit to edit the current task
        editTask(todo.id, CompData.title, CompData.description);
    }


    let completed = todo.completed ? 'complete' : '';
    let hidden = todo.hide ? 'hide' : ''; // search function
    let editMode = todo.edit ? 'edit' : '';

  return (
    <li className={`${completed} ${hidden} ${editMode}`}>
        {/* complete or incomplete toggle radio */}
        <div className="radio" onClick={() => complete(todo)}></div>

        {/* content, title and description */}
        {!todo.edit && <div className="content">
            <h3>{ todo.title }</h3>
            <p>{ todo.description }</p>
        </div>}

        {/* content, while current todo is on edit mode */}
        {todo.edit && <div className="content">
            <input type="text" placeholder="Title" 
                                className={CompData.formError ? '__error' : ''} 
                                value={CompData.title} 
                                onChange={(e) => setCompData({...CompData, title: e.target.value})} />
            {CompData.formError && <p className="__error_txt">Todo title is required!</p>}
            <input type="text" placeholder="Description" 
                                value={CompData.description} 
                                onChange={(e) => setCompData({...CompData, description: e.target.value})} />
        </div> }

        {/* action to edit and delete the todo */}
        <div className="action">
            <img src={edit} onClick={() => editInit(todo)} /> 
            <img src={deleteIcon} onClick={() => del(todo)} />
        </div>

        {/* action to save or cancel while todo is on edit mode */}
        <div className="editaction">
            <button onClick={editCancel}>Cancel</button>
            <button className="addbtn" onClick={Submit}>Save</button>
        </div>
    </li>
  )
}

export default TodoCard