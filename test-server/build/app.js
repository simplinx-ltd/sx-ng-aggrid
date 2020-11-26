"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = require("sequelize");
const http = require("http");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config_1 = require("./config");
const rest_api_1 = require("./rest-api");
const __models_1 = require("./models/__models");
let app = null;
let server = null;
// Db Connection
let connection = null;
let port = config_1.default.port || 3000;
app = express();
app.set('port', port);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
server = http.createServer(app);
server.on('error', (err) => {
    throw err;
});
server.on('listening', () => {
    console.info('********** Server Listening on port ' + port + ' *********');
});
connect2Db(() => {
    // Define Models
    __models_1.default(connection, (err) => {
        if (err)
            console.error('defineModels Error:', err);
        rest_api_1.default(app, connection);
        // Error Handlers
        defineErrorHandlers();
        server.listen(port);
    });
});
function connect2Db(cb) {
    // Sequelize Promise Config
    sequelize.Promise.config({
        warnings: false,
        longStackTraces: true,
        cancellation: true,
        monitoring: true,
    });
    const Op = sequelize.Op;
    const operatorsAliases = {
        $eq: Op.eq,
        $ne: Op.ne,
        $gte: Op.gte,
        $gt: Op.gt,
        $lte: Op.lte,
        $lt: Op.lt,
        $not: Op.not,
        $in: Op.in,
        $notIn: Op.notIn,
        $is: Op.is,
        $like: Op.like,
        $notLike: Op.notLike,
        $iLike: Op.iLike,
        $notILike: Op.notILike,
        $regexp: Op.regexp,
        $notRegexp: Op.notRegexp,
        $iRegexp: Op.iRegexp,
        $notIRegexp: Op.notIRegexp,
        $between: Op.between,
        $notBetween: Op.notBetween,
        $overlap: Op.overlap,
        $contains: Op.contains,
        $contained: Op.contained,
        $adjacent: Op.adjacent,
        $strictLeft: Op.strictLeft,
        $strictRight: Op.strictRight,
        $noExtendRight: Op.noExtendRight,
        $noExtendLeft: Op.noExtendLeft,
        $and: Op.and,
        $or: Op.or,
        $any: Op.any,
        $all: Op.all,
        $values: Op.values,
        $col: Op.col,
    };
    // Db Connect
    connection = new sequelize_typescript_1.Sequelize(Object.assign(config_1.default.mainDb, { operatorsAliases }));
    connection
        .authenticate()
        .then(() => {
        cb();
    })
        .catch((err) => {
        console.error(`DB Connection Error. Err: ${err.message}`);
        console.error('Exiting...');
        process.exit(-1);
    });
}
/**
 * Error Handlers
 */
function defineErrorHandlers() {
    // Last Middleware
    app.use(function (req, res, next) {
        res.sendFile(__dirname + '/public/index.html');
    });
    // Error Handler
    app.use(function (err, req, res, next) {
        let status = 500;
        switch (err.message) {
            case 'ACCESS_ERROR':
                status = 401;
                break;
            case 'LOGIN_FAILED':
                status = 401;
                break;
            case 'WRONG_REQUEST_CONFIG':
                status = 400;
                break;
            default:
                if (app.get('env') === 'development')
                    console.error(err.stack);
        }
        res.status(status).send({ name: err.name, message: err.message });
    });
}
