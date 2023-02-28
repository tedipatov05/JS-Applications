
function solve() {
    
    let baseUrl = 'http://localhost:3030/jsonstore/bus/schedule/';
    const infoBox = document.querySelector('.info');
    const arriveBtn = document.getElementById('arrive');
    const departBtn = document.getElementById('depart');
  
    let stopId = 'depot';
    let currentStop = "Depot"
  
    const endpoints = {
      catalog: (id) => `${baseUrl}${id}`,
    };
  
    function disabledCommander() {
      return {
        enable: (btn) => (btn.disabled = false),
        disable: (btn) => (btn.disabled = true),
      };
    }
  
    function disabledAttributeHandler(buttonsInfo) {
      const state = disabledCommander();
  
      Object.entries(buttonsInfo).forEach((entry) => {
        const [command, btnName] = entry;
        state[command](btnName);
      });
    }
  
    function showInfo(infoBoxContent, buttonsInfo) {
      fetch(endpoints.catalog(stopId))
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Error');
          }
          return res.json();
        })
        .then((result) => {
          const { name: busStopName, next: nextStop } = result;
  
          stopId = nextStop;
          currentStop = busStopName
  
          infoBox.textContent = `${infoBoxContent} ${busStopName}`;
          disabledAttributeHandler(buttonsInfo);
        })
        .catch((err) => {
          infoBox.textContent = err.message;
          const { enable, disable } = disabledCommander();
          disable(departBtn);
          disable(arriveBtn);
        });
    }
  
    function depart() {
      showInfo('Next Stop', { enable: arriveBtn, disable: departBtn });
    }
  
    function arrive() {
      infoBox.textContent = `Arriving at ${currentStop}`
      disabledAttributeHandler({enable: departBtn, disable: arriveBtn})
    }
  
    return {
      depart,
      arrive,
    };
  }

let result = solve();