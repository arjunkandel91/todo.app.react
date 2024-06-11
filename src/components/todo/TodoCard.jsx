import { useState } from "react";
import { VscEdit, VscTrash, VscCheck } from "react-icons/vsc";


function TodoCard ({ item, Delete, Complete, Edit, EditCancel, EditSave }) {

    // input fields
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);

    const EditTaskHandler = () => {
        EditSave(title, description);
    }

    // auto height adjustment
    const textAreaAdjust = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }

    return (
        <li className={item.completed ? 'complete' : item.editMode ? 'edit' : ''}>
            <div className="radio" onClick={Complete}>
                {item.completed && <VscCheck color="white" size={20} />}
            </div>
            {
                item?.editMode ? 
                
                <div className="content">
                    <input type="text" className="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} onKeyUp={textAreaAdjust}></textarea>
                </div>
                
                :

                <div className="content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            }

            <div className="action">
                <VscEdit onClick={Edit} size={20} />
                <VscTrash onClick={Delete} size={20} />
            </div>

            <div className="editaction">
                <button onClick={EditCancel}>Cancel</button>
                <button className="addbtn" onClick={EditTaskHandler}>Save</button>
            </div>
        </li>
    );
}

export default TodoCard;