import Repository from "../../../common/Repository";
import BlogModel from "../model";
import { IBlogDocument } from "../types";

class BlogRepository extends Repository<IBlogDocument> {
  constructor() {
    super(BlogModel);
  }
}

export default BlogRepository;
