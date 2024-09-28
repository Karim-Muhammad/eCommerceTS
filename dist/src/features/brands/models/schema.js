"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BrandSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    image: {
        type: String,
        required: false,
        trim: true,
    },
});
exports.default = BrandSchema;
//# sourceMappingURL=schema.js.map