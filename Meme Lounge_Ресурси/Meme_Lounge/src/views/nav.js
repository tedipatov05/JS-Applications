import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { logout } from "../api/user.js";
import { getUserData } from "../util.js";
import page from '../../node_modules/page/page.mjs';



const navTemplate = (user) => {
    return html`
    
        <a href="/memes">All Memes</a>
        <!-- Logged users -->
        ${user ? html`<div class="user">
            <a href="/create">Create Meme</a>
            <div class="profile">
                <span>Welcome, ${user.email}</span>
                <a href="/profile">My Profile</a>
                <a @click=${onLogout} href="javascript:void(0)">Logout</a>
            </div>
        </div>` : html`<div class="guest">
            <div class="profile">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
            <a class="active" href="/home">Home Page</a>
        </div>`}
        
        <!-- Guest users -->
        
    `
}

export async function showNav(){
    const user = getUserData();
    render(navTemplate(user), document.querySelector('div#container nav'));

}

function onLogout(){
    logout();
    showNav();
    page.redirect('/home');
}