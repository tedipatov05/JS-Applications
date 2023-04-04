import { render } from './lib.js';
import page from '../node_modules/page/page.mjs';
import { showNav, updateNav } from './views/nav.js';
import { getUserData } from './util.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showHome } from './views/home.js';
import { showCatalog } from './views/catalog.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';

const main = document.getElementById('main-content');

//document.getElementById('logoutBtn').addEventListener('click', onLogout)

showNav()

page(decorateContext);
page('/', showHome);
page('/login',showLogin);
page('/home', showHome);
page('/register', showRegister);
page('/catalog', showCatalog);
page('/create', () => console.log('register View'));
page('/edit/:id', showEdit);
page('/catalog/:id', showDetails);
page('/search', () => console.log('serch View'));

updateNav();
page.start();

function decorateContext(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    const user = getUserData();
    if(user){
        ctx.user = user;
    }


    next();

}

function renderMain(cotent){
    render(cotent, main);
}
