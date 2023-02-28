async function solution() {
    const tbody = document.querySelector("tbody");
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const submit = document.getElementById("form");

    submit.addEventListener('submit', onSubmit)

    const response = await fetch(url);
    const data = Object.values(await response.json());

    data.forEach(student => {
        const tr = document.createElement('tr');

        for (let data in student) {
            if (data == '_id') continue;
            const th = document.createElement("th");
            th.textContent = student[data];
            tr.appendChild(th);
        }

        tbody.appendChild(tr);
    })


    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(submit);
        let newStudent = Object.fromEntries(formData);
        
        if(Object.values(newStudent).includes('')){
            return;
        }
        
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newStudent)
        })
    }
};

solution();