import * as api from './api.js';

const endPoint = {
    "login": 'users/login',
    "register": "users/register",
    "logout": "users/logout" 
}

export async function login(email, password){
    const user = await api.post(endPoint.login, {email, password});

    sessionStorage.setItem('user', JSON.stringify(user));

}

export async function register(email, password){
    const user = await api.post(endPoint.register, {email,password});

    sessionStorage.setItem('user', JSON.stringify(user));
}

export async function logout(){
    api.get(endPoint.logout);

    sessionStorage.removeItem('user');
    
}