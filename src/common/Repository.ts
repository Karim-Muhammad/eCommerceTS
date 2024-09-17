import { Document } from "mongoose";
import { FilterQuery, Model } from "mongoose";

class Repository<T extends Document> {
  private Model: Model<T>;

  constructor(Model: Model<T>) {
    this.Model = Model;
  }

  create(data: Partial<T>) {
    return this.Model.create(data);
  }

  update(selector: FilterQuery<T>, data: Partial<T>) {
    return this.Model.findOneAndUpdate(
      selector,
      {
        $set: data,
      },
      {
        new: true,
      }
    );
  }

  read(selector: FilterQuery<T>) {
    return this.Model.find(selector);
  }

  readOne(selector: FilterQuery<T>) {
    return this.Model.findOne(selector);
  }

  delete(selector: FilterQuery<T>) {
    return this.Model.findOneAndDelete(selector);
  }
}

export default Repository;
