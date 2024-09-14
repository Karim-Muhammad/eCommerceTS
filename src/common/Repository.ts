import { Model } from "mongoose";

class Repository<TDocument> {
  private Model: Model<TDocument>;
  constructor(Model: Model<TDocument>) {
    this.Model = Model;
  }

  create(data: TDocument): Promise<TDocument> {
    return this.Model.create(data);
  }
}

export default Repository;
