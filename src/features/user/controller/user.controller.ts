import { Request, Response } from "express";
import ErrorAPI from "../../../common/ErrorAPI";
import UserRepository from "../repository";

class UserController {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  read = async (req: Request, res: Response, next) => {
    try {
      const data = await this.userRepository.read({});

      return res.status(200).json({ data });
    } catch (error) {
      next(ErrorAPI.badRequest(error.message));
    }
  };

  readOne = async (req: Request, res: Response, next) => {
    const { params } = req;
    try {
      const data = await this.userRepository.readOne({ _id: params.id });

      return res.status(200).json({ data });
    } catch (error) {
      next(ErrorAPI.badRequest(error.message));
    }
  };

  update = async (req: Request, res: Response, next) => {
    const { params, body } = req;

    try {
      const updatedData = await this.userRepository.update(
        { _id: params.id },
        body
      );

      return res.status(200).json({
        data: updatedData,
      });
    } catch (error) {
      next(ErrorAPI.badRequest(error.message));
    }
  };

  delete = async (req: Request, res: Response, next) => {
    const { params } = req;

    try {
      const data = await this.userRepository.delete({ _id: params.id });

      return res.status(200).json({
        data,
      });
    } catch (error) {
      next(ErrorAPI.badRequest(error.message));
    }
  };

  create = async (req: Request, res: Response, next) => {
    const { body } = req;

    try {
      const data = await this.userRepository.create(body);

      return res.status(201).json({
        data,
      });
    } catch (error) {
      next(ErrorAPI.badRequest(error.message));
    }
  };
}

export default new UserController();
