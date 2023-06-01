const createClient = require("hafas-client");
const dbProfile = require("hafas-client/p/db");

// create a client with the Deutsche Bahn profile
const client = createClient(dbProfile, "https://the-routemaster.schuetz-andreas.dev/");

async function test2() {
	const res = await client.journeys('508709', '8000105', { results: 1});
	console.log(res.journeys[0].legs);
}

test2();
