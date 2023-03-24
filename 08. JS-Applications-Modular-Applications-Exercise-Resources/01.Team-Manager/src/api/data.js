import * as api from './api.js';


const endpoints = {
    'login': "/users/login",
    'register': '/users/register',
    'logout': '/users/logout',
    "getAllTeams": "/data/teams",
    "getAllMembers": "/data/members?where=status%3D%22member%22",
    "createTeam": "/data/teams",
    "teamInfo" : "/data/teams/",
    "memberRequest": '/data/members',
    "getOwnerTeamInfo" : '/data/members?where=teamId%3D%22$',
    'addMember': "/data/members",
    'updateMember': '/data/members/'

}

export async function login(email, password){
    const res = await api.post(endpoints.login, {email,password});
    sessionStorage.setItem('userData', JSON.stringify(res));
}

export async function register(email, username, password){
    const res = await api.post(endpoints.register, {email, username, password});
    sessionStorage.setItem('userData', JSON.stringify(res));
}

export async function logout(){
    const res = await api.get(endpoints.logout);
    sessionStorage.removeItem('userData');
    return res;
}

export async function getAllMembers(){
    const res = await api.get(endpoints.getAllMembers);
    return res;

}

export async function getAllTeams(){
    const res = await api.get(endpoints.getAllTeams);
    return res;
}
export async function createTeam(name, imageURL, description){
    const res = await api.post(endpoints.createTeam, {name, imageURL, description});
    return res;

}

export async function getTeamInfo(id){
    const res = await api.get(endpoints.teamInfo + `/${id}`);
    return res;
}

export async function updateTeamInfo(id, name, imageURL, description){
    const res = await api.put(endpoints.teamInfo + id, {name, imageURL, description});
    return res;
}

export async function requestMember(teamId){
    const res = await api.post(endpoints.memberRequest, {teamId});

    return res;
}

export async function getOwnerteamInfo(teamId){
    const res = await api.get(endpoints.getOwnerTeamInfo + `${teamId}%22&load=user%3D_ownerId%3Ausers`);
    return res;
}
export async function addMember(teamId){
    const res = await api.post(endpoints.addMember, {teamId});
    return res;
}
export async function updateMember(id){
    const res = await api.put(endpoints.updateMember + id, {"status": 'member'})
    return res;
}
export async function leaveTeam(teamId){
    const res = await api.delete(endpoints.updateMember + id);
    return res;
}


