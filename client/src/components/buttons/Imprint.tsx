import { useNavigate } from "react-router-dom";

const Imprint = ({ text = "Impressum" }) => {
    const navigate = useNavigate();
    const handleClick = () => navigate("/imprint");

    return (
        <div className="landing-button group" onClick={handleClick}>
            <svg className="h-8 w-8 text-white dark:text-black hover:text-black dark:hover:text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="5" y="3" width="14" height="18" rx="2" />  <line x1="9" y1="7" x2="15" y2="7" />  <line x1="9" y1="11" x2="15" y2="11" />  <line x1="9" y1="15" x2="13" y2="15" /></svg>

            <span className="navbar-text group-hover:scale-100">
                {text}
            </span>
        </div>
    );
};

export default Imprint;