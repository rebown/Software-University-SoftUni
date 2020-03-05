import React from 'react';
import './Profile.css';
import Posts from '../Posts/Posts';

export default function Profile() {
    return (
        <div className="Profile">
            <img src="" alt=""/>
            <div className="personal-info">
                <p>
                    <span>Email: </span>
                    simeon@someday.gg
                </p>
                <p>
                    <span>Posts: </span>
                    3
                </p>
            </div>
            <Posts limit={3} />
        </div>
    )
}