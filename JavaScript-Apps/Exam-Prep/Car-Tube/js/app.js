function startApp() {
    const app = Sammy('#container', function() {

        this.use('Handlebars', 'hbs');

        $(document).on({
            ajaxStart: () => $('#loadingBox').show(),
            ajaxStop: () => $('#loadingBox').fadeOut()
        });

        this.get('#/home', displayHome);
        this.get('index.html', displayHome);

        this.get('#/register', function(ctx) {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/register/registerPage.hbs');
            })
        });

        this.post('#/register', function(ctx) {
           let username = ctx.params.username;
           let password = ctx.params.password;
           let repeatPass = ctx.params.repeatPass;

           if(password !== repeatPass) {
               auth.showError("Passwords do not match!")
           }else {
               auth.register(username, password)
                   .then(function(userInfo) {
                       auth.saveSession(userInfo);
                       auth.showInfo("Successfully registered!")
                       displayHome(ctx);
                   }).catch(auth.handleError);
           }
        });

        this.get('#/login', function(ctx) {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/login/loginPage.hbs');
            })
        });

        this.post('#/login', function(ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(function(userInfo) {
                    auth.saveSession(userInfo);
                    displayCarCatalog(ctx);
                    auth.showInfo("Successfully logged in!")
                }).catch(auth.handleError);
        });

        this.get('#/logout', function(ctx) {
            auth.logout()
                .then(function(userInfo) {
                    sessionStorage.clear();
                    displayHome(ctx)
                    auth.showInfo("Successfully logged out!")
                })
        });

        this.get('#/create', function(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.user = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/create', function(ctx) {
            let title = ctx.params.title;
            let description = ctx.params.description;
            let brand = ctx.params.brand;
            let model = ctx.params.model;
            let year = ctx.params.year;
            let imageUrl = ctx.params.imageUrl;
            let fuel = ctx.params.fuelType;
            let price = ctx.params.price;
            let seller = sessionStorage.getItem('username');

            if(title.length <= 33 && description.length >= 30 && description.length <= 450
            && brand.length <= 11 && model.length <= 11 && fuel.length <= 11
           && model.length >= 4 && year.length === 4 && Number(price) <= 1000000
           && imageUrl.startsWith('http'))
            {
                carController.createCar({title, description, brand, model, year, imageUrl, fuel, price, seller})
                    .then(function(carInfo) {
                        console.log(carInfo);
                        auth.showInfo("Car has been created!")
                        displayCarCatalog(ctx)
                    }).catch(auth.handleError);
           }else {
                auth.showError("You have filled incorrect details!")
            }


        });

        this.get('#/listall', displayCarCatalog);

        this.get('#/edit/:id', function(ctx) {
            let carId = ctx.params.id;
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.user = sessionStorage.getItem('username');

            carController.loadCar(carId)
                .then(function(carInfo) {
                    ctx.car = carInfo;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs'
                    }).then(function() {
                        this.partial('./templates/edit/editPage.hbs')
                            // .then(function() {
                            //     $('button').on('click', function() {
                            //         let title = $("input[name='title']").val();
                            //         let description = $("input[name='description']").val();
                            //         let brand = $("input[name='brand']").val();
                            //         let model = $("input[name='model']").val();
                            //         let year = $("input[name='year']").val();
                            //         let imageUrl = $("input[name='imageUrl']").val();
                            //         let fuelType = $("input[name='fuelType']").val();
                            //         let price = $("input[name='price']").val();
                            //         let idCar = $("input[name='carId']").val();
                            //         let carUpdate = {title, description, brand, model, year, imageUrl, fuelType, price}
                            //         console.log(carId);
                            //         console.log(idCar);
                            //         carController.editCar(carUpdate, carId)
                            //             .then(function() {
                            //                 displayCarCatalog(ctx);
                            //                 auth.showInfo('Car was successfully updated!')
                            //             }).catch(auth.handleError)
                            //     })
                            // })
                    })
                }).catch(auth.handleError)
        })

        this.post('#/edit', function(ctx) {
            let carId = ctx.params.carId;
            let title = ctx.params.title;
            let description = ctx.params.description;
            let brand = ctx.params.brand;
            let model = ctx.params.model;
            let year = ctx.params.year;
            let imageUrl = ctx.params.imageUrl;
            let fuel = ctx.params.fuelType;
            let price = ctx.params.price;
            let seller = sessionStorage.getItem('username');
            let carUpdateInfo = {title, description, brand, model, year, imageUrl, fuel, price, seller};

            carController.editCar(carUpdateInfo, carId)
                .then(function() {
                    auth.showInfo("Successfully updated car")
                    displayCarCatalog(ctx);
                }).catch(auth.handleError)
        })

        this.get('#/delete/:id', function(ctx) {
            let carId = ctx.params.id
            carController.deleteCar(carId)
                .then(function(count) {
                    console.log(count);
                    displayCarCatalog(ctx);
                    auth.showInfo('Successfully deleted car')
                }).catch(auth.handleError)
        })

        this.get('#/details/:id', function(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.user = sessionStorage.getItem('username');
            let carId = ctx.params.id;
            carController.loadCar(carId)
                .then(function(carInfo) {
                    ctx.car = carInfo;
                    ctx.isAuthor = sessionStorage.getItem('userId') === carInfo._acl.creator;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                    }).then(function() {
                        this.partial('./templates/cars/details.hbs')
                    })
                }).catch(auth.handleError)
        })

        this.get('#/mylist', function(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.user = sessionStorage.getItem('username');
            carController.loadCars()
                .then(function(carsInfo) {
                    console.log(carsInfo);
                    ctx.cars = carsInfo.filter(car => car._acl.creator === sessionStorage.getItem('userId'));
                    console.log(ctx.cars);
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        mycar: './templates/cars/mycar.hbs'
                    }).then(function() {
                        this.partial('./templates/cars/myListing.hbs')
                    })
                });
        })



        function displayCarCatalog(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.user = sessionStorage.getItem('username');
            carController.loadCars()
                .then(function(carInfo) {
                    carInfo.forEach((car, i) => {
                        car.isAuthor = sessionStorage.getItem('userId') === car._acl.creator;
                    });
                    ctx.cars = carInfo;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        car: './templates/cars/car.hbs'
                    }).then(function() {
                        this.partial('./templates/cars/carListingPage.hbs')
                    });
                }).catch(auth.handleError);
        }

        function displayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.user = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/home/home.hbs');
            });
        }

    }).run();
}

//might not be the proper way because the function is called every time we load the page
