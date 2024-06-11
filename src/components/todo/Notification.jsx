import { VscBell } from "react-icons/vsc";

function Notification ({ action }) {
    return (
        <div className="notification todo15s fadeInUp">
            <VscBell color="white" size={25} />
            <p>{action}</p>
        </div>
    );
}

export default Notification;