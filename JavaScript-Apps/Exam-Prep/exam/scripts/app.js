$(() => {
    let app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', displayHome);
        this.get('#/home', displayHome);

        this.get('#/register', function (ctx) {

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/user/register.hbs')
            });
        });

        this.get('#/login', function (ctx) {

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/user/login.hbs')
            });
        });

        this.post('#/register', function(ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            if (username.length < 3) {
                notify.showError('Username must be at least 3 characters long');
                return;
            }
            if (password.length < 6) {
                notify.showError('Password must be at least 6 characters long');
                return;
            }


            auth.register(username, password)
                .then(function(userInfo) {
                    auth.saveSession(userInfo);
                    notify.showInfo("User registration successful.");
                    displayHome(ctx);
                }).catch(notify.handleError)
        });

        this.post('#/login', function(ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(function(userInfo) {
                    auth.saveSession(userInfo);
                    notify.showInfo("Login successful.");
                    $('input').empty();
                    displayHome(ctx);
                }).catch(notify.handleError)
        });

        this.get('#/logout', function(ctx) {
            auth.logout()
                .then(function() {
                    sessionStorage.clear();
                    ctx.redirect('#/login');
                    notify.showInfo('Logout successful.');
                }).catch(notify.handleError)
        });

        this.get('#/create', function(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.user = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/create.hbs')
            }).catch(auth.handleError);

        });

        this.post('#/create', function(ctx) {
            let title = ctx.params.title;
            let artist = ctx.params.artist;
            let imageURL = ctx.params.imageURL;
            let likes = 0;
            let listened = 0;

            if (title.length < 6) {
                notify.showError('Title must be at least 6 characters long');
                return;
            }
            if (artist.length < 3) {
                notify.showError('Artist must be at least 6 characters long');
                return;
            }
            if (imageURL.startsWith('http://') === true || imageURL.startsWith('https://') === true) {

                service.createSong({title, artist, imageURL, likes, listened})
                    .then(function() {
                        $('input').empty();
                        notify.showInfo('Song created successfully.');
                        ctx.redirect('#/allsongs');
                    })
            }else {
                notify.showError('Image must starts with http:// or https:// ');
                return;
            }
        });

        this.get('#/allsongs', displayAllSongs);

        this.get('#/like/:id', function(ctx) {
            let songId = ctx.params.id;

            service.loadSong(songId)
                .then(function(songInfo) {
                    songInfo['likes']++;
                    service.updateSong(songInfo, songId)
                        .then(function() {
                            notify.showInfo('Liked!');
                            ctx.redirect('#/allsongs');
                        })
                }).catch(notify.handleError)
        });

        this.get('#/listen/:filter/:id', function(ctx) {
            let songId = ctx.params.id;
            let filter = ctx.params.filter;

            service.loadSong(songId)
                .then(function(songInfo) {
                    songInfo['listened']++;
                    service.updateSong(songInfo, songId)
                        .then(function(song) {
                            notify.showInfo(`You just listened ${song['title']}!`);

                            if(filter === 'mysong') {
                                ctx.redirect('#/mysongs');
                            }else {
                                ctx.redirect('#/allsongs');
                            }
                        })
                }).catch(notify.handleError)
        });

        this.get('#/remove/:id', function(ctx) {
            let songId = ctx.params.id;

            service.removeSong(songId)
                .then(function() {
                    notify.showInfo("Song removed successfully!");
                    ctx.redirect('#/allsongs');
                }).catch(notify.handleError);
        });

        this.get('#/mysongs', function(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.user = sessionStorage.getItem('username');
            let userId = sessionStorage.getItem('userId')

            service.loadMySongs(userId)
                .then(function(songsInfo) {
                    songsInfo.map(c => {
                        c.isAuthor = c._acl.creator === sessionStorage.getItem('userId');
                        c.filter = 'mysong';
                    });

                    //SORTING
                    songsInfo = songsInfo.sort((a,b) => {
                        let firstCriteria = b['likes'] - a['likes'];
                        if(firstCriteria === 0) {
                            return b['listened'] - a['listened'];
                        }
                        return firstCriteria;
                    });

                    ctx.songs = songsInfo;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        song: './templates/songs/song.hbs',
                    }).then(function() {
                        this.partial('./templates/songs/mySongs.hbs')
                    })
                }).catch(auth.handleError)
        });

        function displayAllSongs(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.user = sessionStorage.getItem('username');

            service.loadSongs()
                .then(function(songsInfo) {
                    //FILTER
                    songsInfo.map(c => {
                        c.isAuthor = c._acl.creator === sessionStorage.getItem('userId')
                        c.filter = 'allsongs';
                    });

                    let notOwnedSongs = songsInfo.filter(c => c._acl.creator !== sessionStorage.getItem('userId'))
                        .sort((a,b) => b['likes'] - a['likes']);

                    let ownedSongs = songsInfo.filter(c => c._acl.creator === sessionStorage.getItem('userId'))
                        .sort((a,b) => {
                            let firstCriteria = b['likes'] - a['likes'];
                            if(firstCriteria === 0) {
                                return b['listened'] - a['listened'];
                            }
                            return firstCriteria;
                        });

                    let filtredSongs = notOwnedSongs.concat(ownedSongs);


                    ctx.songs = filtredSongs;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        song: './templates/songs/song.hbs',
                    }).then(function() {
                        this.partial('./templates/songs/allSongs.hbs')
                    })
                }).catch(notify.handleError)
        }

        function displayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.user = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/home.hbs')
            });
        }

    }).run();
});