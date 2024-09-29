import { Document, QueryOptions, type UpdateQuery } from "mongoose";
import { FilterQuery, Model } from "mongoose";
import QueryFeatures from "./QueryFeatures";

class Repository<T extends Document> {
  private Model: Model<T>;

  constructor(Model: Model<T>) {
    this.Model = Model;
  }

  create(data: Partial<T>) {
    return this.Model.create(data);
  }

  update(
    selector: FilterQuery<T>,
    data: Partial<T>,
    options: QueryOptions<T> = {},
    update: UpdateQuery<T> = {}
  ) {
    return this.Model.findOneAndUpdate(
      selector,
      {
        ...update,
        $set: data,
      },
      {
        new: true,
        runValidators: true,
        ...options,
      }
    );
  }

  change({
    selector,
    data,
    options,
    update = {},
  }: {
    selector: FilterQuery<T>;
    data?: Partial<T>;
    options?: QueryOptions<T>;
    update?: UpdateQuery<T>;
  }) {
    return this.Model.findOneAndUpdate(
      selector,
      {
        ...update,
        $set: data,
      },
      {
        new: true,
        runValidators: true,
        ...options,
      }
    );
  }

  read(selector: FilterQuery<T>) {
    return this.Model.find(selector);
  }

  async readWithQueryFeatures(selector: FilterQuery<T>, requestQuery) {
    const query = this.read(selector);

    const { mongooseQuery, pagination } = await new QueryFeatures(
      query,
      requestQuery
    )
      .all()
      .paginate();

    const mongooseResult = await mongooseQuery;

    return { data: mongooseResult, pagination };
  }

  readOne(selector: FilterQuery<T>) {
    return this.Model.findOne(selector);
  }

  delete(selector: FilterQuery<T>) {
    return this.Model.findOneAndDelete(selector);
  }
}

export default Repository;
