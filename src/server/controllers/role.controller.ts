import { Request, Response, NextFunction } from 'express';
import { CREATED } from 'http-status';
import { RoleService } from 'server/services';
import { NotFound } from 'server/utils/errors';

export default class RoleController {
  static async runServiceAction(req: Request, serviceAction: Function) {
    const roleId = req.params.roleId;
    const { name, users } = req.body;

    if (roleId !== undefined) {
      return serviceAction({
        roleId,
        name,
        users,
      });
    }
    return serviceAction({
      name,
      users,
    });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newRole = await RoleController.runServiceAction(req, RoleService.create);
      res.locals.status = CREATED;
      res.locals.data = newRole;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = req.params.roleId;
      const roleObject = await RoleService.get(roleId);
      if (!roleObject) {
        throw new NotFound(`Role with primary key ${roleId} not found`);
      }

      res.locals.data = roleObject;

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = { ...req.query };
      const allRoles = await RoleService.getAll(filters);
      res.locals.data = allRoles;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedRole = await RoleController.runServiceAction(req, RoleService.update);
      res.locals.data = updatedRole;

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedRole = await RoleController.runServiceAction(req, RoleService.partialUpdate);
      res.locals.data = updatedRole;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = req.params.roleId;
      const roleDelete = await RoleService.destroy(roleId);
      res.locals.data = roleDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
