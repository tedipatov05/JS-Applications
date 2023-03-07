import { showDetails } from "./details.js";

const form = document.querySelector('#home-view form');
form.addEventListener("submit", onSubmit)
const section = document.getElementById("home-view");
const main = document.getElementsByTagName("main")[0];
const url = "http://localhost:3030/jsonstore/collections/myboard/posts"


section.remove();

export async function showHome() {
    const topicContainter = section.querySelector(".topic-title");

    const posts = await loadPost();
    const content = Object.values(posts).map(el => topicTemplate(el))
    topicContainter.replaceChildren(...content)
    main.replaceChildren(section);
}


function topicTemplate(data) {
    const container = document.createElement("div");
    container.classList.add("topic-container");
    container.innerHTML = `
    <div class="topic-name-wrapper">
    <div class="topic-name">
        <a href="#" class="normal" id=${data._id}>
            <h2>${data.topicName}</h2>
        </a>
        <div class="columns">
            <div>
                <p>Date: <time>${data.date}</time></p>
                <div class="nick-name">
                <p>Username: <span>${data.username}</span></p>
                </div>
            </div>
        </div>
    </div>
</div>`;
    container.querySelector('a').addEventListener("click", showDetails)
    return container;
}

function onSubmit(e) {
    e.preventDefault();
    if (e.submitter.textContent === "Cancel") {
        return clearForm()
    }
    const formData = new FormData(form);
    const { topicName, username, postText } = Object.fromEntries(formData);
    createPost({ topicName, username, postText, date: new Date() })
    clearForm();
    showHome();
}

function clearForm() {
    form.reset();
}

async function createPost(body) {
    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();
    return data;
}

async function loadPost() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

showDetails();