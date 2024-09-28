"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Repository {
    constructor(Model) {
        this.Model = Model;
    }
    create(data) {
        return this.Model.create(data);
    }
    update(selector, data, options = {}) {
        return this.Model.findOneAndUpdate(selector, {
            $set: data,
        }, Object.assign({ new: true, runValidators: true }, options));
    }
    read(selector) {
        return this.Model.find(selector);
    }
    readOne(selector) {
        return this.Model.findOne(selector);
    }
    delete(selector) {
        return this.Model.findOneAndDelete(selector);
    }
}
exports.default = Repository;
//# sourceMappingURL=Repository.js.map