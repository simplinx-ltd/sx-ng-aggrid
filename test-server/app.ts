import * as path from 'path';
import * as express from 'express';
import { Response, Request } from 'express';
import { Sequelize } from 'sequelize-typescript';
import * as sequelize from 'sequelize';
import * as http from 'http';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import config from './config';
import restApi from './rest-api';
import defineModels from './models/__models';

let app: express.Express = null;
let server: http.Server = null;

// Db Connection
let connection: Sequelize = null;
const port: number = config.port || 3000;

app = express();
app.set('port', port);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
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
  defineModels(connection, (err): void => {
    if (err) { console.error('defineModels Error:', err); }
    restApi(app, connection);
    // Error Handlers
    defineErrorHandlers();
    server.listen(port);
  });
});

function connect2Db(cb: () => void): void {
  // Sequelize Promise Config
  sequelize.Promise.config({
    warnings: false, // Disable warning output
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
  connection = new Sequelize(Object.assign(config.mainDb, { operatorsAliases }) as any);
  connection
    .authenticate()
    .then((): void => {
      cb();
    })
    .catch((err: Error): void => {
      console.error(`DB Connection Error. Err: ${err.message}`);
      console.error('Exiting...');
      process.exit(-1);
    });
}

/**
 * Error Handlers
 */
function defineErrorHandlers(): void {
  // Last Middleware
  app.use(function(req: Request, res: Response, next: Function) {
    res.sendFile(__dirname + '/public/index.html');
  });

  // Error Handler
  app.use(function(err: Error, req: Request, res: Response, next: Function) {
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
        if (app.get('env') === 'development') {
          console.error(err.stack);
        }
    }
    res.status(status).send({ name: err.name, message: err.message });
  });
}
