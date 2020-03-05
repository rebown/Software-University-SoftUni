const postService = {
    load: function(limit, id) {
        return fetch(`http://localhost:9999/api/origami${id ? `/${id}` : ''}${limit ? `?limit=${limit}` : ''}`).then(res => res.json())
    }
};

export default postService;