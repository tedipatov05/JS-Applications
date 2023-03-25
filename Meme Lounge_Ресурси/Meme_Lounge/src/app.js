import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';
import { showAllMemes } from "./views/allMemes.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showLogin } from "./views/login.js";
import { showNav } from "./views/nav.js";
import { showProfile } from "./views/profile.js";
import { showRegister } from "./views/registerView.js";
import { showWelcome } from "./views/welcome.js";




const root = document.querySelector('div#container main');


showNav();

page(decorateConetx);
page('/', '/home');
page('/home', showWelcome);
page('/register', showRegister);
page('/memes', showAllMemes);
page('/login', showLogin);
page('/details/:id', showDetails);
page('/create', showCreate);
page('/edit/:id', showEdit);
page('/profile', showProfile)
page.start();

function decorateConetx(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = showNav;

    next();
}

function renderMain(content){
    render(content, root);
}