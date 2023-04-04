import { html } from '../../node_modules/lit-html/lit-html.js';
import { createAlbum } from '../api/data.js';
import { createSubmitHandler } from '../util.js';


const createAlbumsTemplate = (onCreate) => {
    return html`
    <section id="create">
        <div class="form">
            <h2>Add Album</h2>
            <form @submit=${onCreate} class="create-form">
                <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
                <input type="text" name="album" id="album-album" placeholder="Album" />
                <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
                <input type="text" name="release" id="album-release" placeholder="Release date" />
                <input type="text" name="label" id="album-label" placeholder="Label" />
                <input type="text" name="sales" id="album-sales" placeholder="Sales" />
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>`
} 

export async function showCreateView(ctx){
    ctx.render(createAlbumsTemplate(createSubmitHandler(onCreate)));

    async function onCreate({singer, album, imageUrl, release, label, sales}){
        const dataArr = [singer, album, imageUrl, release, label, sales];

        if(dataArr.some(s => s=='')){
            return alert('All fields are required');
        }

        await createAlbum({singer, album, imageUrl, release, label, sales});
        ctx.page.redirect('/dashboard');


    }
}