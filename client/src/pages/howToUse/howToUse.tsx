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
						<div className="background-box">
							<div className="relative mb-2 md:mb-10">
                                <h1 className="font-bold text-3xl">Wie funktioniert die Webseite?</h1>
								<br/>
                                <p>Liebe Nutzerin, lieber Nutzer,
								<br/>
								wir bei The Route Master sind ständig bemüht, Ihren Besuch auf unserer Webseite so angenehm und intuitiv wie möglich zu gestalten. Dennoch verstehen wir, dass Fragen oder Unklarheiten bezüglich unserer Webseitenfunktionen auftreten können.

								Sollte dies der Fall sein, zögern Sie bitte nicht, uns zu kontaktieren. Unser engagiertes Service-Team steht Ihnen jederzeit zur Verfügung, um Ihre Fragen zu beantworten und Ihnen bei jeglichen Problemen zu helfen, die Sie möglicherweise auf unserer Webseite haben.

								Sie können uns ganz einfach per E-Mail erreichen: Senden Sie Ihre Anfrage an <p className="font-bold">service@schuetz-andreas.dev</p>. Bitte geben Sie uns so viele Details wie möglich, damit wir Ihnen so effizient wie möglich helfen können.

								Uns ist Ihr Wohlbefinden sehr wichtig und wir freuen uns darauf, Ihnen bei allen Ihren Anliegen zu helfen. Ihre Zufriedenheit ist unser höchstes Ziel.

								Wir bedanken uns für Ihr Vertrauen und freuen uns auf Ihre Kontaktaufnahme!
								<br/>
								Mit freundlichen Grüßen,
								<br/>
								Ihr The Route Master Team</p>
                            </div>
						</div>
					</div>
				</div>
			</div>
		</body>
	);
}

export default HowToUse;
