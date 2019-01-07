let service = (() => {

    function loadSongs() {
        // Request songs
        return requester.get('appdata', `songs?query={}&sort={likes:-1}`, 'kinvey');
    }

    function loadMySongs(userId) {
        return requester.get('appdata', `songs?query={"_acl.creator":"${userId}"}`, 'kinvey');
    }

    function createSong(songInfo) {
        return requester.post('appdata', 'songs', 'kinvey', songInfo);
    }

    function loadSong(songId) {
        return requester.get('appdata', 'songs/' + songId, 'kinvey');
    }

    function updateSong(songInfo, songId) {
        return requester.update('appdata', 'songs/' + songId, 'kinvey', songInfo);
    }

    function removeSong(songId) {
        return requester.remove('appdata', 'songs/' + songId);
    }



    return {
        loadSongs,
        createSong,
        loadSong,
        updateSong,
        removeSong,
        loadMySongs
    }

})();