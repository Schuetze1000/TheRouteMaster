import axios from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function Calendar() {
	const [icsHash, setICSHash] = useLocalStorage("icsHash", "none");
	const [icsData, setICSData] = useLocalStorage("icsData", "none");
	const [icsName, setICSName] = useLocalStorage("icsName", "none");
	const [isLoading, setLoading] = useState(true);

	function updateCalendar() {}

	useEffect(() => {
		const optionsGetHash = {
			method: "GET",
			URL: "/ics/gethash",
		};

		/* axios(optionsGetHash).then((hashResponse) => {
            const responseHash = hashResponse.data.hash;
            if (icsHash != responseHash || icsData === "none") {
                const optionsGetICS = {
                    method: "GET",
                    URL: "/ics/getics",
                };
                axios(optionsGetICS).then((icsResponse) => {
                    setICSData(icsResponse.data.data);
                    setICSHash(icsResponse.data.hash);
                    setICSName(icsResponse.data.name);
                    updateCalendar();
                });
            }
            else {
                updateCalendar();
            }   
        }); */

		setLoading(false);
	}, []);

	if (isLoading) {
		return <CalendarLoading />;
	}

	return (
		<div className="w-96 rounded-xl shadow-xl shadow-gray-50/5 bg-gray-800 bg-opacity-25 text-white mt-20 mr-auto ml-auto mb-0 pt-0 pl-5 pr-5 pb-5">
			<div className="flex justify-between items-center">
				<span className="text-left font-normal text-xs">Kurs</span>
				<span className="text-right font-semibold text-xs">{icsName}</span>
			</div>
		</div>
	);
}

const CalendarLoading = () => {
	return <div />;
};

export default Calendar;
