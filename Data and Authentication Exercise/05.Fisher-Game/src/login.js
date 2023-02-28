const form = document.querySelector("form");
const notifications = document.getElementsByClassName("notification")[0];
form.addEventListener("submit", loginUser);

window.onload = () => {
  document.getElementById("home").classList.remove("active");
  document.getElementById("login").classList.add("active");
  document.getElementById("logout").style.display = "none";
};

async function loginUser(e) {
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const { email, password } = Object.fromEntries(formData.entries());
    if (!email || !password) {
      throw new Error("All Fields Are Required!");
    }
    const response = await fetch("http://localhost:3030/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok || response.status != 200) {
      throw new Error(data.message);
    }
    window.location = "./index.html";
    sessionStorage.setItem("authToken", data.accessToken);
    sessionStorage.setItem("userId", data._id);
    sessionStorage.setItem("email", email);
  } catch (error) {
    notifications.textContent = error.message;
    setTimeout(() => {
      notifications.textContent = "";
    }, 2000);
  }
}
