import {html, render} from '../server/node_modules/lit-html/lit-html.js';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);
const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
const root = document.getElementById('menu');

loadContent();

async function loadContent(){
    const response = await fetch(url);
    const data = await response.json();
    const result = Object.values(data).map(op => createOptionTemplate(op))
    render(result, root);

}

function createOptionTemplate(option){
    return html`
    <option value="${option._id}">${option.text}</option>`
}

async function addItem(data) {
    const response = await fetch(url, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text: data})
    });
   
    loadContent();
    form.reset();
} 

function onSubmit(e){
    e.preventDefault();
    const value = document.getElementById('itemText').value;
    value && addItem(value);

}