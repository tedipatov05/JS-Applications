import {html} from '../../node_modules/lit-html/lit-html.js';
import { DeleteAlbum, getAlbumById, getAllLikes, getUserLikes, likeAlbum } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (album, isOwner, isUser,totalLikes ,userLikes,onDelete, onLike) => {
    return html`
    <section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src="${album.imageUrl}" alt="example1" />
      </div>
      <div id="info-wrapper">
        <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
        <p>
          <strong>Album name:</strong><span id="details-album">${album.album}</span>
        </p>
        <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
        <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
        <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
      </div>
      <div id="likes">Likes: <span id="likes-count">${totalLikes}</span></div>

      <!--Edit and Delete are only for creator-->
      <div id="action-buttons">
        ${isOwner ? html` <a href="/edit/${album._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : ''}

        ${isUser && userLikes==0 ? html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>` : ''}
      
       
      </div>
    </div>
  </section>`
}
export async function showDetailsView(ctx){
    const albumId = ctx.params.id;
    const album = await getAlbumById(albumId);
    const user = getUserData();
    const userId = user && user._id;

    const totalLikes = await getAllLikes(albumId);
    const userLikes = await getUserLikes(albumId, userId);


    const isOwner = user && user._id == album._ownerId;
    const isUser = !isOwner && user;

    ctx.render(detailsTemplate(album, isOwner, isUser,totalLikes, userLikes,onDelete, onLike))

    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this album?');

        if(confirmed){
            await DeleteAlbum(albumId);
            ctx.page.redirect('/dashboard');
        }
    }

    async function onLike(){
        const data = {albumId};

        await likeAlbum(data);
        
        ctx.page.redirect('/details/' + albumId);

    }



}