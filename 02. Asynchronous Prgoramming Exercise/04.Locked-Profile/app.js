function lockedProfile() {
    const baseUrl = "http://localhost:3030/jsonstore/advanced/profiles";
    const mainDiv = document.getElementById("main");
    mainDiv.innerHTML = "";
  
    function createUserInfo(user) {
      const { _id, username, email, age } = user;
  
      const profileDiv = document.createElement("div");
      profileDiv.className = "profile";
  
      const html = `<img src="./iconProfile2.png" class="userIcon" />
      <label>Lock</label>
      <input type="radio" name="user1Locked" value="lock" checked>
      <label>Unlock</label>
      <input type="radio" name="user1Locked" value="unlock"><br>
      <hr>
      <label>Username</label>
      <input type="text" name="user1Username" value="${username}" disabled readonly />
      <div class="user1Username hiddenInfo">
          <hr>
          <label>Email:</label>
          <input type="email" name="user1Email" value="${email}" disabled readonly />
          <label>Age:</label>
          <input type="email" name="user1Age" value="${age}" disabled readonly />
      </div>
      
      <button>Show more</button>`;
  
      profileDiv.innerHTML = html;
  
      profileDiv.addEventListener("click", (e) => {
        if (e.target.nodeName !== "BUTTON") {
          return;
        }
        const condition = Array.from(
          e.currentTarget.querySelectorAll("[type='radio']")
        ).filter((con) => con.checked == true)[0];
  
        if (condition.value !== "unlock") {
          return;
        }
  
        e.currentTarget.children[9].classList.toggle("hiddenInfo");
        e.target.textContent =
          e.target.textContent == "Show more" ? "Hide it" : "Show more";
      });
  
      mainDiv.appendChild(profileDiv);
    }
  
    (async function getUsers() {
      const response = await fetch(baseUrl);
      const data = await response.json();
  
      const usersData = Object.values(data);
  
      usersData.forEach((user) => {
        createUserInfo(user);
      });
    })();
  }