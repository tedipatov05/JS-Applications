import page from '../node_modules/page/page.mjs';
import{render} from '../node_modules/lit-html/lit-html.js';
import { showLoginView } from '../views/login.js';
import { showRegister } from '../views/register.js';
import { showHomeView } from '../views/home.js';
import { getUserData } from './util.js';
import {logout} from '../src/api/user.js';
import { showDetails } from '../views/details.js';
import { showCreateView } from '../views/create.js';
import { showUserPosts } from '../views/myPosts.js';
import { showEdit } from '../views/edit.js';

const main = document.getElementById('main-content');

document.querySelectorAll('div#user a')[2].addEventListener('click', onLogout);

page(updateNav)
page(decorateContext);
page('/', showHomeView);
page('/home', showHomeView);
page('/home/:id', showDetails);
page('/login', showLoginView);
page('/register', showRegister);
page('/create', showCreateView);
page('/myposts', showUserPosts);
page('/edit/:id', showEdit);
page.start();


function decorateContext(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    next();


}

function renderMain(content){
    render(content ,main);

}

function updateNav(){
    const user = getUserData();

    if(user){
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline';
    }
    else {
        document.getElementById('guest').style.display = 'inline';
        document.getElementById('user').style.display = 'none';

    }
}


function onLogout(){
    debugger;
    logout();
    updateNav();
    page.redirect('/home');
}
