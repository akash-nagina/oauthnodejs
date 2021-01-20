module.exports = (router, expressApp, restrictedAreaRoutesMethods) => {

    //route for entering into the restricted area.
    router.post('/enter', expressApp.oauth.authorise(), restrictedAreaRoutesMethods.accessRestrictedArea);
    router.post('/addProduct', expressApp.oauth.authorise(), restrictedAreaRoutesMethods.addProduct);
    router.post('/updateProduct', expressApp.oauth.authorise(), restrictedAreaRoutesMethods.updateProduct);
    router.post('/deleteProduct', expressApp.oauth.authorise(), restrictedAreaRoutesMethods.deleteProduct);
    router.get('/viewProducts', expressApp.oauth.authorise(), restrictedAreaRoutesMethods.viewProducts);

    return router
}