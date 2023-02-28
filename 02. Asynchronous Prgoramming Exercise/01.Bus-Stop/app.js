async function getInfo() {
    let busId = document.getElementById('stopId');
    let stopNameEl = document.getElementById("stopName");
    let stopId = busId.value;
    let busList = document.getElementById('buses');

    busId.value = '';
    try {

        const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

        const reponse = await fetch(url);

        const data = await reponse.json();

        stopNameEl.textContent = data.name;

        Object.entries(data.buses).forEach(([bus, time]) => {
            let li = document.createElement('li');
            li.textContent = `Bus ${bus} arrives in ${time} minutes`

            busList.appendChild(li);

        });
    }catch(err){
        stopNameEl.textContent = 'Error';
    }

}