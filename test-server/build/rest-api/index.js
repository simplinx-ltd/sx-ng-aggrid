"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const area_1 = require("./area");
const factory_1 = require("./factory");
exports.default = (app, db) => {
    app.use('/api/area', area_1.default(db));
    app.use('/api/factory', factory_1.default(db));
    console.log(db.models);
};
