var express = require('express');
var router = express.Router();
var controllerLogger = require('../utilities/controllerLogger');
var polyphemus = require('polyphemus-connector');
var config = require('../dontsync.js');

var path = '/cas';
 
router.get('/logout', controllerLogger('polyphemus.caslogout'), polyphemus.caslogout(config)); 
router.get('/login', controllerLogger('polyphemus.caslogin'), polyphemus.caslogin(config)); 
router.get('/', controllerLogger('polyphemus.serviceValidate'), polyphemus.serviceValidate(config));
/**
 * @api {post} /login/ Login as a user
 * @apiVersion 0.0.0
 * @apiName Login
 * @apiGroup Authentication
 *
 * @apiParam {String} username Name of the user.
 * @apiParam {String} password Password of the user.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "test",
 *       "password": "test"
 *     }
 *
 * @apiSuccess {String} Token the string that can be used to identify the user in the application
 * @apiSuccess {Number} expires the time that the entry expires
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *         "result": {
 *            "token": "",
 *            "expires": 1
 *         }
 *     {
 *
 * @apiError NoPassword password was not provided.
 * @apiError InvalidCredentials User not found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *         "status": 401,
 *         "message": "Invalid credentials"
 *     }
 *
 * @apiError NoUserName username was not provided.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *         "status": 400,
 *         "message": "No name provided"
 *     }
 */

//module.exports = router;
module.exports = {
  router : router,
  path : path
};
