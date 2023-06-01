import readFullStations from 'db-stations'




async function  test(){
    for await (const station of readFullStations()) {
        console.log(station)
    }
}

test();