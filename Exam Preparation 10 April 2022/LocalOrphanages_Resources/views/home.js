import { html } from '../node_modules/lit-html/lit-html.js';
import { getAllPost } from '../src/api/data.js';


const postCard = (post) => {
    return html`
    <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src="${post.imageUrl}" alt="Material Image">
        <div class="btn-wrapper">
            <a href="/home/${post._id}" class="details-btn btn">Details</a>
        </div>
    </div>`
}

const homeTemplate = (posts) => {
    return html` 
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>
    
        <div class="all-posts">
        <!-- Display a div with information about every post (if any)-->
        ${posts.length == 0 ? html`<h1 class="title no-posts-title">No posts yet!</h1>` :
         html`${posts.map(postCard)}`}
        </div>
    
        <!-- Display an h1 if there are no posts -->
    
    </section>`
}



export async function showHomeView(ctx) {
    debugger;
    const posts = await getAllPost();
    ctx.render(homeTemplate(posts));

}