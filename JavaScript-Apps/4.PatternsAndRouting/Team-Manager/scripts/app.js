$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        //GET HOME
        this.get('index.html', DisplayHome);

        this.get('#/home', DisplayHome);

        //GET ABOUT
        this.get('#/about', function(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/about/about.hbs');
            });
        });

        //GET LOGIN
        this.get('#/login', function(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function() {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        //POST LOGIN
        this.post('#/login', function(ctx) {
           let username = ctx.params.username;
           let password = ctx.params.password;

            auth.login(username, password)
                .then(function(userInfo) {
                   auth.saveSession(userInfo);
                   auth.showInfo('LOGGED IN!');
                    DisplayHome(ctx);
                }).catch(auth.handleError);
        });

        //GET REGISTER
        this.get('#/register', function(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function() {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        //POST REGISTER
        this.post('#/register', function(ctx) {
           let username = ctx.params.username;
           let password = ctx.params.password;
           let repeatPassword = ctx.params.repeatPassword;

           if(password !== repeatPassword) {
               auth.showError("PASSWORDS DO NOT MATCH!")
           }else {
               auth.register(username, password)
                   .then(function (userInfo) {
                       auth.saveSession(userInfo);
                       auth.showInfo("REGISTERED!");
                       DisplayHome(ctx);
                   }).catch(auth.handleError)
           }
        });

        //GET LOGOUT
        this.get('#/logout', function(ctx) {
           auth.logout()
               .then(function () {
                 sessionStorage.clear();
                 auth.showInfo("LOGGED OUT!");
                 DisplayHome(ctx);
               }).then(auth.handleError)
        });

        //LOAD TEAMS
        this.get('#/catalog', DisplayCatalog);


        //GET CREATE FORM
        this.get('#/create', function(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function() {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        //CREATE TEAM
        this.post('#/create', function(ctx) {
           let name = ctx.params.name;
           let comment = ctx.params.comment;

           teamsService.createTeam(name, comment)
               .then(function(teamInfo) {
                   let teamId = teamInfo._id;
                   teamsService.joinTeam(teamId)
                       .then(function (userInfo) {
                           auth.saveSession(userInfo);
                           auth.showInfo(`TEAM ${name} CREATED!`);
                           DisplayCatalog(ctx);
                       }).catch(auth.handleError)
               }).catch(auth.handleError)
        });

        //GET DETAILS
        this.get('#/catalog/:id', function(ctx) {
            let teamId = ctx.params.id.substring(1);
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");

            teamsService.loadTeamDetails(teamId)
                .then(function(teamInfo) {
                    ctx.name = teamInfo.name;
                    ctx.comment = teamInfo.comment;
                    ctx.teamId = teamId;
                    ctx.isAuthor = sessionStorage.getItem('userId') === teamInfo._acl.creator;
                    ctx.isOnTeam = sessionStorage.getItem('teamId') === teamInfo._id;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        teamControls: './templates/catalog/teamControls.hbs'
                    }).then(function() {
                        this.partial('./templates/catalog/details.hbs');
                    });
                }).catch(auth.handleError);
        });

        //JOIN TEAM
        this.get('#/join/:teamId', function(ctx) {
            let teamId = ctx.params.teamId.substring(1);
            console.log(teamId);
            teamsService.joinTeam(teamId)
                .then(function(userInfo) {
                   auth.saveSession(userInfo);
                   auth.showInfo("YOU HAVE JOINED TEAM!");
                   DisplayCatalog(ctx);
                }).catch(auth.handleError);
        });

        //LEAVE TEAM
        this.get('#/leave', function(ctx) {
            teamsService.leaveTeam()
                .then(function(userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo("YOU HAVE LEFT TEAM!");
                    DisplayCatalog(ctx);
                }).catch(auth.handleError);
        });

        //GET EDIT TEAM
        this.get('#/edit/:teamId', function(ctx) {
            let teamId = ctx.params.teamId.substring(1);
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");

            teamsService.loadTeamDetails(teamId)
                .then(function(teamInfo) {
                    ctx.name = teamInfo.name;
                    ctx.comment = teamInfo.comment;
                    ctx.teamId = teamId;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        editForm: './templates/edit/editForm.hbs'
                    }).then(function() {
                        this.partial('./templates/edit/editPage.hbs');
                    });
                }).catch(auth.handleError);
        });

        //POST EDIT
        this.post('#/edit/:teamId', function(ctx) {
            let teamId = ctx.params.teamId.substring(1);
            let name = ctx.params.name;
            let comment = ctx.params.comment;

            teamsService.edit(teamId, name, comment)
                .then(function(teamInfo) {
                    auth.showInfo(`TEAM  EDITED!`);
                    DisplayCatalog(ctx);
                }).catch(auth.handleError);
        });

        this.get('#/delete/:teamId', function(ctx) {
            let teamId = ctx.params.teamId.substring(1);
           teamsService.removeTeam(teamId)
               .then(function(teamInfo) {
                   auth.showInfo(`TEAM  IS DELETED`);
                   DisplayCatalog(ctx);
               }).catch(auth.handleError);
        });


        function DisplayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/home/home.hbs');
            });
        }

        function DisplayCatalog(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");

            teamsService.loadTeams()
                .then(function (teams) {
                    ctx.teams = teams;
                    ctx.hasNoTeam = sessionStorage.getItem('teamId') === null ||
                        sessionStorage.getItem('teamId') === 'undefined';
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs'
                    }).then(function() {
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    });
                })
        }
    });

    app.run();
});