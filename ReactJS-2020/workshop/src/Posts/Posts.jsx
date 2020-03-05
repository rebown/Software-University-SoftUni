import React from 'react';
import styles from './Posts.module.css';
import postService from '../services/post-service';
import Post from './Post/Post';

class Posts extends React.Component {
    state = {
        posts: null
    }

    render () {
        const { posts } = this.state;

        return (
            <div>
                {posts ? 
                 <div className={styles.Posts}>
                     {posts.map((post) => <Post key={post.id} imageUrl="/logo192.png" author={post.author ? post.author.username : null} imageAlt="alt">{post.description}</Post>)}
                 </div> :
                 <div>Loading ...</div>
                }
            </div>
        );
    }

    componentDidMount() {
        //service fetching data
        
        console.log(this.props)
        postService.load(this.props.limit).then(posts => {
            debugger;
            this.setState({ posts });
        });
    }
}

export default Posts;