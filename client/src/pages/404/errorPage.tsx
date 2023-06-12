import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ErrorPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <body className="h-screen">
            <div className="absolute top-0 left-2 z-50">
            </div>
            <div className="absolute -top-[4.5em] sm:-top-14 right-2 sm:right-6 z-50">
            </div>
            <div
                className="relative overflow-hidden bg-cover bg-no-repeat h-full w-full text-center bg-landing m-auto object-none object-center">
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
                    <div className="flex h-full items-center justify-center">
                        <div className="error-box">
                            <h1 className="font-bold text-8xl">Error 418</h1>
                            <h2 className="text-3xl">I’m a teapot</h2>
                            <h3 className="text-5xl mt-12 mb-12">{t("404_message")}</h3>
                            <button
								onClick={() => navigate("/")}
								type="submit"
								className="standard-button">
								{t("404_btn")}
							</button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default ErrorPage;