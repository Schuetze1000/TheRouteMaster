import { useEffect, useState } from 'react';
import { on } from 'stream';

const Input_Settings_Password = ({
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
	Click = () => {},
}) => {
	let placeholderInput = ""
	const [valueOUT, setValueOUT] = useState(value)

	const [passwordShown, setPasswordShown] = useState(false);

	const [pswSVGx, setPswSVGx] = useState<number>(23);
	const [pswSVGy, setPswSVGy] = useState<number>(23);
	const [pswSVGr, setPswSVGr] = useState<number>(0);
	const [pswSVG, setPswSVG] = useState<string>(
		"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
	);

	function togglePasswordVisiblity() {
		//! Bug fixen: Password Toggle muss Passwort anzeigen
		setPasswordShown(passwordShown ? false : true);
		if (pswSVGx == 23) {
			setPswSVGx(1);
			setPswSVGy(1);
			setPswSVGr(3);
			setPswSVG("M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z");
		} else {
			setPswSVGx(23);
			setPswSVGy(23);
			setPswSVGr(0);
			setPswSVG(
				"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
			);
		}
	};

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
					<button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={togglePasswordVisiblity} type="button">
								<svg
									className="w-5 h-5 text-gray-500 dark:text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d={pswSVG} />
									<line x1="1" y1="1" x2={pswSVGx} y2={pswSVGy} />
									<circle cx="12" cy="12" r={pswSVGr} />
								</svg>
							</button>
	
					<input className={in_cn} disabled={isDisabled} name={name} id={id} type={type} placeholder={placeholderInput} value={valueOUT} onChange={onInputhange}/>
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
					<input className={in_cn} disabled={isDisabled} name={name} id={id} type={type} placeholder={placeholderInput} value={valueOUT}  onChange={onInputhange} />
					<label htmlFor={id} className="settings-input">
						{placeholder}
					</label>
				</div>
			</div>
		);
	}
};

export default Input_Settings_Password;
