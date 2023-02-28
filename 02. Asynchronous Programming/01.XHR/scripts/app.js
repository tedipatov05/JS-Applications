function loadRepos() {
   let button = document.getElementsByTagName('button')[0];
   button.addEventListener('click', function load() {
      let url = 'https://api.github.com/users/testnakov/repos';
      const httpRequest = new XMLHttpRequest();
      httpRequest.addEventListener('readystatechange', function () {
         if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            document.getElementById("res").textContent += httpRequest.responseText;
         }
      });
      httpRequest.open("GET", url);
      httpRequest.send();
   });

}