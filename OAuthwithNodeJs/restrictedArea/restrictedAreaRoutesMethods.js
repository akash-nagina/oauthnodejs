let productDBHelper

module.exports = injectedProductDBHelper => {

  productDBHelper = injectedProductDBHelper

  return {
    accessRestrictedArea: accessRestrictedArea,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    viewProducts: viewProducts
  }
}

function accessRestrictedArea(req, res) {

  res.send('You have gained access to the area')
}

function addProduct(req, res) {
  //register the user in the db
  productDBHelper.addProductInDB(req.body.name, req.body.price, req.body.quantity, dataResponseObject => {
    //create message for the api response
    const message = dataResponseObject.error === null ? "Product added successfully" : "Failed to add product"

    sendResponse(res, message, dataResponseObject.error)
  })
}

function updateProduct(req, res) {

  res.send('You have gained access to update product')
}

function deleteProduct(req, res) {

  res.send('You have gained access to delete product')
}

function viewProducts(req, res) {

  res.send('You have gained access to view products')
}
//sends a response created out of the specified parameters to the client.
//The typeOfCall is the purpose of the client's api call
function sendResponse(res, message, error) {

  res
    .status(error !== null ? error !== null ? 400 : 200 : 400)
    .json({
      'message': message,
      'error': error,
    })
}