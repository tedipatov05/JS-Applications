import { html } from "../node_modules/lit-html/lit-html.js";
import {register} from '../src/api/data.js'


let context = null;

export async function registerView(ctx){
    context = ctx;
    ctx.render(createRegistertemplate(onSubmit))
    
} 

async function onSubmit(e){

    e.preventDefault();
    const formData = new FormData(e.target);
    const {email, password, rePass} = Object.fromEntries(formData);

    //validation here!

    await register(email, password);

    context.updateNav();
    context.page.redirect('/');

}

function createRegistertemplate(handler){
    return html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit = ${handler}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`
}