var bookId = '';
function solve() {
    document.getElementById("loadBooks").addEventListener("click", fetchAllBooks)
    const form = document.querySelector("form");
    form.addEventListener("click", renderCreateBook);

}


function renderAllBooks(data) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    for (const [key, { title, author }] of data) {
        const tr = document.createElement("tr");
        const tdAuthor = document.createElement("td");
        const tdTittle = document.createElement("td")
        tdAuthor.textContent = title;
        tdTittle.textContent = author;

        tr.appendChild(tdAuthor);
        tr.appendChild(tdTittle);

        const buttonTd = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.setAttribute("id", key)
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", renderEditBook)

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", key)
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", renderDeleteBook)

        buttonTd.appendChild(editBtn);
        buttonTd.appendChild(deleteBtn);
        tr.appendChild(buttonTd);

        tbody.appendChild(tr);
    }
}


function renderCreateBook(e) {
    e.preventDefault();
    if (e.target.tagName !== 'BUTTON') return;
    if (e.target.textContent == "Save") {
        editBook(e);
        return;
    }
    let form = e.target.parentElement;
    let formData = new FormData(form);
    let newBook = Object.fromEntries(formData);

    if (Object.values(newBook).includes(" ")) {
        throw new Error("New Book inputs cannot be empty!");
    }
    createBook(newBook);
    document.querySelector('[name="title"]').value = '';
    document.querySelector('[name="author"]').value = '';
}



function renderEditBook(e) {
    bookId = e.target.id;
    let bookTitle = e.target.parentElement.parentElement.children[0].textContent;
    let bookAuthor = e.target.parentElement.parentElement.children[1].textContent;

    document.querySelector('[name="title"]').value = bookTitle;
    document.querySelector('[name="author"]').value = bookAuthor;

    document.querySelector("form h3").textContent = "Edit FORM";
    document.querySelector("form button").textContent = "Save";
    e.target.parentElement.parentElement.remove();

}

function renderDeleteBook(e) {
    let bookToDelete = e.target.id;
    let bookDOM = e.target.parentElement.parentElement;
    deleteBookById(bookToDelete);
    bookDOM.remove();
    debugger

}

async function deleteBookById(id) {
    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(null)
    })
}

async function editBook(e) {
    let form = e.target.parentElement;
    let formData = new FormData(form);
    let { title, author } = Object.fromEntries(formData);

    if (title == '' || author == '') {
        throw new Error("Invalid inputs");
    }


    document.querySelector("form h3").textContent = "FORM";
    document.querySelector("form button").textContent = "Submit";

    await fetch(`http://localhost:3030/jsonstore/collections/books/${bookId}`, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ title, author })
    });

    document.querySelector('[name="title"]').value = '';
    document.querySelector('[name="author"]').value = '';

    fetchAllBooks();
}

async function fetchAllBooks() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books');
    const data = Object.entries(await response.json());
    renderAllBooks(data);
}


async function createBook(body) {
    await fetch('http://localhost:3030/jsonstore/collections/books', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    })
}

solve();