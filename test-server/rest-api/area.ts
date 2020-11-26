import * as express from 'express';
import { ModelRestApi } from 'sx-sequelize-api';
import Model from '../models/area';
import { Sequelize } from 'sequelize-typescript';

export default function (connection: Sequelize): express.Router {
    let router: express.Router = express.Router();
    let DbModel = Model;
    let modelApi = new ModelRestApi(DbModel, connection);

    router.get('/', modelApi.getAll());
    router.get('/count', modelApi.count());
    router.get('/:id', modelApi.getById());
    router.post('/', modelApi.create());
    router.put('/:id', modelApi.updateById());
    router.delete('/:id', modelApi.deleteById());

    return router;
}
