import { clearAuthTokens } from "axios-jwt";
import { isLoggedIn } from "axios-jwt";

const Logout = ({ text = "Abmelden" }) => {

    function handleClickLogout () {
        clearAuthTokens();
        window.location.href = "/";
	}

    return (
        <div className="landing-button group" onClick={handleClickLogout} style={{visibility: isLoggedIn() ? "visible" : "hidden"}}>
            <svg className="h-8 w-8 text-white dark:text-black hover:text-black dark:hover:text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>


            <span className="navbar-text group-hover:scale-100 z-50">
                {text}
            </span>
        </div>
    );
};

export default Logout;