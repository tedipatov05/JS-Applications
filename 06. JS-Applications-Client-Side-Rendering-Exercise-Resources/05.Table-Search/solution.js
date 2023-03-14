import {html, render} from '../server/node_modules/lit-html/lit-html.js';

let baseUrl = 'http://localhost:3030/jsonstore/advanced/table';
let tBody = document.querySelector('tbody');
let buttonSearch = document.getElementById("searchBtn");
buttonSearch.addEventListener("click", searchFunc);
let count = 0;

const createTableRow = (firstName, lastName, email, course) => {
   return html `
   <tr>
   <td>${firstName} ${lastName}</td>
   <td>${email}</td>
   <td>${course}</td>
   </tr>`;
};

async function loadInfo() {
   
   const response = await fetch(baseUrl);
   const data = await response.json();
   const dataArr = Object.entries(data);
   const populateTable = dataArr.map((dat) => createTableRow(dat[1].firstName, dat[1].lastName, dat[1].email, dat[1].course));
   render(populateTable, tBody);
}

loadInfo();

function searchFunc() {
   let searchedStringI = document.getElementById("searchField");
   let searchedStringF = searchedStringI.value;
   let selectedRow;
   let secondSelRow = document.querySelectorAll('[class="select"]');
   for (let each of secondSelRow){
      each.removeAttribute('class');
   }

   let tableCells = document.querySelectorAll("td");
   for (let each of tableCells) {
      let x = each.textContent;
      if (x.includes(searchedStringF)) {
         let selectedRow = each.parentNode;
         selectedRow.className = "select";
         count += 1;
      }
   }
   
   searchedStringI.value = '';

   loadInfo();
   
}