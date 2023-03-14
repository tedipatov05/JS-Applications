import {towns} from './towns.js';
import {html, render} from '../server/node_modules/lit-html/lit-html.js';


const root = document.getElementById('towns');
const resultRoot = document.getElementById('result');
document.querySelector('button').addEventListener('click', search);



update();


function searchTemplate(townsName, match){
   const ul = html`
   <ul>
      ${townsName.map(town => createListTemplate(town, match))}
   </ul>`

   return ul;
   
}

function createListTemplate(town, match){
   return html`
   <li class="${ match && town.toLowerCase().includes(match) ? "active" : ""}">
      ${town}
   </li>`
}

function update(text){
   const ul = searchTemplate(towns, text);
   render(ul, root);
}


function search(e) {

   const textNode = document.getElementById('searchText');
   const text = textNode.value.toLowerCase();
   update(text);
   updateCount();
   textNode.value = '';

}

function updateCount(){
   const count = document.querySelectorAll('.active').length;
   const countElement = count ? html`<p>${count} matches found</p>` : "";

   render(countElement, resultRoot);
}


 