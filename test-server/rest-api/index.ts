import { Application } from 'express';
import { Sequelize } from 'sequelize-typescript';
import area from './area';
import factory from './factory';

export default (app: Application, db: Sequelize) => {

    app.use('/api/area', area(db));
    app.use('/api/factory', factory(db));

    console.log(db.models)
}