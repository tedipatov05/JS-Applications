function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPost);

    document.getElementById('btnViewPost').addEventListener('click', getComments);
}

async function getPost(){
    const selectOp  =document.getElementById('posts');
    const url = `http://localhost:3030/jsonstore/blog/posts`;

    selectOp.innerHTML = '';
    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(post => {
        const option = document.createElement('option');
        option.value = post.id;
        option.textContent = post.title;

        selectOp.appendChild(option);

    })

}

async function getComments(){
    const postUrl = `http://localhost:3030/jsonstore/blog/posts`;
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const selectedOp = document.getElementById('posts').selectedOptions[0];
    const titleElement = document.getElementById('post-title');
    const postBodyEl = document.getElementById('post-body');
    const postComm = document.getElementById('post-comments');
    

    postComm.innerHTML= '';
   

    const postResponse = await fetch(postUrl);
    const postData = await postResponse.json();

    const commentsResponse = await fetch(commentsUrl);
    const commentsData = await commentsResponse.json();

    const selectedPost = Object.values(postData).find(p => p.id === selectedOp.value);


    titleElement.textContent = selectedPost.title;

    postBodyEl.textContent = selectedPost.body;

    const comments = Object.values(commentsData).filter(c => c.postId === selectedOp.value);


    comments.forEach(c => {
        const li = document.createElement('li');
        li.textContent = c.text;
        

        postComm.appendChild(li);


    })


}




attachEvents();