import { useNavigate } from "react-router-dom";

export function PopupSaveFailed({ isVisable = false, onClose }) {
    
    const navigate = useNavigate();

	if (isVisable) {
		return (
			<div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
				<div className=" flex flex-col">
					<div
						className="bg-white dark:bg-slate-700 rounded-lg px-4 py-3  \
                         pb-2 md:pb-3 pt-2 md:pt-5"
					>
						<svg className="h-6 w-6 text-red-500 cursor-pointer" onClick={() => onClose()} viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  
							<circle cx="12" cy="12" r="10" />  
							<line x1="15" y1="9" x2="9" y2="15" />  
							<line x1="9" y1="9" x2="15" y2="15" />
						</svg>
						<div className="dark:text-white text-center text-lg font-bold mb-5">Speichern fehlgeschlagen! Bitte versuche es später erneut. :(</div>
						<div className="flex justify-between space-x-5 md:space-x-10">
							<button
								type="submit"
								className="standard-button-red"
								onClick={() => navigate("/")}
							>
								Zurück zur Startseite
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
}