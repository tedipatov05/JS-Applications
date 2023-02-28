function attachEvents() {

    document.getElementById('btnLoad').addEventListener('click', onLoadAllRecords);
  
    document.getElementById('btnCreate').addEventListener('click', handleCreateRecord);
}

function handleCreateRecord(){
    let personEl = document.getElementById('person');
    let phoneEl = document.getElementById('phone');

    createRecord(personEl.value, phoneEl.value);

    personEl.value = '';
    phoneEl.value = '';
}

function renderRecords(data){
    let ul = document.getElementById('phonebook');
    ul.innerHTML = '';

    Object.values(data).forEach(rec => {

        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', handleDelete);
        

        let li = document.createElement('li');
        

        li.textContent = `${rec.person}: ${rec.phone}`;
        li.append(delBtn);
        li.setAttribute('data-id', rec._id);
        
        
        ul.appendChild(li);


    })

}

function handleDelete(e){
    let li = e.target.parentElement;

    const id = li.getAttribute("data-id");
    
    deleteRecord(id);

    li.remove();
    

}

async function onLoadAllRecords(){
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const response = await fetch(url);
    const data = await response.json();

  

    return renderRecords(data);
}

async function createRecord(person, phone){
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const response = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({person, phone})
    })

    const data = await response.json();

    onLoadAllRecords();
    

    return data;
}

async function deleteRecord(key){
    const url = `http://localhost:3030/jsonstore/phonebook/${key}`;

    const response = await fetch(url, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = response.json();

    

    return data;

}
 
attachEvents();