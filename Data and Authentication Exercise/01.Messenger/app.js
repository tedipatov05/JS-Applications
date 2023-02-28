function attachEvents() {
    
    document.getElementById('refresh').addEventListener('click', getAllMessage);
    
    document.getElementById('submit').addEventListener('click', createMsg);
    

    
}

function renderMsg(data){
    const textArea = document.getElementById('messages');

    const content = Object.values(data).map(entry => `${entry.author}: ${entry.content}`).join('\n');

    textArea.textContent = content;
    

}

function createMsg(){

    const author = document.getElementsByName('author')[0];
    const content = document.getElementsByName('content')[0];

    const body = {
        author: author.value,
        content: content.value
    }

    author.value = '';
    content.value = '';

    sendMsg(body);

}

async function getAllMessage(){
    let url = 'http://localhost:3030/jsonstore/messenger';
    const response = await fetch(url);
    const data = await response.json();

    renderMsg(data);


}

async function sendMsg(body){
    const url = 'http://localhost:3030/jsonstore/messenger';
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();

    getAllMessage();

    

}

attachEvents();