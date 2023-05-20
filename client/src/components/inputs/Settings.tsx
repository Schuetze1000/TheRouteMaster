const Input_Settings = ({name="", id="", type="", placeholder = "", in_cn="peer input mt-2 mb-2 md:mb-5 md:mt-5 dark:border-gray-500", div_cn="relative"}) => {
	return (
		<div>
			<div className={div_cn}>
				<input className={in_cn} name={name} id={id} type={type} placeholder="Username" />
				<label htmlFor={id} className="settings-input">
                    {placeholder}
				</label>
			</div>
		</div>
	);
};

export default Input_Settings;
