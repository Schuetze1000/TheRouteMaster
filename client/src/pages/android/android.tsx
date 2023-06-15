import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Android() {
    window.location.href = 'https://1drv.ms/u/s!Amnv0Hz9VS6TmIdroHmQyoEUizugLw?e=fU6FOL';
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
                            <h1 className="font-bold text-3xl">Du wirst zum Android download weitergeleitet...</h1>
                            <br/>
                            <h1 className="font-bold text-2xl">Falls du nicht weitergeleitet wirst klicke hier:</h1>
                            <br/>
                            <a href="https://1drv.ms/u/s!Amnv0Hz9VS6TmIdroHmQyoEUizugLw?e=fU6FOL" className="hover:underline text-2xl hover:text-blue-700 active:text-blue-500">Zum Download</a>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Android;