"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    ],
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    images: [String],
    colors: [
        {
            name: { type: String, required: true },
            hexCode: { type: String, required: true },
            quantity: { type: Number, default: 0 },
        },
    ],
    quantity: {
        type: Number,
        default: 1,
    },
    sold: {
        type: Number,
        default: 0,
    },
    // ratings: [
    //   {
    //     stars: {
    //       type: Number,
    //       required: true,
    //     },
    //     user: {
    //       type: Schema.Types.ObjectId,
    //       ref: "USer",
    //     },
    //     review: String,
    //   },
    // ],
    averageRatings: {
        type: Number,
        default: 0,
    },
    reviewsCount: {
        type: Number,
        default: 0,
    },
    tags: [
        {
            type: String,
        },
    ],
});
exports.default = ProductSchema;
//# sourceMappingURL=schema.js.map