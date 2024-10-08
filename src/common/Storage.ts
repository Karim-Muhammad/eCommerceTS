import fs from "fs";

import { randomUUID } from "crypto";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { mkdir } from "fs";
import multer, { Multer } from "multer";
import sharp from "sharp";
import ErrorAPI from "./ErrorAPI";
import config from "../../config";

type FileField = {
  [key: string]: number;
};

enum storageType {
  MEMORY = "memory",
  DISK = "disk",
}

class Storage {
  private type: storageType;
  private storage: multer.StorageEngine;
  public upload: Multer;

  static destination = `${config.root}/static/public/uploads`;

  /**
   * @description by default you have full-control how to use multer
   * @param storageEngine
   */
  constructor(storageEngine: multer.StorageEngine) {
    console.log("Storage Engine", storageEngine);

    this.storage = storageEngine;
    this.upload = multer({
      storage: this.storage,
      fileFilter: this.filterFiles,
    });
  }

  static memoryStorage() {
    const storage = new Storage(multer.memoryStorage());
    storage.type = storageType.MEMORY;
    return storage;
  }

  static diskStorage() {
    console.log("Disk Storage");

    const storage = new Storage(
      multer.diskStorage({
        destination: (request, file, callback) => {
          if (!fs.existsSync(Storage.destination))
            mkdir(Storage.destination, (err) => {
              if (err) throw ErrorAPI.internal(err.message);

              callback(null, this.destination);
            });

          callback(null, this.destination);
        },

        filename: (request, file, callback) => {
          const fileName = this.generateFileName(file).concat(
            this.generateFileExt(file)
          );

          callback(null, fileName);
        },
      })
    );
    storage.type = storageType.DISK;

    console.log("Storage Built");
    return storage;
  }

  static generateFileName(file: Express.Multer.File) {
    const filename = (file.filename || file.originalname).split(".")[0]; // without ext
    return `${filename}-${Date.now()}-${randomUUID()}`;
  }

  static generateFileExt(file: Express.Multer.File, ext = undefined) {
    const extFile = file.mimetype.split("/")[1];
    return `.${ext || extFile}`;
  }

  static removeImagesFromStorage(filesPaths: string[]) {
    filesPaths.forEach((path) => {
      const fullpath = `${this.destination}/${path}`;

      if (fs.existsSync(fullpath))
        fs.unlink(fullpath, (err) => {
          if (err) throw ErrorAPI.internal(err.message);
        });
    });
  }

  moveFileBySharp({
    file,
    destination,
    size = [100, 100],
  }: {
    file: Express.Multer.File;
    destination: string;
    size?: [number, number];
  }) {
    sharp(file.buffer)
      .resize(size[0], size[1])
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(destination);
  }

  /**
   * @description is can be usefull before validation, to check if images is set to body or not
   * @param fileFields
   * @returns
   */

  // TODO: Add Uploading into Cloudinary
  prepareUploadFiles = (fileFields: multer.Field[]): RequestHandler => {
    console.log("Fields", fileFields);

    return (req: Request, _res: Response, next: NextFunction) => {
      console.log("User", req.user);
      console.log("Request Files", req.files);

      if (!req.files || Object.values(req.files).length === 0) return next();

      fileFields.forEach((field) => {
        const fileCount = field.maxCount;
        const file: Express.Multer.File[] = req.files[field.name];

        console.log("File", file);

        /**
         * @description if storage is memory, then we need to move files to disk (by sharp package)
         * @description if storage is disk, then we don't need to move files (already in disk)
         */
        if (this.type === storageType.MEMORY) {
          file.forEach((f) => {
            const filename = Storage.generateFileName(f).concat(
              Storage.generateFileExt(f)
            );

            if (!fs.existsSync(Storage.destination))
              fs.mkdirSync(Storage.destination, { recursive: true });

            const destination = `${Storage.destination}/${filename}`;
            f["filename"] = filename;
            this.moveFileBySharp({ file: f, destination });
          });
        }

        // console.log("Field Name", field.name);
        // console.log("File Count", fileCount);
        // console.log("Files", req.files);
        // console.log("File", req.files[field.name]);

        if (fileCount)
          req.body[field.name] =
            field.maxCount !== 1
              ? file.map((f) => f.filename)
              : file[0].filename;
      });

      next();
    };
  };

  /**
   * @description convert { images: 2 } -> to -> [ {name: "images", maxCount: 2 } ]
   * @param fields - { images: 2 } : { nameField: maxCount }
   */
  getFileFields(fields: FileField) {
    const fileFieldsAsNeededForMulter = Object.keys(fields).map(
      (fieldName) => ({ name: fieldName, maxCount: fields[fieldName] })
    );

    return fileFieldsAsNeededForMulter;
  }

  /**
   * @description Make a Strict Layer for Images to be only specific mimetype
   * @param req
   * @param file
   * @param callback
   * @returns
   */
  filterFiles(req: Request, file: Express.Multer.File, callback) {
    const { mimetype, size } = file;

    const allowedMimeTypes = ["image/jpeg", "image/png"];
    const allowedSize = 1024 * 1024 * 2;

    if (!allowedMimeTypes.includes(mimetype))
      return callback(ErrorAPI.badRequest("Invalid file type"));
    if (size > allowedSize)
      return callback(ErrorAPI.badRequest("File size is too large"));

    return callback(null, true);
  }
}

export default Storage;
