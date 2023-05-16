import { useNavigate } from "react-router-dom";

const Back_landing = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate("/");

    return (
        <div className="">
            <p className="">&lt; Zurück</p>
        </div>
    );
}

export default Back_landing;