
import { getAllAlbums } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const albumTemplate = (album, hasUser) => {
    return html` 
    <div class="card-box">
        <img src="${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>

            ${hasUser ? html`<div class="btn-group">
                <a href="/catalog/${album._id}" id="details">Details</a>
            </div>` : ''}
            
        </div>
    </div>`
}

const catalogTemplate = (albums, hasUser) => {
    return html`
    <section id="catalogPage">
        <h1>All Albums</h1>
    
       
        ${albums.length > 0 ? albums.map(album => albumTemplate(album, hasUser)) : html`<p>No Albums in Catalog!</p>`};
        <!--No albums in catalog-->
        
    
    </section>`
}

export async function showCatalog(ctx){


    const albums = await getAllAlbums();


    const hasUser = Boolean(ctx.user);

    ctx.render(catalogTemplate(albums, hasUser))

}