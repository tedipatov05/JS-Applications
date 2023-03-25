import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteMeme, getMemeById } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (isOwner,meme, onDelete) => {
    return html`
    <section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>
            ${isOwner ? html` <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>` : nothing}

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
           
            
        </div>
    </div>
</section>`
}

export async function showDetails(ctx){
    const id = ctx.params.id;
    const meme = await getMemeById(id);
    const user = getUserData();
    const isOwner = user && user._id == meme._ownerId;

    ctx.render(detailsTemplate(isOwner,meme, onDelete));

    async function onDelete(){
        const choice = confirm('Are ypu sure you want to delete this meme?')

        if(choice){
            await deleteMeme(id);
            ctx.page.redirect('/memes');
        }
    }
    
}

