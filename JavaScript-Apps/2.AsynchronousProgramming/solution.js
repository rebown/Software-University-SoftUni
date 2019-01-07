function attachEvents() {
    const URL = `https://baas.kinvey.com/appdata/kid_H1J8i_xCQ`;
    const USERNAME = "Kiril";
    const PASSWORD = "12345";
    const BASE_64 = btoa(USERNAME + ":" + PASSWORD);
    const AUTH = {"Authorization": "Basic " + BASE_64};
    const POSTS = $('#posts');
    const POST_TITLE = $('#post-title');
    const POSTS_BODY = $('#post-body');
    const COMMENTS = $('#post-comments');

    $('#btnLoadPosts').click(loadPosts);
    $('#btnViewPost').click(loadPostDetails);

    function loadPosts() {
        $.ajax({
            method: "GET",
            url: URL + '/posts',
            headers: AUTH
        })
            .then(function(res) {
                for (let post of res) {
                    POSTS.append($(`<option id="${post._id}" body="${post.body}">${post.title}</option>`));
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function loadPostDetails() {
        let selectedOption = POSTS.find(':selected');
        let postTitle = POSTS.find(':selected').text();
        let postId = selectedOption.attr('id');
        let postBody = selectedOption.attr('body');
        $.ajax({
            url: URL + `/comments/?query={"post_id":"${postId}"}`,
            headers: AUTH
        })
            .then(function(res) {
                POSTS_BODY.empty();
                COMMENTS.empty();
                POST_TITLE.text(postTitle);
                POSTS_BODY.append($(`<li>${postBody}</li>`));
                for (let comment of res) {
                    COMMENTS.append($(`<li>${comment.text}</li>`));
                }

            })
            .catch(function(err) {
                console.log(err);
            });
    }
}