import { VscAdd } from "react-icons/vsc";

function AddTask ({ showInput }) {
    return (
        <div className="add-task todo20s fadeInDown" onClick={showInput}>
            <VscAdd />
            <p>Add Task</p>
        </div>
    );
}

export default AddTask;