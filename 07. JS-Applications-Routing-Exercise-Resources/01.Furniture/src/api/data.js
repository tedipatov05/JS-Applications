import * as api from './api.js';


const endpoints = {
    'login': "/users/login",
    'register': '/users/register',
    "createItem": '/data/catalog',
    'getAllItems': '/data/catalog',
    'getItemById': '/data/catalog/',
    'myItem' : '/data/catalog?where=_ownerId%3D%22',
    'logout': '/users/logout'
}

export async function login(email, password){
    const res = await api.post(endpoints.login, {email,password});
    sessionStorage.setItem('userData', JSON.stringify(res));
}

export async function register(email, password){
    const res = await api.post(endpoints.register, {email, password});
    sessionStorage.setItem('userData', JSON.stringify(res));
}

export async function logout(){
    const res = await api.get(endpoints.logout);
    sessionStorage.removeItem('userData');
    return res;
}

export async function createItem(data){
    const res = await api.post(endpoints.createItem, data);
    return res;

}

export async function getAllitems(){
    const res = await api.get(endpoints.getAllItems);
    return res;

}


export async function getItemById(id){
    const res = await api.get(endpoints.getItemById + id);
    return res;

}
export async function updateById(id, data){
    const res = await api.put(endpoints.getItemById + id, data);
    return res;

}

export async function deleteItem(id){
    const res = await api.del(endpoints.getItemById + id);
    return res;

}

export async function getMyItems(){

    //{userId}%22

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = userData && userData._id;
    const res = await api.get(endpoints.getItem + `${userId}%22`)

    return res;
}




/*

•	Register User (POST): http://localhost:3030/users/register
•	Login User (POST): http://localhost:3030/users/login
•	Logout User (GET): http://localhost:3030/users/logout

•	Create Furniture (POST): http://localhost:3030/data/catalog
•	All Furniture (GET): http://localhost:3030/data/catalog
•	Furniture Details (GET): http://localhost:3030/data/catalog/:id
•	Update Furniture (PUT): http://localhost:3030/data/catalog/:id
•	Delete Furniture (DELETE):  http://localhost:3030/data/catalog/:id
•	My Furniture (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22

*/