import { useNavigate } from "react-router-dom";

const Dashboard = ({ text = "Dashboard" }) => {
    const navigate = useNavigate();
    const handleClickAccount = () => navigate("/dashboard");

    return (
        <div className="landing-button group" onClick={handleClickAccount}>
            <svg className="h-8 w-8 text-white dark:text-black hover:text-black dark:hover:text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>


            <span className="navbar-text group-hover:scale-100 z-50">
                {text}
            </span>
        </div>
    );
};

export default Dashboard;