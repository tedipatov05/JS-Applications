import { html, render } from "../lib.js";
import { logout } from "../api/user.js";
import { getUserData } from "../util.js";
import page from '../../node_modules/page/page.mjs';

const header = document.querySelector('header');



const navTemplate = (user) => {
    return html`
    <nav>
    <img src="./images/headphones.png">
    <a href="/home">Home</a>
    <ul>
        <!--All user-->
        <li><a href="/catalog">Catalog</a></li>
        <li><a href="/search">Search</a></li>
        <!--Only guest-->
        ${user ? html`<li><a href="/create">Create Album</a></li>
        <li><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>` : html`<li><a href="/login">Login</a></li>
        <li><a  href="/register">Register</a></li>`}
        <!--Only user-->
        
    </ul>
</nav>`
}


function onLogout(){
    logout();
    updateNav();
    page.redirect('/');
}


export function updateNav() {
    const user = getUserData();
    
    render(navTemplate(user), header);

}

export function showNav(){

    render(navTemplate(), header);
    updateNav();


}