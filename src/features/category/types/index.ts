import { Document, Model } from "mongoose";
import { IProductDocument } from "../../products/types";

export interface ICategory {
  name: string;
  slug: string;
  description: string;
  image: string;
  count: number;
}

export interface ICategoryMethods {
  getProducts: () => Promise<IProductDocument[]>;
}

export interface ICategoryDocument
  extends ICategory,
    ICategoryMethods,
    Document {}

export interface ICategoryModel extends Model<ICategoryDocument> {
  findByName: (name: string) => Promise<ICategoryDocument | null>;
  findByProductId: (productId: string) => Promise<ICategoryDocument | null>;
  addProduct: (
    categoryId: string,
    productId: string
  ) => Promise<ICategoryDocument | null>;
  removeProduct: (
    categoryId: string,
    productId: string
  ) => Promise<ICategoryDocument | null>;
  updateProduct: (
    categoryId: string,
    productId: string,
    newProductId: string
  ) => Promise<ICategoryDocument | null>;
  deleteProduct: (
    categoryId: string,
    productId: string
  ) => Promise<ICategoryDocument | null>;
  deleteAllProducts: (categoryId: string) => Promise<ICategoryDocument | null>;
}
