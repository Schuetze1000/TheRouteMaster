import axios from "axios";
import { useEffect, useState } from "react";

function Weather() {
	const [city, setCity] = useState(String);
	const [temperature, setTemperature] = useState(String);
	const [windspeed, setWindspeed] = useState(String);
	const [weatherimg, setWeatherimg] = useState(String);
	const [weatherstate, setWeatherstate] = useState(String);
    const [humidity, setHumidity] = useState(String);
    const [pressure, setPressure] = useState(String);
    const [apparentTemperature, setApparentTemperature] = useState(String);
	const [isLoading, setLoading] = useState(true);
    
	const weatherCodesToStr = {
		0: "Klarer Himmel",
		1: "Überwiegend klar",
		2: "Teilweise bewölkt",
		3: "Bewölkt",
		45: "Nebelig",
		48: "gefrierender Nebel",
		51: "Leichter Nieselregen",
		53: "Mäßiger Nieselregen",
		55: "Starker Nieselregen",
		56: "Leichter gefrierender Nieselregen",
		57: "Starker gefrierender Nieselregen",
		61: "Leichter Regen",
		63: "Mäßiger Regen",
		65: "Starker Regen",
		66: "Leichter gefrierender Regen",
		67: "Starker gefrierender Regen",
		71: "Leichter Schneefall",
		73: "Mäßiger Schneefall",
		75: "Starker Schneefall",
		77: "Schneefall",
		80: "Leichte Regenschauer",
		81: "Mäßige Regenschauer",
		82: "Schwere Regenschauer",
		85: "Leichte Schneeschauer",
		86: "Schwere Schneeschauer",
		95: "Gewitter",
		96: "Gewitter mit leichtem Hagel",
		99: "Gewitter mit schwerem Hagel",
	};

	const weatherCodesToIMG = {
		0: "01",
		1: "02",
		2: "03",
		3: "04",
		45: "50",
		48: "50", //? Better Design
		51: "09",
		53: "09", //? Better Design
		55: "10", //? Better Design
		56: "09", //? Better Design
		57: "10", //? Better Design
		61: "09", //? Better Design
		63: "09", //? Better Design
		65: "10", //? Better Design
		66: "09", //? Better Design
		67: "10", //? Better Design
		71: "13",
		73: "13", //? Better Design
		75: "13", //? Better Design
		77: "13", //? Better Design
		80: "09", //? Better Design
		81: "09", //? Better Design
		82: "10", //? Better Design
		85: "13", //? Better Design
		86: "13", //? Better Design
		95: "11",
		96: "11", //? Better Design
		99: "11", //? Better Design
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const optionsWeatherAPI = {
					method: "GET",
					baseURL: "https://api.open-meteo.com/v1/forecast",
					params: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						current_weather: true,
                        hourly: "relativehumidity_2m,surface_pressure,apparent_temperature",
					},
				};
				axios(optionsWeatherAPI).then((resWeatherAPI) => {
					const optionsCity = {
						method: "GET",
						baseURL: "https://api.bigdatacloud.net/data/reverse-geocode-client",
						params: {
							latitude: position.coords.latitude,
							longitude: position.coords.longitude,
							localityLanguage: "de",
						},
					};
					axios(optionsCity).then((resCity) => {
						
                        
                        const dataWeatherAPI = resWeatherAPI.data;
                        setCity(resCity.data.city);

						const weathercode = dataWeatherAPI.current_weather.weathercode;
						var pathWeatherimg = "/weather_icons/";

						if (!weatherCodesToStr[weathercode]) {
							setWeatherstate("Unknown");
							pathWeatherimg += "unkown.png";
							setWeatherimg(pathWeatherimg);

						} else {
							setWeatherstate(weatherCodesToStr[weathercode]);

							if (dataWeatherAPI.current_weather.isday == 1) {
								pathWeatherimg += weatherCodesToIMG[weathercode] + "d.png";
							} else {
								pathWeatherimg += weatherCodesToIMG[weathercode] + "n.png";
							}
							setWeatherimg(pathWeatherimg);
						}

						setTemperature(dataWeatherAPI.current_weather.temperature);

						setWindspeed(dataWeatherAPI.current_weather.windspeed);

                        const currenttime = dataWeatherAPI.current_weather.time;
                        const timeindex = dataWeatherAPI.hourly.time.indexOf(currenttime);
                        setHumidity(dataWeatherAPI.hourly.relativehumidity_2m[timeindex]);
                        setPressure(dataWeatherAPI.hourly.surface_pressure[timeindex]);
                        setApparentTemperature(dataWeatherAPI.hourly.apparent_temperature[timeindex]);

						setLoading(false);
					});
				});
			});
		}
	}, []);

	if (isLoading) {
		return (
            <WeatherLoading/>
		);
	}

	return (
		<div className="w-96 rounded-xl shadow-xl shadow-gray-50/5 bg-gray-800 bg-opacity-25 text-white mt-20 mr-auto ml-auto mb-0 pt-0 pl-5 pr-5 pb-5">
			<div className="flex justify-between items-center">
				<div>
					<p className="font-bold text-xl m-0 tracking-normal">{city}</p>
					<p className="font-normal text-sm m-0">{weatherstate}</p>
				</div>
				<img alt="weather" className="w-28" src={weatherimg} />
			</div>
			<div className="flex justify-between items-center">
				<p className="font-bold text-6xl w-auto tracking-tighter">{temperature}°C</p>
				<div className="w-full p-5">
					<div className="flex justify-between">
						<span className="text-left font-normal text-xs">Details</span>
					</div>
					<div className="flex justify-between">
						<span className="text-left font-normal text-xs">Gefühlt</span>
						<span className="text-right font-semibold text-xs">{apparentTemperature}°C</span>
					</div>
					<div className="flex justify-between">
						<span className="text-left font-normal text-xs">Wind</span>
						<span className="text-right font-semibold text-xs">{windspeed} km/h</span>
					</div>
					<div className="flex justify-between">
						<span className="text-left font-normal text-xs">Luftfeuchtigkeit</span>
						<span className="text-right font-semibold text-xs">{humidity}%</span>
					</div>
					<div className="flex justify-between">
						<span className="text-left font-normal text-xs">Druck</span>
						<span className="text-right font-semibold text-xs">{pressure} hPa</span>
					</div>
				</div>
			</div>
		</div>
	);
}

const WeatherLoading = () => {
    return (
		<div className="w-96 rounded-xl shadow-xl shadow-gray-50/5 bg-gray-800 bg-opacity-25 text-white mt-20 mr-auto ml-auto mb-0 pt-0 pl-5 pr-5 pb-5">
			<div className="flex justify-between items-center">
				<div>
					<p className="font-bold text-xl m-0 tracking-normal">Unknown</p>
					<p className="font-normal text-sm m-0">Unknown</p>
				</div>
				<img alt="weather" className="w-28" src="/weather_icons/unknown.png" />
			</div>
			<div className="flex justify-between items-center">
				<p className="font-bold text-6xl w-auto tracking-tighter">n/a°C</p>
				<div className="w-full p-5">
					<div className="flex justify-between">
						<span className="text-left font-normal text-xs">Details</span>
					</div>
					<div className="flex justify-between">
						<span className="text-left font-normal text-xs">Gefühlt</span>
						<span className="text-right font-semibold text-xs">n/a°C</span>
					</div>
					<div className="flex justify-between">
						<span className="text-left font-normal text-xs">Wind</span>
						<span className="text-right font-semibold text-xs">n/a km/h</span>
					</div>
					<div className="flex justify-between">
						<span className="text-left font-normal text-xs">Luftfeuchtigkeit</span>
						<span className="text-right font-semibold text-xs">n/a%</span>
					</div>
					<div className="flex justify-between">
						<span className="text-left font-normal text-xs">Druck</span>
						<span className="text-right font-semibold text-xs">n/a hPa</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Weather;
