const form = document.querySelector("form");
const notifications = document.getElementsByClassName("notification")[0];
form.addEventListener("submit", registerUser);

window.onload = () => {
  document.getElementById("home").classList.remove("active");
  document.getElementById("register").classList.add("active");
  document.getElementById("logout").style.display = "none";
};

async function registerUser(e) {
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const { email, password, rePass } = Object.fromEntries(formData.entries());
    if (password != rePass) {
      throw new Error("Passwords don't match!");
    }
    if (!email || !password || !rePass) {
      throw new Error("All Fields Are Required!");
    }
    const response = await fetch(`http://localhost:3030/users/register`, {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
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
