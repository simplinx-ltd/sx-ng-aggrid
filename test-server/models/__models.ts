import { Sequelize } from 'sequelize-typescript';
import Area from './area';
import Factory from './factory';

export default function defineModels(dbConnection: Sequelize, cb: (err?: Error) => void): void {
    dbConnection.addModels([
        Area,Factory
    ]);
    dbConnection
        .sync()
        .then((): void => {
            return cb();
        })
        .catch((e): void => {
            return cb(e);
        });
}