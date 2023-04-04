import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onRegister) => {
    return html`
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form @submit=${onRegister} class="login-form">
                <input type="text" name="email" id="register-email" placeholder="email" />
                <input type="password" name="password" id="register-password" placeholder="password" />
                <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>`
}

export async function showRegisterView(ctx){
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister(data){
        const email = data.email;
        const password = data.password;
        const repeatPass = data['re-password'];

        if(email == '' || password == '' || repeatPass == ''){
            return alert('All fields are required');
        }
        if(password !== repeatPass){
            return alert('Passwords don\'t match');
        }

        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect('/dashboard');
    }

}