import { Request, Response, NextFunction } from "express";
import { apiResponse, catchAsync } from "../../../common/helpers";
import BlogRepository from "../repository/blog.repository";
import ErrorAPI from "../../../common/ErrorAPI";

class BlogController {
  private blogRepository: BlogRepository;
  constructor() {
    this.blogRepository = new BlogRepository();
  }

  create = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const newBlog = await this.blogRepository.create({
        ...req.body,
        author: req.user.id,
      });
      return apiResponse(res, 201, "New blog is created!", { blog: newBlog });
    }
  );
  read = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { data: blogs, pagination } =
      await this.blogRepository.readWithQueryFeatures({}, req.query);
    if (!blogs.length) return next(ErrorAPI.notFound("No blogs up till now"));

    return apiResponse(res, 200, "All blogs fetched successfully", {
      blogs,
      pagination,
    });
  });

  readOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const blog = await this.blogRepository.readOne({ _id: id });
      if (!blog) return next(ErrorAPI.notFound("No blog with this id!"));

      return apiResponse(res, 200, "The blog fetched Successfully!", { blog });
    }
  );

  update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const updatedBlog = await this.blogRepository.update(
        { _id: id },
        req.body
      );

      if (!updatedBlog) return next(ErrorAPI.notFound("No blog with this id!"));

      return apiResponse(res, 200, "The blog updated Successfully!", {
        blog: updatedBlog,
      });
    }
  );

  delete = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const blog = await this.blogRepository.delete({ _id: id });
      if (!blog) return next(ErrorAPI.notFound("No blog exist with this id!"));

      return apiResponse(res, 204, "The blog is deleted Successfully!");
    }
  );

  like = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  dislike = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );
}

export default new BlogController();