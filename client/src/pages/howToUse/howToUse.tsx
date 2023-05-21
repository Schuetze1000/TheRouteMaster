import Navbar_use from "../../components/navbars/Navbar_use";

function HowToUse() {
	return (
		<body className="h-screen">
			<Navbar_use />
			<div className="relative overflow-auto bg-cover bg-no-repeat h-full w-full text-center bg-landing m-auto object-none object-center">
				<div
					className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-auto bg-fixed"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
					<div className="relative top-[2%]">
						<h1 className="text-white font-bold text-7xl tracking-wider">How To Use</h1>
					</div>
					<div className="flex w-full h-auto items-center justify-center">
						<div className="settings-box">
							<div className="relative mb-2 md:mb-10">
                                <h1 className="font-bold text-3xl">Welche Funktionen es gibt</h1>
                                <p>Hier sollten wir mit kleinen Bildern zeigen welche Funktionen es gibt (Mit Namen).</p>
                            </div>
                            <div className="relative mb-2 md:mb-10">
                                <h1 className="font-bold text-3xl">Wie man die Funktionen nutzt</h1>
                                <p>Hier sollten wir auch wieder mit Bildern zeigen wie man die Funktionen benutzt (eventuell mit "Diashow") und kurz erläutern wieso diese Funktionen dem Nutzer helfen seinen tag effizienter zu gestalten.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</body>
	);
}

export default HowToUse;
