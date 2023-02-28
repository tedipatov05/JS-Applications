async function solution() {
    const BASE_URL = "http://localhost:3030/jsonstore/advanced/articles/";
    const main = document.getElementById("main");
  
    const endpoints = {
      articles: BASE_URL + "list",
      details: (id) => BASE_URL + `details/${id}`,
    };
  
    try {
      const res = await fetch(endpoints.articles);
      const data = await res.json();
      if (res.ok == false) {
        throw new Error(data.message);
      }
      document.getElementById("main").replaceChildren(...data.map(createArticle));
    } catch (error) {
      alert(error.message);
    }
  
    function createArticle(element) {
      const div = document.createElement("div");
      div.classList.add("accordion");
      const html = `
          <div class="head">
            <span>${element.title}</span>
            <button class="button" id="${element._id}">More</button>
          </div>
            <div class="extra">
            <p></p>
          </div>`;
      div.innerHTML = html;
      return div;
    }
  
    main.addEventListener("click", async (ev) => {
      if (ev.target.nodeName !== "BUTTON") {
        return;
      }
      const id = ev.target.id;
      try {
        const res = await fetch(endpoints.details(id));
        const data = await res.json();
        if (res.ok == false) {
          throw new Error(data.message);
        }
        const section = ev.target.parentNode.parentNode;
        section.querySelector("p").textContent = data.content;
        section.lastElementChild.style.display =
          ev.target.textContent == "More" ? "block" : "none";
        ev.target.textContent = ev.target.textContent == "More" ? "Less" : "More";
      } catch (error) {
        alert(error.message);
      }
    });
  }

  solution();



/* 
    <div class="accordion">
            <div class="head">
                <span>Scalable Vector Graphics</span>
                <button class="button" id="ee9823ab-c3e8-4a14-b998-8c22ec246bd3">More</button>
            </div>
            <div class="extra">
                <p>Scalable Vector Graphics .....</p>
            </div>
    </div> 
*/
        