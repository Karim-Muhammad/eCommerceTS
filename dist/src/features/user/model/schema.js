"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // emailVerifiedAt: {
    //   type: Date,
    // },
    password: {
        type: String,
        required: true,
    },
    passwordChangedAt: {
        type: Number,
        required: true,
        default: Date.now(),
    },
    mobile: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        default: "user",
    },
    status: {
        type: Boolean,
        default: true,
    },
    refreshToken: {
        type: String,
    },
    wishlist: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    address: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Address",
        },
    ],
});
exports.default = UserSchema;
//# sourceMappingURL=schema.js.map