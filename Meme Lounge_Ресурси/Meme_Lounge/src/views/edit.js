import { html } from '../../node_modules/lit-html/lit-html.js'
import { editMeme, getMemeById } from '../api/data.js';

const editTemplate = (meme, onEdit) => {
    return html`
    <section id="edit-meme">
        <form @submit=${onEdit} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">
                        ${meme.description}
                    </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
`
}

export async function showEdit(ctx){
    const memeId = ctx.params.id;
    const meme = await getMemeById(memeId);

    ctx.render(editTemplate(meme, onEdit));

    async function onEdit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const {title, description, imageUrl} = Object.fromEntries(formData);

        if(title == '' || description == '' || imageUrl == ''){
            return alert('All fileds are required');
        }

        await editMeme(memeId, {title, description, imageUrl});
        ctx.page.redirect('/details/' + memeId);

    }
}