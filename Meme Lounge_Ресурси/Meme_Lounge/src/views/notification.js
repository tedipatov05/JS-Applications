
import {render, html} from '../../node_modules/lit-html/lit-html.js';


const root = document.getElementById('notifications');

const notificationTemplate = (message) => {
    return html`
        <div id="errorBox" class="notification">
            <span>${message}</span>
        </div>
    `
}



export function showNotification(message){
    render(notificationTemplate(message), root);
}