import { Router } from 'express';
import { validate } from 'express-validation';
import { RoleController } from 'server/controllers';
import { roleValidation, options } from 'server/validations';

const roleRouter = Router();

roleRouter.get('/', validate(roleValidation.getAll, options), RoleController.getAll);

roleRouter.get('/:roleId', RoleController.get);

roleRouter.post('/', validate(roleValidation.create, options), RoleController.create);

roleRouter.put('/:roleId', validate(roleValidation.update, options), RoleController.update);

roleRouter.patch(
  '/:roleId',
  validate(roleValidation.partialUpdate, options),
  RoleController.partialUpdate,
);

roleRouter.delete('/:roleId', validate(roleValidation.destroy, options), RoleController.destroy);

export default roleRouter;
