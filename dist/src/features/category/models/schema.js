"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    image: {
        type: String,
        // required: true,
    },
    count: {
        type: Number,
        default: 0,
    },
});
exports.default = CategorySchema;
//# sourceMappingURL=schema.js.map