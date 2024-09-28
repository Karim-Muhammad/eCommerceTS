import { model, Schema } from "mongoose";
import Repository from "../../../common/Repository";
import { IDocument } from "../types";

const _model = model<IDocument>("test", new Schema({}));

class _Repository extends Repository<IDocument> {
  constructor() {
    super(_model);
  }
}

export default _Repository;
