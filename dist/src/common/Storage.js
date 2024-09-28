"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
class Storage {
    /**
     * @description by default you have full-control how to use multer
     * @param storageEngine
     */
    constructor(storageEngine) {
        /**
         * @description is can be usefull before validation, to check if images is set or not
         * @param fileFields
         * @returns
         */
        this.prepareUploadFiles = (fileFields) => {
            console.log("Fields", fileFields);
            return (req, _res, next) => {
                console.log("Request Files", req.files);
                Object.keys(fileFields).forEach((fieldName) => {
                    const fileCount = fileFields[fieldName];
                    const file = req.files[fieldName];
                    console.log("Files", req.files, fieldName, fileCount);
                    if (fileCount)
                        req.body[fieldName] = file.originalname;
                });
                next();
            };
        };
        this.storage = storageEngine;
        this.upload = (0, multer_1.default)({ storage: this.storage });
    }
    static memoryStorage() {
        const storage = new Storage(multer_1.default.memoryStorage());
        return storage;
    }
    static diskStorage(options = {}) {
        const storage = new Storage(multer_1.default.diskStorage(options || {
            destination: (request, file, callback) => {
                callback(null, "../../static/public/uploads");
            },
            filename: (request, file, callback) => {
                const fileName = `${Date.now()}-${file.originalname}-${(0, crypto_1.randomUUID)()}.${file.mimetype.split("/")[1]}`;
                callback(null, fileName);
            },
        }));
        return storage;
    }
    moveFile({ file, destination, size = [100, 100], }) {
        (0, sharp_1.default)(file.buffer)
            .resize(size[0], size[1])
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(destination);
    }
    /**
     * @param fields - { images: 2 } : { nameField: maxCount }
     */
    getFileFields(fields) {
        const fileFieldsAsNeededForMulter = Object.keys(fields).map((fieldName) => ({ name: fieldName, maxCount: fields[fieldName] }));
        return fileFieldsAsNeededForMulter;
    }
}
exports.default = Storage;
//# sourceMappingURL=Storage.js.map