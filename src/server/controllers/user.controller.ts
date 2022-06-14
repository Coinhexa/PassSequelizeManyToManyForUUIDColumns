import { Request, Response, NextFunction } from 'express';
import { CREATED } from 'http-status';
import { UserService } from 'server/services';
import { NotFound } from 'server/utils/errors';

export default class UserController {
  static async runServiceAction(req: Request, serviceAction: Function) {
    const userId = req.params.userId;
    const { enabled, roles } = req.body;

    if (userId !== undefined) {
      return serviceAction({
        userId,
        enabled,
        roles,
      });
    }
    return serviceAction({
      enabled,
      roles,
    });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await UserController.runServiceAction(req, UserService.create);
      res.locals.status = CREATED;
      res.locals.data = newUser;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const userObject = await UserService.get(userId);
      if (!userObject) {
        throw new NotFound(`User with primary key ${userId} not found`);
      }

      res.locals.data = userObject;

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = { ...req.query };
      const allUsers = await UserService.getAll(filters);
      res.locals.data = allUsers;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await UserController.runServiceAction(req, UserService.update);
      res.locals.data = updatedUser;

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await UserController.runServiceAction(req, UserService.partialUpdate);
      res.locals.data = updatedUser;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const userDelete = await UserService.destroy(userId);
      res.locals.data = userDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
