import Logo from "./../images/logo.png";
import Loader from "./../images/btn-loader.gif";

function LoginPage() {
    return (
        <div className="todo-login">
            <div className="login-box">
                <div className="lb-logo">
                    <img src={Logo} />
                    <h2>Todo App</h2>
                    <p>Simple task management</p>
                </div>
                
                <div className="input-form">
                    <form name="jwelform">
                        <div className="pf--input">
                            <p>Username</p>
                            <input type="text" placeholder="Email or Username" />
                        </div>

                        <div className="pf--input">
                            <p>Password</p>
                            <input type="password" placeholder="********" />
                        </div>

                        <div className="pf--input">
                            <span className="primary-btn-loader pbl-tr">
                                <p>Login</p>
                                {/* <img className="loader" src={Loader} /> */}
                            </span>
                        </div>
                    </form>
                </div>

                <div className="oth-action">
                    <span className="link">Forgot Password?</span>
                    {/* <span className="__info">error text goes here</span> */}
                </div>
            </div>
        </div>
    );
}

export default LoginPage;