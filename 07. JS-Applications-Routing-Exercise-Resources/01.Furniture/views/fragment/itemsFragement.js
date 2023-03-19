import { html } from "../node_modules/lit-html/lit-html.js";

export function getItemTemlate(itemDeatils){
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