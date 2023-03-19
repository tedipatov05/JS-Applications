import { html } from "../node_modules/lit-html/lit-html.js";
import { getMyItems } from '../src/api/data.js';
import { getItemTemlate } from '../views/fragment/itemsFragement.js'



export async function myFurnitureView(ctx) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const id = userData._id;
    const items = await getMyItems(id);
    ctx.render(myItemstemplate);
}

function myItemstemplate() {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
    
        ${Object.values(items).map(i => getItemTemlate(i))}
    
    </div>`

}