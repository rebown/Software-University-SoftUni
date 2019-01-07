let productController = (() => {
    function loadProducts() {
        // Request products
        return requester.get('appdata', 'products', 'kinvey');
    }


    function loadProduct(productId) {

        return requester.get('appdata', 'products/' + productId, 'kinvey');
    }

    function updateProduct(userInfo) {

        return requester.update('user', sessionStorage.getItem('userId'), 'kinvey', userInfo);
    }

    function loadUser(){

        return requester.get('user', sessionStorage.getItem('userId'), 'kinvey');
    }


    return {
        loadProducts,
        loadUser,
        loadProduct,
        updateProduct
    }
})();