"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const sx_sequelize_api_1 = require("sx-sequelize-api");
const factory_1 = require("../models/factory");
function default_1(connection) {
    let router = express.Router();
    let DbModel = factory_1.default;
    let modelApi = new sx_sequelize_api_1.ModelRestApi(DbModel, connection);
    router.get('/', modelApi.getAll());
    router.get('/count', modelApi.count());
    router.get('/:id', modelApi.getById());
    router.post('/', modelApi.create());
    router.put('/:id', modelApi.updateById());
    router.delete('/:id', modelApi.deleteById());
    return router;
}
exports.default = default_1;
