import { login } from "../api/user.js";
import { html } from "../lib.js"
import { createSubmitHandler } from "../util.js";

const loginTemplate = (onSubmit) => {
    return html` 
    <section id="loginPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;
}
export function showLogin(ctx){

    ctx.render(loginTemplate(createSubmitHandler(onSubmit)));

    async function onSubmit({email, password}){
        if(email == '' || password == ''){
            return alert('All fields are required!');
        }
        debugger;
        await login(email, password);
        ctx.updateNav();
        ctx.page.redirect('/');

    }

}