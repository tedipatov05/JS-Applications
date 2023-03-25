
import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/user.js";
import { showNotification } from "./notification.js";


const registerTemplate = (onRegister) => {
    return html`
    <section id="register">
        <form @submit=${onRegister} id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="#">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>`
}



export async function showRegister(ctx){

    ctx.render(registerTemplate(onRegister));

    async function onRegister(e){

        e.preventDefault();

        const formData = new FormData(e.target);
        const {username, email, password, repeatPass, gender} = Object.fromEntries(formData);

        if([username, email, password, repeatPass].some(x => x.trim() == '')){
            
            return alert('All fields are required');
            
        }
        if(password !== repeatPass){
            return alert('Password dont\'t match');
            
        }

        

        await register(username.trim(), email.trim(), password.trim(), gender.trim());
        e.target.reset();
        ctx.updateNav();
        ctx.page.redirect('/memes');
        

    }

}


 