async function loadRepos() {
	let username = document.getElementById('username').value;

	try {
		const response = await fetch(`https://api.github.com/users/${username}/repos`);

		if (response.ok == false) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();

		const list = document.getElementById('repos');

		const items = data.map(repo => {
			const li = document.createElement('li');
			const a = document.createElement('a');
			a.href = repo.html_url;
			a.textContent = repo.full_name;
			li.appendChild(a);

			return li;
		})

		list.replaceChildren(...items);
	}
	catch(err){
		const list = document.getElementById('repos');
		list.textContent = err.message;
	}

}