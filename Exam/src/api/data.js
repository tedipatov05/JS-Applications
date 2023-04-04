import {del, get, post, put} from './api.js';

export async function getAllAlbums(){
    return get('/data/albums?sortBy=_createdOn%20desc');
}

export async function createAlbum(data){
    return post('/data/albums', data);
} 

export async function getAlbumById(id){
    return get('/data/albums/' + id);
}

export async function editAlbum(id, data){
    return put('/data/albums/' + id, data);
}

export async function DeleteAlbum(id){
    return del('/data/albums/' + id);
}

export async function likeAlbum(data){
    return post('/data/likes', data);
}

export async function getAllLikes(albumId){
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}
export async function getUserLikes(albumId, userId){
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}