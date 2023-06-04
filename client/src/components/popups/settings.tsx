export function PopupSave({ isVisable = false, onClose, onSave, onDiscard }) {
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
						<div className="dark:text-white text-center text-lg font-bold mb-5">Möchtest du deine Änderungen speichern?</div>
						<div className="flex justify-between space-x-5 md:space-x-10">
							<button
								type="submit"
								className="standard-button"
								onClick={() => onSave()}
							>
								Speichern
							</button>
							<button
								type="submit"
								className="standard-button-red"
								onClick={() => onDiscard()}
							>
								Nicht Speichern
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

export function PopupLoading({ isVisable = false }) {
	if (isVisable) {
		return (
			<div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
				<svg
					aria-hidden="true"
					className="w-40 h-40 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
			</div>
		);
	} else {
		return <div></div>;
	}
}

export function PopupPasswordRequired({ isVisable = false, onClose }) {
	if (isVisable) {
		return (
			<div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
				<div
					className="bg-white dark:bg-slate-700 rounded-lg px-4 py-3  \
                         pb-2 md:pb-3 pt-2 md:pt-5"
				>
					<div className="dark:text-white text-center text-lg font-bold mb-5">Password ist erfolderlich!</div>
					<div className="flex justify-center">
						<button
							type="submit"
							className="inline-flex w-full justify-center rounded-md bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-sm \
                         hover:bg-green-500 sm:ml- sm:w-auto place-self-start"
							onClick={() => onClose()}
						>
							OKAY
						</button>
					</div>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
}
