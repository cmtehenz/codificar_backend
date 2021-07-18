import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuth from '@shared/infra/http/middlewares/ensureAuth';

import PostsController from '@modules/posts/infra/http/controllers/PostsController';

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      content: Joi.string().required(),
    },
  }),
  ensureAuth,
  postsController.create,
);

export default postsRouter;
