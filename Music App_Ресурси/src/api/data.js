import {get, post, put, del} from './api.js';

export async function getAllAlbums(){
    return get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}
export async function getAlbumById(id){
    return get(`/data/albums/${id}`);
}
export async function updateAlbum(id, data){
    return put(`/data/albums/${id}`, data);
}
