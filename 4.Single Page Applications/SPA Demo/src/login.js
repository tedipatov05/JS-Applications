// register event listeners to nav;
// switch view;
// handle form submit;
// sent login info to REST service;
// store authentication token;

import { post } from "./api.js";
import { createSubmitHandler, setUserData } from "./util.js";

createSubmitHandler("login-form", onLogin)

const section = document.getElementById('login-view');
section.remove();

let ctx = null;

export function showLoginView(Inctx) {
    ctx = Inctx
    ctx.render(section)

}

async function onLogin({ email, password }) {
    const data = await post('/users/login', { email, password })
    setUserData(data)
    ctx.goto("catalog-link")
    ctx.checkUserNav();
}