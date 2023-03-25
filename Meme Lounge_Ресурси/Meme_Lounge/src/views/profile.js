import {html} from '../../node_modules/lit-html/lit-html.js';
import { getUserMemes } from '../api/data.js';
import { getUserData } from '../util.js';



const userMemesTemplate = (meme) => {
    return html`
    <div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`
}


const profileTemplate = (userMemes, user) => {
    return html`
    <section id="user-profile-page" class="user-profile">
    <article class="user-info">
        ${user.gender == "Male" ? html`<img id="user-avatar-url" alt="user-profile" src="/images/male.png">` 
        : html`<img id="user-avatar-url" alt="user-profile" src="/images/female.png">`}
        
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${userMemes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        <!-- Display : All created memes by this user (If any) --> 
        ${userMemes.length == 0 ? html` <p class="no-memes">No memes in database.</p>` : userMemes.map( x => userMemesTemplate(x))}

        <!-- Display : If user doesn't have own memes  --> 
        
    </div>
</section>`
}

export async function showProfile(ctx){

    const user = getUserData();

    const userMemes = await getUserMemes(user._id);

    ctx.render(profileTemplate(userMemes, user));

}



