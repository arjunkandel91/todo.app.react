import { VscClose } from "react-icons/vsc";

function DeleteTodo ({ item, close, Delete }) {
    return (
        <>
            <div className="delete-box todo15s fadeInUp">
                <div className="close" onClick={close}>
                    <VscClose />
                </div>
                <div className="content">
                    <h4>Do you want to delete task "{item.title}"?</h4>
                </div>
                <div className="action">
                    <button onClick={close}>Cancel</button>
                    <button className="addbtn" onClick={Delete}>Delete</button>
                </div>
            </div>
            <div className="overlay"></div>
        </>
    );
}

export default DeleteTodo;