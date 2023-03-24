import { html } from "../node_modules/lit-html/lit-html.js";
import { login } from "../src/api/user.js";
import { createSubmitHandler } from "../src/util.js";

const loginTemplate = (onLogin) => {
    return html`
    <section id="login-page" class="auth">
        <form @submit=${onLogin} id="login">
            <h1 class="title">Login</h1>
    
            <article class="input-group">
                <label for="login-email">Email: </label>
                <input type="email" id="login-email" name="email">
            </article>
    
            <article class="input-group">
                <label for="password">Password: </label>
                <input type="password" id="password" name="password">
            </article>
    
            <input type="submit" class="btn submit-btn" value="Log In">
        </form>
    </section>`
}

export function showLoginView(ctx){
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin({email, password}){
        if(email == '' || password == ""){
            return alert('All fields are rquired');
        }

        await login(email, password);
        ctx.updateNav();
        ctx.page.redirect('/');

    }

}



