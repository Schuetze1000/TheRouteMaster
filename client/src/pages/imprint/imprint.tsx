import Navbar_imprint from "../../components/navbars/Navbar_imprint";

function Imprint() {
	return (
		<body className="h-screen">
			<Navbar_imprint />
			<div className="relative overflow-auto bg-cover bg-no-repeat h-full w-full text-center bg-landing m-auto object-none object-center">
				<div
					className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-auto bg-fixed"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
				>
					<div className="relative top-[2%]">
						<h1 className="text-white font-bold text-7xl tracking-wider">Impressum</h1>
					</div>
					<div className="flex w-full h-auto items-center justify-center">
						<div className="background-box">
							<div className="relative mb-2 md:mb-10">
                                <h1 className="font-bold text-3xl">Wer wir sind</h1>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            </div>
                            <div className="relative mb-2 md:mb-10">
                                <h1 className="font-bold text-3xl">Wichtige Informationen</h1>
                                <p>Hier sollten wir zum Beispiel die Quellen zu den Bildern und den Icons angeben.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</body>
	);
}

export default Imprint;
