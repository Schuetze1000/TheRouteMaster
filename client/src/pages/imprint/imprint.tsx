import Navbar_imprint from "../../components/navbars/Navbar_imprint";

function Imprint() {
	const { version } = require("../../../package.json");

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
                                <p>Wir sind eine Gruppe von drei ambitionierten Cyber Security-Studenten an der DHBW Mannheim, die sich leidenschaftlich für die Vereinfachung des Alltagslebens durch den Einsatz von Technologie einsetzen. Unsere Mission mit The Route Master ist es, Kommilitonen einen reibungslosen und effizienten Weg zu ihren Vorlesungen zu bieten.
									The Route Master ist im Rahmen unseres Moduls Web-/App-Engineering entstanden und verbindet unsere Fähigkeiten in den Bereichen Informatik, Cyber-Sicherheit und Webentwicklung, um einen einzigartigen und nützlichen Dienst für unsere Universitätsgemeinschaft zu schaffen. Unser Ziel ist es, das Pendeln für Studenten stressfreier und planbarer zu gestalten, indem wir ihnen basierend auf ihren Vorlesungsplänen optimale Bahnverbindungen vorschlagen.
									Unser Team besteht aus Personen, die sich für Technologie, Innovation und Gemeinschaft einsetzen. Wir glauben, dass Technologie eine entscheidende Rolle dabei spielt, das Leben einfacher zu gestalten, und wir sind stolz darauf, unseren Beitrag dazu zu leisten.
									Unsere Website steht nicht nur für den Fortschritt in der Technologie und die Leidenschaft, die wir für unser Studienfach haben, sondern auch für unser Engagement für unsere Mitstudenten und unsere Universität. Wir hoffen, dass Sie The Route Master ebenso nützlich und aufregend finden, wie wir es tun.
									Vielen Dank, dass Sie uns dabei unterstützen, die Reise zur Universität einfacher und effizienter zu gestalten.</p>
								<br />
								<p>Herzlichst,
									Euer Route Master Team</p>
                            </div>
							<div className="relative mb-2 md:mb-10">
								<h1 className="font-bold text-3xl">Informationen</h1>
								<p>Informationen gemäß § 5 TMG:
									<br/>
									Andreas Schütz
									<br/>
									Wheinheimer Straße 22
									<br/>
									68309, Mannheim
									<br/>

									Kontakt:
									<br/>
									E-Mail: service@schuetz-andreas.dev
									<br/>
									<br/>
									Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
									<br/>
									Andreas Schütz
									<br/>
									Wheinheimer Straße 22
									<br/>
									68309, Mannheim
									<br/>
									<br/>

									Datenschutzerklärung
									<br/>
									Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.

									Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.

									Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>
							</div>
                            <div className="relative mb-2 md:mb-10">
                                <h1 className="font-bold text-3xl">Wichtige Informationen</h1>
								<h2 className="font-bold text-xl">Quellen</h2>
                                <a href="https://www.londonbusmuseum.com/museum-exhibits/double-deck-buses/aec-routemaster-rm140/" className="underline">The Route Master Hintergrund</a>
								<br />
								<a href="https://www.tailwindtoolbox.com/icons" className="underline">Icons</a>
								<br />
								<a href="https://www.flaticon.com/free-icon/reset-password_6195699" className="underline">Reset Password Icon</a>
								<br />
								<a href="https://icons-for-free.com/issue+icon-1320185886729792536/" className="underline">Issue Icon</a>
								<br />
								<a href="https://my.stripo.email/cabinet/#/login?locale=en&fpr=" className="underline">Password Forogot Mail erstellen</a>
								<br />
								<a href="https://www.clipartmax.com/middle/m2i8H7b1G6A0Z5b1_walking-icon/" className="underline">Walking Icon</a>
								<br />
								<a href="https://www.flaticon.com/free-icon/walk_5604658" className="underline">Walking Line Icon</a>
								<br />
								<a href="https://www.flaticon.com/free-icon/train_1042307" className="underline">Train Icon</a>
								<br />
								<a href="https://www.flaticon.com/free-icon/tram_2385513" className="underline">Tram Icon</a>
								<br />
								<a href="https://www.flaticon.com/free-icon/bus_1023413" className="underline">Bus Icon</a>
								<br />
								<a href="https://beefree.io" className="underline">Info Mail erstellen</a>
							</div>
							<div className="absolute bottom-0 right-0 mb-5 mx-5">
								<p>Version: {version}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</body>
	);
}

export default Imprint;
