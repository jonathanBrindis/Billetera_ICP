








function Header(props) {




    return (
        <div className="header">
            <div className="header-logo">
                <img src="Logo Z3 Horizontal.png" />
            </div>
            <button className="login-button" onClick={props.log? props.logout : props.login}> {props.log? "Logout" : "Login" } </button>
        </div>
    )
}

export default Header