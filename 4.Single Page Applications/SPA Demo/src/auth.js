import { get } from "./api.js";
import { removeUserData } from "./util.js";

export function checkUserNav() {
    const username = sessionStorage.getItem("userName");
    if (username) {
        Array.from(document.querySelectorAll(".guest")).forEach(s => s.style.display = "none");
        Array.from(document.querySelectorAll(".user")).forEach(s => s.style.display = "inline");
        document.getElementById("welcome-message").textContent = `Welcome, ${username}`
    } else {
        Array.from(document.querySelectorAll(".guest")).forEach(s => s.style.display = "inline");
        Array.from(document.querySelectorAll(".user")).forEach(s => s.style.display = "none");
    }
}



export async function onLogout(ctx) {
    get('/users/logout');
    removeUserData();
    ctx.checkUserNav();
    ctx.goto("catalog-link");

    // try {
    //     const token = sessionStorage.getItem("accessToken");
    //     const response = await fetch('http/localhost:3030/users/logout', {
    //         method: "GET",
    //         headers: {
    //             'X-Authorization': token
    //         }
    //     });

    //     if (response.ok !== true) {
    //         const error = await response.json();
    //         throw new Error(error.message)
    //     }
    // } catch (e) {
    //     alert(e.message);
    // }finally {
    //     sessionStorage.removeItem("userId")
    //     sessionStorage.removeItem("userName")
    //     sessionStorage.removeItem("accessToken")
    //     checkUserNav();
    //     showCatalogueView();
    // }

}