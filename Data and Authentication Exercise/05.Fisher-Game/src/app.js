window.onload = attatchEvents;
const catches = document.getElementById("catches");

function attatchEvents() {
  navigationFix(); 
  document.getElementById("logout").addEventListener("click", logOutUser);
  document
    .getElementsByClassName("load")[0]
    .addEventListener("click", loadCatches);
  document.querySelector("form").addEventListener("submit", createCatch);
}

function navigationFix() {
  if (!sessionStorage.authToken) {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "inline-block";
    document.querySelector("span").innerText = "guest";
  } else {
    document.getElementById("user").style.display = "inline-block";
    document.getElementById("guest").style.display = "none";
    document.getElementsByClassName("add")[0].disabled = false;
    document.querySelector("span").innerText = sessionStorage.email;
  }
}

async function logOutUser() {
  try {
    const response = await fetch(`http://localhost:3030/users/logout`, {
      headers: {
        "X-Authorization": sessionStorage.authToken,
      },
    });
    if (!response.ok) {
      throw new Error();
    }
    sessionStorage.clear();
    window.location = "./index.html";
  } catch (e) {
    console.log(e);
  }
}

async function loadCatches() {
  try {
    catches.replaceChildren();
    const response = await fetch(`http://localhost:3030/data/catches`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    Object.values(data).forEach((x) => {
      let catchDiv = htmlGenerator("div", "", catches, "catch");
      catchDiv.setAttribute("owner-id", x._ownerId);

      htmlGenerator("label", "Angler", catchDiv);
      htmlGenerator("input", "", catchDiv, "angler", "text", x.angler, ".");

      htmlGenerator("label", "Weight", catchDiv);
      htmlGenerator("input", "", catchDiv, "weight", "text", x.weight, ".");

      htmlGenerator("label", "Species", catchDiv);
      htmlGenerator("input", "", catchDiv, "species", "text", x.species, ".");

      htmlGenerator("label", "Location", catchDiv);
      htmlGenerator("input", "", catchDiv, "location", "text", x.location, ".");

      htmlGenerator("label", "Bait", catchDiv);
      htmlGenerator("input", "", catchDiv, "bait", "text", x.bait, ".");

      htmlGenerator("label", "Capture Time", catchDiv);
      htmlGenerator(
        "input",
        "",
        catchDiv,
        "captureTime",
        "text",
        x.captureTime,
        "."
      );

      let updateBtn = htmlGenerator("button", "Update", catchDiv, "update");
      updateBtn.setAttribute("data-id", x._id);
      updateBtn.setAttribute("owner-id", x._ownerId);
      updateBtn.addEventListener("click", updateCatch);
      let deleteBtn = htmlGenerator("button", "Delete", catchDiv, "delete");
      deleteBtn.setAttribute("data-id", x._id);
      deleteBtn.setAttribute("owner-id", x._ownerId);
      deleteBtn.addEventListener("click", deleteCatch);
    });
    toggleBtns();
  } catch (e) {
    console.log(e);
  }
}

function toggleBtns() {
  const allBtns = catches.querySelectorAll("button");
  allBtns.forEach((button) => {
    let id = button.getAttribute("owner-id");
    if (id == sessionStorage.userId) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

  const allCatches = catches.querySelectorAll("div");
  allCatches.forEach((x) => {
    let id = x.getAttribute("owner-id");
    if (id == sessionStorage.userId) {
      x.querySelectorAll("input").forEach((el) => {
        el.disabled = false;
      });
    }
  });
}

async function createCatch(e) {
  e.preventDefault();
  const form = document.querySelector("form");
  const formData = new FormData(form);
  try {
    const { angler, weight, species, location, bait, captureTime } =
      Object.fromEntries(formData.entries());
    if (!angler || !weight || !species || !location || !bait || !captureTime) {
      throw new Error("All Fields Are Required!");
    }
    const response = await fetch(`http://localhost:3030/data/catches`, {
      method: "post",
      headers: { "X-Authorization": sessionStorage.authToken },
      body: JSON.stringify({
        angler,
        weight,
        species,
        location,
        bait,
        captureTime,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    loadCatches();
    form.reset();
  } catch (e) {
    alert(e.message);
  }
}

async function deleteCatch(e) {
  let id = this.getAttribute("data-id");
  try {
    const response = await fetch(`http://localhost:3030/data/catches/${id}`, {
      method: "delete",
      headers: { "X-Authorization": sessionStorage.authToken },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    loadCatches();
  } catch (e) {
    alert(e.message);
  }
}

async function updateCatch(e) {
  const [angler, weight, species, location, bait, captureTime] =
    this.parentNode.querySelectorAll("input");
  try {
    if (
      !angler.value ||
      !weight.value ||
      !species.value ||
      !location.value ||
      !bait.value ||
      !captureTime.value
    ) {
      throw new Error("All fields are required!");
    }
    const id = this.getAttribute("data-id");
    const response = await fetch(`http://localhost:3030/data/catches/${id}`, {
      method: "put",
      headers: { "X-Authorization": sessionStorage.authToken },
      body: JSON.stringify({
        angler: angler.value,
        weight: weight.value,
        species: species.value,
        location: location.value,
        bait: bait.value,
        captureTime: captureTime.value,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    loadCatches();
  } catch (e) {
    alert(e.message);
  }
}

function htmlGenerator(tag, text, parent, className, type, value, disabled) {
  let el = document.createElement(tag);
  el.textContent = text;

  if (parent) {
    parent.appendChild(el);
  }
  if (className) {
    el.className = className;
  }
  if (type) {
    el.setAttribute("type", type);
  }
  if (value) {
    el.setAttribute("value", value);
  }
  if (disabled) {
    el.disabled = true;
  }
  return el;
}
