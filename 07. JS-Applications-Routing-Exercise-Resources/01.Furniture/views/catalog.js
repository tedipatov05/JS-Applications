import { html } from "../node_modules/lit-html/lit-html.js";
import { getAllitems } from '../src/api/data.js'

let contex = null;
export async function catalogView(ctx) {
    debugger;
    const items = await getAllitems();
    ctx.render(catalogTemplate(items));

}


function catalogTemplate(data) {
    return html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        
        <div class="row space-top">
            ${Object.values(data).map(x => createItemTemp(x))}
           
        </div>
    </div>`;
}

function createItemTemp(itemDeatils){
    return html`<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
                <img src=${itemDeatils.img} />
                <p>Description here</p>
                <footer>
                    <p>Price: <span>${itemDeatils.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${itemDeatils._id}" class="btn btn-info">Details</a>
                </div>
        </div>
    </div>
`;

}