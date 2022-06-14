import { Router } from 'express';
import { validate } from 'express-validation';
import { UserController } from 'server/controllers';
import { userValidation, options } from 'server/validations';

const userRouter = Router();

userRouter.get('/', validate(userValidation.getAll, options), UserController.getAll);

userRouter.get('/:userId', UserController.get);

userRouter.post('/', validate(userValidation.create, options), UserController.create);

userRouter.put('/:userId', validate(userValidation.update, options), UserController.update);

userRouter.patch(
  '/:userId',
  validate(userValidation.partialUpdate, options),
  UserController.partialUpdate,
);

userRouter.delete('/:userId', validate(userValidation.destroy, options), UserController.destroy);

export default userRouter;
