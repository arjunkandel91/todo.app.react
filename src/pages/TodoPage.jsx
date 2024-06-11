import { useContext, useState } from "react";
import { AppContext } from "../store/Context";
import { createPortal } from "react-dom";

// components
import Header from './../components/header/Header';
import TodoCard from "../components/todo/TodoCard";
import DeleteTodo from "../components/modal/DeleteTodo";
import EmptyTodo from "../components/todo/EmptyTodo";
import Notification from "../components/todo/Notification.jsx";

import Sidebar from "../components/sidebar/Navigation.jsx";

// script
import TodoHandler from "../javascript/TodoHandler.js";

function TodoPage () {

    const { TodoList, setTodoList,
        showNotification, setShowNotification
     } = useContext(AppContext);
    
    const [deleteModal, setDeleteModal] = useState({
            show: false,
            todo: {}
    });

    // delete box show & hide
    const DeleteBoxHandler = (todo, visible) => {
        if (visible) {
            deleteModal.show = true;
            deleteModal.todo = todo;
            setDeleteModal({...deleteModal});
        }else {
            deleteModal.show = false;
            setDeleteModal({...deleteModal});
        }
    }

    const DeleteTodoItem = () => {
        const deleteItemId = deleteModal.todo.id;
        setTodoList(TodoList.filter(todo => todo.id !== deleteItemId));

        // remove delete box
        DeleteBoxHandler (null, false);

        // notification
        TodoHandler.Notification('Task Deleted', 2, setShowNotification);
    }

    // complete task item
    const CompleteHandler = (todo) => {
        TodoHandler.CompleteTaskItem(todo, TodoList, setTodoList, setShowNotification);
    }

    // edit or update task
    const EditTaskMode = (todo) => {
        setTodoList(TodoList.map(item => {
            if (item.id === todo.id) item.editMode = true;
            else item.editMode = false;
            return item;
        }));
    }

    // edit mode cancel
    const EditTaskCancel = () => {
        setTodoList(TodoList.map(item => {
            item.editMode = false;
            return item;
        }));
    }

    // edit task
    const EditTaskSave = (todo, title, description) => {
        // setTodoList(TodoList.map(item => {
        //     if (item.id === todo.id) {
        //         return {...item, title: title, description: description, editMode: false};
        //     }else return item;
        // }));

        // one liner
        setTodoList(TodoList.map(item => item.id === todo.id ? {...item, title: title, description: description, editMode: false} : item));
    }


    return (
        <div className="todo-app">

            <Sidebar />

            <div className="todo-body">

                <div className="todo-lists">
                    <Header />

                    <ul className="todo-list todo20s fadeInUp">
                        {
                            TodoList.map(todo => {
                                return (<TodoCard key={todo.id} 
                                                    item={todo} 
                                                    Delete={() => DeleteBoxHandler(todo, true)}
                                                    Complete={() => CompleteHandler (todo)}
                                                    Edit={() => EditTaskMode(todo)}
                                                    EditCancel={EditTaskCancel}
                                                    EditSave={(title, description) => EditTaskSave (todo, title, description)} />)
                            })
                        }
                    </ul>

                    {/* Empty Todo UI */}
                    {TodoList.length == 0 && <EmptyTodo />}

                    {/* Delete Modal */}
                    { deleteModal.show && createPortal (
                                <DeleteTodo item={deleteModal.todo} close={() =>  DeleteBoxHandler(null, false)} Delete={DeleteTodoItem} />, 
                                document.body) }

                    {/* Notification */}
                    {showNotification && createPortal(
                            <Notification action={showNotification} />,
                            document.body
                    )}
                </div>

            </div>

        </div>
    );
}

export default TodoPage;