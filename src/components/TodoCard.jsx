import { edit, deleteicon } from "../scripts/Image"

function TodoCard({ todo, complete, del }) {

    let completed = todo.completed ? 'complete' : null;

  return (
    <li className={completed}>
        {/* complete or incomplete toggle radio */}
        <div className="radio" onClick={() => complete(todo)}></div>

        {/* content, title and description */}
        <div className="content">
            <h3>{ todo.title }</h3>
            <p>{ todo.description }</p>
        </div>

        {/* content, while current todo is on edit mode */}
        

        {/* action to edit and delete the todo */}
        <div className="action">
            <img src={edit} /> 
            <img src={deleteicon} onClick={() => del(todo)} />
        </div>

        {/* action to save or cancel while todo is on edit mode */}
        <div className="editaction">
            <button>Cancel</button>
            <button className="addbtn">Save</button>
        </div>
    </li>
  )
}

export default TodoCard