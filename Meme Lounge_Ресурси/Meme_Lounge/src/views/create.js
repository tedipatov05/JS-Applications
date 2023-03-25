import { html } from "../../node_modules/lit-html/lit-html.js";
import { createMeme } from "../api/data.js";


const createTemplate = (onCreate) => {
    return html`
    <section id="create-meme">
        <form @submit=${onCreate} id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>`
}

export async function showCreate(ctx) {
    ctx.render(createTemplate(onCreate));

    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const {title, description, imageUrl } = Object.fromEntries(formData);

        if(title == '' || description == '' || imageUrl == ''){
            return alert('All fileds are required');

        }

        await createMeme({title, description, imageUrl});
        ctx.page.redirect('/memes');



    }

}