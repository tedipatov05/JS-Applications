import { html } from "../node_modules/lit-html/lit-html.js";
import { getUserPost } from "../src/api/data.js";
import { getUserData } from "../src/util.js";


const postTemplate = (post) => {
    return html`
    <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src="${post.imageUrl}" alt="Material Image">
        <div class="btn-wrapper">
            <a href="/home/${post._id}" class="details-btn btn">Details</a>
        </div>
    </div>`
}

const myPostsTemplate = (posts) => {
    return html`
    <section id="my-posts-page">
        <h1 class="title">My Posts</h1>
    
        <!-- Display a div with information about every post (if any)-->
        <div class="my-posts">
    
        ${posts.length == 0 ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>` : 
    html`${posts.map(postTemplate)}`}
    
            
        </div>
    
        <!-- Display an h1 if there are no posts -->
        
    </section>`
}
export async function showUserPosts(ctx) {
    const user = getUserData()
    const posts = await getUserPost(user._id);

    ctx.render(myPostsTemplate(posts));



}