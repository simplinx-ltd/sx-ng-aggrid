"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const area_1 = require("./area");
const factory_1 = require("./factory");
function defineModels(dbConnection, cb) {
    dbConnection.addModels([
        area_1.default, factory_1.default
    ]);
    dbConnection
        .sync()
        .then(() => {
        return cb();
    })
        .catch((e) => {
        return cb(e);
    });
}
exports.default = defineModels;
