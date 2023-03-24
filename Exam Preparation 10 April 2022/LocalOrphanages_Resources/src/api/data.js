import {get, post, put, del} from './api.js'

export async function getAllPost(){
    return get('/data/posts?sortBy=_createdOn%20desc');
    
}
export async function getPostById(id){
    return get(`/data/posts/${id}`);
}
export async function createPost(data){
    return post('/data/posts', data);
}
export async function getUserPost(userId){
    return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
export async function updatePost(id, data){
    return put(`/data/posts/${id}`, data);
}
export async function deleteById(id){
    return del('/data/posts/' + id);
}
export async function postDonation(data){
    return post('/data/donations', data);
} 
export async function getDonationsForPost(postId){
    return get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}
export async function getSpecificUserDonations(postId, userId){
    return get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}