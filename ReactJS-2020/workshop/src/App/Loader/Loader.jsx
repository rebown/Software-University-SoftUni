import React from 'react';

export default function Loader({ isLoading, local }) {
    const className = `Loader${local ? 'local' : ''}`;
    return isLoading ? <div className={className}>Loading...</div> : null;
}