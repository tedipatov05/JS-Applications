import { html } from '../node_modules/lit-html/lit-html.js';
import { getPostById, updatePost } from '../src/api/data.js';
import { createSubmitHandler } from '../src/util.js';


const editTemplate = (post, onEdit) => {
    return html`
    <section id="edit-page" class="auth">
        <form @submit=${onEdit} id="edit">
            <h1 class="title">Edit Post</h1>
    
            <article class="input-group">
                <label for="title">Post Title</label>
                <input type="title" name="title" id="title" .value="${post.title}">
            </article>
    
            <article class="input-group">
                <label for="description">Description of the needs </label>
                <input type="text" name="description" id="description" .value="${post.description}">
            </article>
    
            <article class="input-group">
                <label for="imageUrl"> Needed materials image </label>
                <input type="text" name="imageUrl" id="imageUrl" value="${post.imageUrl}">
            </article>
    
            <article class="input-group">
                <label for="address">Address of the orphanage</label>
                <input type="text" name="address" id="address" value="${post.address}">
            </article>
    
            <article class="input-group">
                <label for="phone">Phone number of orphanage employee</label>
                <input type="text" name="phone" id="phone" value="${post.phone}">
            </article>
    
            <input type="submit" class="btn submit" value="Edit Post">
        </form>
    </section>
`
}

export async function showEdit(ctx){
    const postId = ctx.params.id;
    const post = await getPostById(postId);

    ctx.render(editTemplate(post, createSubmitHandler(onEdit)))

    async function onEdit({title, description, imageUrl, address, phone}){

        if(title == '' || description == '' || imageUrl == '' || address == '' || phone == ''){
            return alert('All fields are required');
        }

        await updatePost(postId, {title, description, imageUrl, address, phone});

        ctx.page.redirect(`/home/${postId}`);
    }
}