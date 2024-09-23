import Repository from "../../../common/Repository";
import { IDocument } from "../types";

class _Repository extends Repository<IDocument> {
  constructor() {
    super();
  }
}

export default _Repository;
