import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePostService from '@modules/posts/services/CreatePostService';

export default class PostsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { content } = req.body;

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      content,
    });

    return res.json(classToClass(post));
  }
}
