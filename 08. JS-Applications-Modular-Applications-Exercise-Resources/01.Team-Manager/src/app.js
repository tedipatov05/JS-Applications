import page from "../node_modules/page/page.mjs";
import { browseView } from "./api/view/browseView.js";
import { editView } from "./api/view/editView.js";
import { homeView } from "./api/view/homeView.js";
import { loginView } from "./api/view/loginView.js";
import { myTeamView } from "./api/view/myTeamView.js";
import { registerView } from "./api/view/registerView.js";
import { teamDetailsView } from "./api/view/teamDetailsView.js";
import {render} from "../node_modules/lit-html/lit-html.js"
import { logout } from "./api/data.js";
import { createView } from "./api/view/createView.js";

const rootEl = document.getElementsByTagName('main')[0];


page('/', middleWare, homeView);
page('/index.html', middleWare, homeView);
page('/login', middleWare, loginView);
page('/register', middleWare, registerView);
page('/browse', middleWare, browseView);
page('edit/:id', middleWare, editView);
page('/my-team', middleWare, myTeamView);
page('/details/:id', middleWare, teamDetailsView);
page('/create', middleWare, createView)

page.start();

document.querySelector('.logout').addEventListener('click', async function(e) {
    e.preventDefault();
    await logout();

    updateNav();
    page.redirect('/');


})

function middleWare(ctx, next){
    ctx.render = (content) => render(content, rootEl);
    ctx.updateNav = updateNav;
    next();
}

function updateNav(){
    const user = JSON.parse(sessionStorage.getItem('userData'));
    if(user){
        document.querySelectorAll('.user').forEach(x => x.style.display = 'block');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
    }
    else{
        document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'block');

    }
}




