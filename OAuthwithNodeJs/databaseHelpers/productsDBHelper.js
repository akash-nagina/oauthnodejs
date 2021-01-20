let mySqlConnection;

module.exports = injectedMySqlConnection => {

  mySqlConnection = injectedMySqlConnection

  return {

    addProductInDB: addProductInDB,
    updateProductInDB: updateProductInDB,
    deleteProductInDB: deleteProductInDB,
    getProductInDB: getProductInDB
  }
}

/**
 * attempts to register a user in the DB with the specified details.
 * it provides the results in the specified callback which takes a
 * DataResponseObject as its only parameter
 *
 * @param name
 * @param price
 * @param quantity
 * @param addProductCallback - takes a DataResponseObject
 */
function addProductInDB(name, price, quantity, addProductCallback) {

  //create query using the data in the req.body to register the user in the db
  const addProductQuery = `INSERT INTO products (name, price,quantity) VALUES ('${name}', '${price}', '${quantity}')`

  //execute the query to register the user
  mySqlConnection.query(addProductQuery, addProductCallback)
}
/**
 * attempts to register a user in the DB with the specified details.
 * it provides the results in the specified callback which takes a
 * DataResponseObject as its only parameter
 *
 * @param name
 * @param price
 * @param quantity
 * @param addProductCallback - takes a DataResponseObject
 */
function updateProductInDB(id, name, price, quantity, updateProductCallback) {

  //create query using the data in the req.body to register the user in the db
  const updateProductQuery = `UPDATE products set name='${name}', price='${price}', quantity='${quantity}' where id='${id}' `

  //execute the query to register the user
  mySqlConnection.query(updateProductQuery, updateProductCallback)
}

/**
 * attempts to register a user in the DB with the specified details.
 * it provides the results in the specified callback which takes a
 * DataResponseObject as its only parameter
 *
 * @param id
 * @param deleteProductCallback - takes a DataResponseObject
 */
function deleteProductInDB(id, deleteProductCallback) {

  //create query using the data in the req.body to register the user in the db
  const deleteProductQuery = `DELETE from products where id='${id}' `

  //execute the query to register the user
  mySqlConnection.query(deleteProductQuery, deleteProductCallback)
}

/**
 * attempts to register a user in the DB with the specified details.
 * it provides the results in the specified callback which takes a
 * DataResponseObject as its only parameter
 *
 * @param getProductCallback - takes a DataResponseObject
 */
function getProductInDB(id, getProductCallback) {

  //create query using the data in the req.body to register the user in the db
  const getProductQuery = `SELECT * from products`

  //execute the query to register the user
  mySqlConnection.query(getProductQuery, getProductCallback)
}

/**
 * Gets the user with the specified username and password.
 * It provides the results in a callback which takes an:
 * an error object which will be set to null if there is no error.
 * and a user object which will be null if there is no user
 *
 * @param username
 * @param password
 * @param callback - takes an error and a user object
 */
function getUserFromCrentials(username, password, callback) {

  //create query using the data in the req.body to register the user in the db
  const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND password = SHA('${password}')`

  console.log('getUserFromCrentials query is: ', getUserQuery);

  //execute the query to get the user
  mySqlConnection.query(getUserQuery, (dataResponseObject) => {

    //pass in the error which may be null and pass the results object which we get the user from if it is not null
    callback(false, dataResponseObject.results !== null && dataResponseObject.results.length === 1 ? dataResponseObject.results[0] : null)
  })
}

/**
 * Determines whether or not user with the specified userName exists.
 * It provides the results in a callback which takes 2 parameters:
 * an error object which will be set to null if there is no error, and
 * secondly a boolean value which says whether or the user exists.
 * The boolean value is set to true if the user exists else it's set
 * to false or it will be null if the results object is null.
 *
 * @param username
 * @param callback - takes an error and a boolean value indicating
 *                   whether a user exists
 */
function doesUserExist(username, callback) {

  //create query to check if the user already exists
  const doesUserExistQuery = `SELECT * FROM users WHERE username = '${username}'`

  //holds the results  from the query
  const sqlCallback = (dataResponseObject) => {

    //calculate if user exists or assign null if results is null
    const doesUserExist = dataResponseObject.results !== null ? dataResponseObject.results.length > 0 ? true : false : null

    //check if there are any users with this username and return the appropriate value
    callback(dataResponseObject.error, doesUserExist)
  }

  //execute the query to check if the user exists
  mySqlConnection.query(doesUserExistQuery, sqlCallback)
}