import EmptyImage from './../../images/empty-task.svg';

function EmptyTodo () {
    return (
        <div className="empty-task todo20s fadeInUp">
            <img src={EmptyImage} />
            <p>You don't have task to do, you can add tasks here.</p>
        </div>
    );
}

export default EmptyTodo;