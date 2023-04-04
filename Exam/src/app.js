import page from '../node_modules/page/page.mjs';
import { getUserData } from './util.js';
import {render} from '../node_modules/lit-html/lit-html.js';
import { showHomeView } from './views/home.js';
import { showLoginView } from './views/login.js';
import { logout } from './api/user.js';
import { showRegisterView } from './views/register.js';
import { showDashboardView } from './views/dashboard.js';
import { showCreateView } from './views/createAlbum.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';

const root = document.querySelector('div#wrapper main');
document.querySelectorAll('nav div.user a')[1].addEventListener('click', onLogout);

page(decorateContext);
page('/', showHomeView);
page('/dashboard', showDashboardView);
page('/login', showLoginView)
page('/register', showRegisterView)
page('/create', showCreateView)
page('/details/:id', showDetailsView)
page('/edit/:id', showEditView)
page.start();

updataNav();

function decorateContext(ctx, next){
    ctx.updateNav = updataNav;
    ctx.render = renderMain;

    next();

}

function renderMain(content){
    render(content, root);

}



function updataNav(){
    const user = getUserData();
    if(user){
        document.querySelector('div.guest').style.display = 'none';
        document.querySelector('div.user').style.display = 'inline';
    }else{
        document.querySelector('div.guest').style.display = 'inline';
        document.querySelector('div.user').style.display = 'none';
    }
}
function onLogout(){
    logout();
    updataNav()
    page.redirect('/');
}