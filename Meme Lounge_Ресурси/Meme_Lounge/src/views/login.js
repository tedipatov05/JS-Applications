import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../api/user.js";

const loginTemplate = (onLogin) => {
    return html`<section id="login">
    <form @submit=${onLogin} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/regiser">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>
`
}

export async function showLogin(ctx){
    ctx.render(loginTemplate(onLogin));
    
    async function onLogin(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const {email, password} = Object.fromEntries(formData);

        if(email == '' || password == ''){
            return alert('All fileds are required');
        }

        await login(email, password);
        ctx.updateNav();
        ctx.page.redirect('/memes');



    }
    

}