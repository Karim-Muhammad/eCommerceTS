import { Model, Document } from "mongoose";
import { IProductDocument } from "../../products/types";

export interface IBrand {
  name: string;
  slug: string;
  description: string;
  image: string;
  count: number;
}

export interface IBrandMethods {
  getProducts: () => Promise<IProductDocument[]>;
}

export interface IBrandDocument extends IBrand, IBrandMethods, Document {}

export interface IBrandModel extends Model<IBrandDocument> {
  findByName: (name: string) => Promise<IBrandDocument | null>;
  findByProductId: (productId: string) => Promise<IBrandDocument | null>;
  addProduct: (
    brandId: string,
    productId: string
  ) => Promise<IBrandDocument | null>;
  removeProduct: (
    brandId: string,
    productId: string
  ) => Promise<IBrandDocument | null>;
  updateProduct: (
    brandId: string,
    productId: string,
    newProductId: string
  ) => Promise<IBrandDocument | null>;
  deleteProduct: (
    brandId: string,
    productId: string
  ) => Promise<IBrandDocument | null>;
  deleteAllProducts: (brandId: string) => Promise<IBrandDocument | null>;
}
