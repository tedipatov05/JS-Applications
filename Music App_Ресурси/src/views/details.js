import { getAlbumById } from "../api/data.js";
import {html} from '../lib.js'

const detailsTemplate = (album, isOwner) => {
    return html`
    <section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${album.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.nam}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            ${isOwner ? html`<div class="actionBtn">
                <a href="/edit/${album._id}" class="edit">Edit</a>
                <a href="javascript:void(0)" class="remove">Delete</a>
            </div>` : ''}
            
        </div>
    </div>
</section>`
}

export async function showDetails(ctx){
    debugger;
    const id = ctx.params.id;
    const album = await getAlbumById(id);
    const user = ctx.user;
    const isOwner = user._id === album._ownerId;

    ctx.render(detailsTemplate(album, isOwner));
    
}