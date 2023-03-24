import {html} from '../node_modules/lit-html/lit-html.js';
import { deleteById, getPostById, getSpecificUserDonations, getDonationsForPost, postDonation } from '../src/api/data.js';
import { getUserData } from '../src/util.js';


const detailsTemplate = (post, donations, isOwner, canDonate, onDelete, onDonate) => {
    return html`
    <section id="details-page">
        <h1 class="title">Post Details</h1>
    
        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src="${post.imageUrl}" alt="Material Image" class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${post.title}</h2>
                    <p class="post-description">Description: ${post.description}</p>
                    <p class="post-address">Address: ${post.address}</p>
                    <p class="post-number">Phone number: ${post.phone}</p>
                    <p class="donate-Item">Donate Materials: ${donations}$</p>
    
                    <!--Edit and Delete are only for creator-->
                    <div class="btns">
                        ${isOwner ? html`<a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>` : ''}
    
                        <!--Bonus - Only for logged-in users ( not authors )-->
                        ${canDonate ? html`<a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>` : ''}
                    </div>
    
                </div>
            </div>
        </div>
    </section>`
}

export async function showDetails(ctx){
    debugger;
    const id = ctx.params.id;
    
    const user = getUserData();

    const post = await getPostById(id);

    const donations = await getDonationsForPost(id)
    
    let userDonations = null;

    if(user){
        userDonations = await getSpecificUserDonations(id, user._id);
    }
    

    const isOwner = user && user._id === post._ownerId;
    const canDonate = !isOwner && userDonations == 0;
    


    ctx.render(detailsTemplate(post, donations * 100 , isOwner,canDonate , onDelete, onDonate ));

    async function onDelete(){

        const choice = confirm('Are you sure ypu want ot delete this post?');

        if(choice){
            await deleteById(id);
            ctx.page.redirect('/home');
        }
    }

    async function onDonate(){

        await postDonation({id});
        ctx.page.redirect('/home/' + id);

    }

}
