import { post } from "./api.js";
import { createSubmitHandler, setUserData } from "./util.js";


createSubmitHandler("register-form", onRegister)

let section = document.getElementById("register-view")
section.remove();
let ctx = null;

export function showRegisterView(inCtx) {
    ctx = inCtx
    ctx.render(section)
}


async function onRegister({ email, username, password, repass }) {

    if (password != repass) {
        return alert("Passswords don't match!")
    }

    const data = await post('/users/register', { email, username, password })
    setUserData(data)
    ctx.goto("catalog-link");
    ctx.checkUserNav();
}