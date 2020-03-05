import React from 'react';
import Posts from '../Posts/Posts';

export default function CreatePost() {
    return (
        <div className="CreatePost">
            <form action="">
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <button>Post</button>
            </form>
            <Posts limit={2} />
        </div>
    )
}