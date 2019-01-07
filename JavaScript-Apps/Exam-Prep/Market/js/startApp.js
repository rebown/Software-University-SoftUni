
function startApp() {
    const app = Sammy('#app', function () {

    this.use('Handlebars', 'hbs');

    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });

    this.get('#/home', displayHome);
    this.get('market.html', displayHome);


    //GET LOGIN
    this.get('#/login', function(ctx) {
       ctx.loadPartials({
           header: './templates/common/header.hbs',
           footer: './templates/common/footer.hbs'
       }).then(function() {
          this.partial('./templates/login/login.hbs')
       });
    });

    //POST LOGIN
    this.post('#/login', function(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;

        auth.login(username, password)
            .then(function(userInfo) {
               auth.saveSession(userInfo);
               auth.showInfo("Logged In!");
               displayHome(ctx);
            }).catch(auth.handleError)
    });

    //GET REGISTER
    this.get('#/register', function(ctx) {
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function() {
            this.partial('./templates/register/register.hbs')
        });
    });

    //POST REGISTER
    this.post('#/register', function(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        let name = ctx.params.name;

        auth.register(username, password, name)
            .then(function(userInfo) {
                auth.saveSession(userInfo);
                auth.showInfo("Registered!!");
                displayHome(ctx);
            }).catch(auth.handleError)
    });

    //GET LOGOUT
    this.get('#/logout', function(ctx) {
            auth.logout()
                .then(function() {
                    sessionStorage.clear();
                    auth.showInfo("Logged out!");
                    displayHome(ctx);
                })
        });

    //LOAD PRODUCTS
    this.get('#/shop', displayProducts);

    //GET CART
    this.get('#/cart', displayCart);


    function displayCart(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.user = sessionStorage.getItem('username')
            productController.loadUser()
                .then(function(userInfo) {
                    let products = [];
                    let cart = userInfo['cart'];
                    let keys = Object.keys(cart);
                    for (let id of keys) {
                        console.log(cart[id]['product']['name']);
                        let product = {
                            _id: id,
                            quantity: cart[id]['quantity'],
                            name: cart[id]['product']['name'],
                            description: cart[id]['product']['description'],
                            price: (Number(cart[id]['product']['price'] * Number(cart[id]['quantity']))).toFixed(2)
                        };
                        products.push(product);
                    }
                    console.log(products);
                    ctx.products = products;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        product: './templates/shop/cart.hbs'
                    }).then(function() {
                        this.partial('./templates/shop/shopDetails.hbs')
                            .then(function() {
                                $('button').click(function() {
                                    let productId = $(this).attr('data-id')
                                    discardProduct(productId)
                                })
                            })
                    });
                }).catch(auth.handleError);

        function discardProduct(productId) {
            productController.loadUser()
                .then(function(userInfo) {
                    let cart = userInfo['cart'];
                    let quantity = Number(cart[productId]['quantity']) - 1;

                    if(quantity === 0) {
                        delete cart[productId];
                    }else {
                        cart[productId]['quantity'] = quantity;
                    }

                    userInfo['cart'] = cart;
                    console.log(userInfo['cart']);;
                    productController.updateProduct(userInfo)
                        .then(function(userInfo) {
                            auth.showInfo("Successfully discarded product")
                            displayCart(ctx);
                        });
                })
        }
        }

    function displayProducts(ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.user = sessionStorage.getItem('username')
        productController.loadProducts()
            .then(function(productsInfo) {
                productsInfo.forEach(p => p['price'] = Number(p['price']).toFixed(2))
                ctx.products = productsInfo;
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    product: './templates/shop/product.hbs'
                }).then(function() {
                    this.partial('./templates/shop/shop.hbs')
                        .then(function() {
                            $('button').click(function() {
                                let productId = $(this).attr('data-id');
                                purchaseProduct(productId)
                            });
                        })
                });
            }).catch(auth.handleError);
    }

    function purchaseProduct(productId) {
        productController.loadProduct(productId)
            .then(function(productInfo) {

                productController.loadUser()
                    .then(function(userInfo) {

                        let cart;
                        //CHECK IF WE HAVE CART AND CREATE IT
                        if(userInfo['cart'] === undefined) {
                            cart = {};
                        }else {
                            cart = userInfo['cart']
                        }
                        //CHECK IF WE HAVE ALREADY THE PRODUCT
                        if(cart.hasOwnProperty(productId)) {
                            cart[productId] = {
                                quantity: Number(cart[productId]['quantity']) + 1,
                                product: {
                                    name: productInfo['name'],
                                    description: productInfo['description'],
                                    price: productInfo['price']
                                }
                            }
                        }else {
                            cart[productId] = {
                                quantity: 1,
                                product: {
                                    name: productInfo['name'],
                                    description: productInfo['description'],
                                    price: Number(productInfo['price'])
                                }
                            }
                        }
                        userInfo['cart'] = cart;

                        productController.updateProduct(userInfo)
                            .then(function(userInfo) {
                                console.log("here")
                                auth.showInfo("Successfully added product to the cart")
                            })
                    })
            }).catch(auth.handleError);

    }

    function displayHome(ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.user = sessionStorage.getItem('username');

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function() {
            this.partial('./templates/home/home.hbs')
        });
    }

    }).run();
}