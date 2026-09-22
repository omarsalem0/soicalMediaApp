"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBaseReposatory = void 0;
class dataBaseReposatory {
    model;
    constructor(model) {
        this.model = model;
    }
    async Create(data) {
        return await this.model.create(data);
    }
    async findAll({ select, populate, lean }) {
        let query = await this.model.find();
        if (select) {
            query = await query.select(select);
        }
        if (populate) {
            query = await query.populate(populate);
        }
        if (lean) {
            query = await query.lean(lean);
        }
        return query;
    }
    async findone({ filter, select, populate, lean }) {
        let query = await this.model.findOne(filter);
        if (select) {
            query = await query.select(select);
        }
        if (populate) {
            query = await query.populate(populate);
        }
        if (lean) {
            query = await query.lean(lean);
        }
        return query;
    }
    async findById({ id, select, populate, lean }) {
        let query = await this.model.findById(id);
        if (select) {
            query = await query.select(select);
        }
        if (populate) {
            query = await query.populate(populate);
        }
        if (lean) {
            query = await query.lean(lean);
        }
        return query;
    }
    async update({ filter, data }) {
        return await this.model.updateOne(filter, data);
    }
    async deleteOne({ filter }) {
        return await this.model.deleteOne(filter);
    }
}
exports.dataBaseReposatory = dataBaseReposatory;
