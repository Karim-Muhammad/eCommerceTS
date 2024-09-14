import { HydratedDocument, Model } from "mongoose";

class Repository<ModelType> {
  private Model: Model<ModelType>;
  constructor(Model: Model<ModelType>) {
    this.Model = Model;
  }

  // UserProfile
  create(data: ModelType): Promise<HydratedDocument<ModelType>> {
    return this.Model.create(data);
  }
}

export default Repository;
