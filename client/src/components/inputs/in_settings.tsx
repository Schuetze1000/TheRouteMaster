import { useEffect, useState } from 'react';

const Input_Settings = ({
	name = "",
	id = "",
	type = "",
	placeholder = "",
	in_cn = "peer input mt-2 mb-2 md:mt-2 dark:border-gray-500 pr-12 disabled:bg-slate-50 dark:disabled:bg-gray-600 \
				disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:text-slate-700",
	div_cn = "relative",
	value = "",
	hasEditButton=true,
	isDisabled=true,
	isVisable=true,
	Click = () => {}
}) => {
	let placeholderInput = ""
	const [valueOUT, setValueOUT] = useState(value)

	useEffect(() => {

	}, [])


	if (!value){
		placeholderInput = "0"
	}

	const onInputhange = (event) => {
		setValueOUT(event.target.value)
	}
	if (!isVisable) {
		return <div></div>
	}
	if (hasEditButton){
		return (
			<div>
				<div className={div_cn}>
					<button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={Click}>
						<svg
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
							/>
						</svg>
					</button>
	
					<input className={in_cn} disabled={isDisabled} name={name} id={id} type={type} placeholder={placeholderInput} value={valueOUT} onChange={onInputhange} />
					<label htmlFor={id} className="settings-input">
						{placeholder}
					</label>
				</div>
			</div>
		);
	}
	else {
		return (
			<div>
				<div className={div_cn}>
					<input className={in_cn} disabled={isDisabled} name={name} id={id} type={type} placeholder={placeholderInput} value={value} />
					<label htmlFor={id} className="settings-input">
						{placeholder}
					</label>
				</div>
			</div>
		);
	}

	
};

export default Input_Settings;
